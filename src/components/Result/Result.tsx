import React, { useState, useContext } from 'react';
import ISettings from '../Settings/SettingsInterface';
import IResultItem from './ResultInterface';
import ResultItem from './ResultItem';
import GetResultButton from './GetResultButton';
import octokit from '../Octokit/Octokit';
import { ErrorContext } from '../Error/ErrorContext';

interface ResultProps {
    settings: ISettings,
}

interface IResultState {
    you: IResultItem | null,
    reviewer: IResultItem | null,
    contributors: IResultItem[],
}

const Result: React.FC<ResultProps> = ({ settings }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IResultState | null>(null);
    const { setError }: any = useContext(ErrorContext);

    const updateResult = (you: IResultItem | null, reviewer: IResultItem | null, contributors: IResultItem[]) => {
        setError(null);
        setResult({you, reviewer, contributors});
        setLoading(false);
    }

    const getResult = async () => {
        setResult(null);

        if (!settings.login) {
            throw new Error('Enter login, please');
        }

        if (!settings.repo) {
            throw new Error('Enter repository name, please');
        }

        await octokit.request('GET /repos/{owner}/{repo}/contributors', {
            owner: settings.login,
            repo: settings.repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })
            .then(response => {
                let contributors: IResultItem[] = response.data;
                let you: IResultItem | null = null; 
                let reviewer: IResultItem | null = null;

                const blacklist = (settings.blacklist.length > 0) ? settings.blacklist.split(/\s*,\s*/) : [];

                contributors = contributors.filter(item => {
                    if (!item.login) return;

                    if (item.login === settings.login) {
                        you = item; 
                        return false;
                    }

                    return !blacklist.includes(item.login);
                });

                if (contributors.length > 0) {
                    reviewer = contributors[Math.floor(Math.random() * contributors.length)];
                }

                contributors = contributors.filter(item => item.login !== reviewer!.login);

                updateResult(you, reviewer, contributors);
            })
            .catch(error => {
                setLoading(false);
                setError(error);
            });
    }

    let resultList;
    if (result?.contributors && result.contributors.length > 0) {
        resultList = result.contributors.map((item, index) => (
            <ResultItem key={index} data={item} />
        ));
    }

    return (
        <>
            <GetResultButton setLoading={setLoading} getResult={getResult} />
            <div className="result">
                {loading &&
                    <div className="result__loading">Loading...</div>
                }
                {!loading &&
                    <>
                        <div className="result__item">
                            <div className="result__title">You</div>
                            {result?.you &&
                                <ul className="result__list">
                                    <ResultItem data={result.you} />
                                </ul>
                            }
                        </div>
                        <div className="result__item">
                            <div className="result__title">Your reviewer</div>
                            {result?.reviewer &&
                                <ul className="result__list">
                                    <ResultItem data={result.reviewer} />
                                </ul>
                            }
                            {!result?.reviewer &&
                                <div className="result__error">No contributor found, please try to change the blacklist</div>
                            }
                        </div>
                        {resultList && 
                            <div className="result__item">
                                <div className="result__title">Other contributors <i>(except for the blacklist)</i></div>
                                <ul className="result__list">
                                    {resultList}
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
