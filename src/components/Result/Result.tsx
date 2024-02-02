import React, { useState, useContext } from 'react';
import ISettings from '../Settings/SettingsInterface';
import IResultItem from './ResultInterface';
import ResultItem from './ResultItem';
import GetResultButton from './GetResultButton';
import octokit from '../Octokit/Octokit';
import { ErrorContext } from '../Error/ErrorContext';

interface ResultProps {
    settings: ISettings,
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>,
}

interface IResultState {
    currentUser: IResultItem | null,
    reviewer: IResultItem | null,
    contributors: IResultItem[],
}

const Result: React.FC<ResultProps> = ({ settings, setSettings }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IResultState | null>(null);
    const { setError }: any = useContext(ErrorContext);

    const updateResult = (currentUser: IResultItem | null, reviewer: IResultItem | null, contributors: IResultItem[]) => {
        setError(null);
        setResult({currentUser, reviewer, contributors});
        setLoading(false);
    }

    interface IGetDataOptions {
        owner?: string,
        repo?: string,
        username?: string,
        per_page?: number,
    }

    const getData = async (url: string, options: IGetDataOptions) => {
        const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
        let pagesRemaining: boolean = true;
        let data: IResultItem[] = [];

        while (pagesRemaining) {
            const response = await octokit.request(`GET ${url}`, {
                ...options,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            });

            if (Array.isArray(response.data)) {
                data = [...data, ...response.data];
            } else {
                data = [...data, response.data];
            }

            const linkHeader: string = response.headers.link || '';
            pagesRemaining = !!(linkHeader && linkHeader.includes(`rel="next"`));

            if (pagesRemaining) {
                // @ts-ignore - объект не будет пустым, так как мы прошли проверку выше
                url = linkHeader.match(nextPattern)[0];
            }
        }

        return data;
    }

    const getResult = async () => {
        setResult(null);

        setSettings({
            login: settings.login.trim(),
            repo: settings.repo.trim(),
            blacklist: settings.blacklist.trim(),
        });

        if (!settings.login) {
            throw new Error('Enter login, please');
        }

        if (!settings.repo) {
            throw new Error('Enter repository name, please');
        }

        let currentUser: IResultItem | null = null; 
        try {
            const user = await getData(`/users/{username}`, {
                username: settings.login,
                per_page: 1,
            });

            if (user && user[0]) {
                currentUser = user[0];
            }
        } catch (error) {
            console.debug(error);
        }

        if (!currentUser) {
            throw new Error('Сannot find the user, please try again');
        }

        let data: IResultItem[] = [];
        try {
            data = await getData('/repos/{owner}/{repo}/contributors', {
                owner: settings.login,
                repo: settings.repo,
                per_page: 100,
            });
        } catch (error) {
            console.debug(error);
            setLoading(false);
            throw new Error('Сannot find the repository, please try again');
        } 

        let contributors: IResultItem[] = data;
        let reviewer: IResultItem | null = null;
        const blacklist = (settings.blacklist.length > 0) ? settings.blacklist.split(/\s*,\s*/) : [];

        contributors = contributors.filter(item => {
            if (!item.login) return false;
            if (item.login === currentUser!.login) return false;
            return !blacklist.includes(item.login);
        });

        if (contributors.length > 0) {
            const randomIndex = Math.floor(Math.random() * contributors.length);
            reviewer = contributors[randomIndex];
            contributors.splice(randomIndex, 1);
        }
        
        updateResult(currentUser, reviewer, contributors);
    }

    let contributorsList;
    if (result?.contributors && result.contributors.length > 0) {
        contributorsList = result.contributors.map((item, index) => (
            <ResultItem key={index} data={item} />
        ));
    }

    return (
        <>
            <GetResultButton loading={loading} setLoading={setLoading} getResult={getResult} />
            <div className="result">
                {loading &&
                    <div className="result__loading">Loading...</div>
                }
                {!loading && result &&
                    <>
                        <div className="result__item">
                            <div className="result__title">You</div>
                            {result.currentUser &&
                                <ul className="result__list">
                                    <ResultItem data={result.currentUser} />
                                </ul>
                            }
                        </div>
                        <div className="result__item">
                            <div className="result__title">Your reviewer</div>
                            {result.reviewer &&
                                <ul className="result__list">
                                    <ResultItem data={result.reviewer} />
                                </ul>
                            }
                            {!result.reviewer &&
                                <div className="result__error">No contributor found, please try to change the blacklist</div>
                            }
                        </div>
                        {contributorsList && 
                            <div className="result__item">
                                <div className="result__title">Other contributors <i>(except for the blacklist)</i></div>
                                <ul className="result__list">
                                    {contributorsList}
                                </ul>
                            </div>
                        }
                    </>
                }
            </div>
        </>
    );
}

export default Result;
