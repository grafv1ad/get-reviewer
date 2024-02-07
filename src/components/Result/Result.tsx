import React, { useState, useContext } from 'react';
import ISettings from '../Settings/SettingsInterface';
import IResultItem from './ResultInterface';
import ResultItem from './ResultItem';
import ResultButton from './ResultButton';
import octokit from '../Octokit/Octokit';
import { IErrorContext, ErrorContext } from '../Error/ErrorContext';

interface ResultProps {
    settings: ISettings,
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>,
}

interface IResultState {
    currentUser: IResultItem | null,
    reviewer: IResultItem | null,
    contributors: IResultItem[],
}

interface IGetDataOptions {
    owner?: string,
    repo?: string,
    username?: string,
    per_page?: number,
}

const Result: React.FC<ResultProps> = ({ settings, setSettings }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IResultState | null>(null);
    const {setError}: IErrorContext = useContext(ErrorContext);

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
            const data = await getData(`/users/{username}`, {
                username: settings.login,
            });
            currentUser = data[0];
        } catch (error) {
            console.debug(error);
            throw new Error('Сannot find the user, please try again');
        }

        let contributors: IResultItem[] = [];

        try {
            contributors = await getData('/repos/{owner}/{repo}/contributors', {
                owner: settings.login,
                repo: settings.repo,
                per_page: 100,
            });
        } catch (error) {
            console.debug(error);
            throw new Error('Сannot find the repository, please try again');
        } 
        
        const blacklist = (settings.blacklist.length > 0) ? settings.blacklist.split(/\s*,\s*/) : [];
        blacklist.push(currentUser.login);

        contributors = contributors.filter(item => !blacklist.includes(item.login));

        let reviewer: IResultItem | null = null;

        if (contributors.length > 0) {
            const randomIndex = Math.floor(Math.random() * contributors.length);
            reviewer = contributors[randomIndex];
            contributors.splice(randomIndex, 1);
        }
        
        return {currentUser, reviewer, contributors};
    }
    
    const updateResult = async () => {
        let result = null;
        try {
            result = await getResult();
        } catch(error) {
            console.debug(error);
            setLoading(false);
            setError(error);
            return;
        }

        setError(null);
        setResult(result);
        setLoading(false);
    }

    let contributorsList;
    if (result?.contributors && result.contributors.length > 0) {
        contributorsList = result.contributors.map((item, index) => (
            <ResultItem key={index} data={item} />
        ));
    }

    return (
        <>
            <ResultButton loading={loading} setLoading={setLoading} updateResult={updateResult} />
            <div className="flex flex-col gap-4 text-lg empty:hidden">
                {loading &&
                    <div className="text-neutral-600">Loading...</div>
                }
                {!loading && result &&
                    <>
                        <div className="result__item">
                            <div className="text-lg text-sky-800 mb-2">Current user</div>
                            {result.currentUser &&
                                <ul className="flex flex-col gap-4">
                                    <ResultItem data={result.currentUser} />
                                </ul>
                            }
                        </div>
                        <div className="result__item">
                            <div className="text-lg text-sky-800 mb-2">Reviewer</div>
                            {result.reviewer &&
                                <ul className="flex flex-col gap-4">
                                    <ResultItem data={result.reviewer} />
                                </ul>
                            }
                            {!result.reviewer &&
                                <div className="result__error">No contributors found{settings.blacklist.length > 0 && ', please try to change the blacklist'}</div>
                            }
                        </div>
                        {contributorsList && 
                            <div className="result__item">
                                <div className="text-lg text-sky-800 mb-2">Other contributors <i className="text-sm">(except for the blacklist)</i></div>
                                <ul className="flex flex-col gap-4">
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
