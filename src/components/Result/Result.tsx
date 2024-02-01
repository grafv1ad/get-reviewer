import React, { useState } from 'react';
import octokit from '../Octokit/Octokit';
import ISettings from '../Settings/SettingsInterface';
import IResult from './ResultInterface';
import ResultItem from './ResultItem';
import GetResultButton from './GetResultButton';

interface ResultProps {
    settings: ISettings | undefined,
}

const Result: React.FC<ResultProps> = ({settings}) => {
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
    const [result, setResult]: [IResult[] | undefined, React.Dispatch<React.SetStateAction<IResult[] | undefined>>] = useState();

    const updateResult = (result: IResult[]) => {
        setResult(result);
        setLoading(false);
    }

    const getResult = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/contributors', {
            owner: settings!.login,
            repo: settings!.repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }).then(response => {
            let result = response.data;
            const blacklist = settings!.blacklist.split(/\s*,\s*/);
            if (blacklist.length > 0) {
                result = result.filter(item => {
                    // todo: remove temp
                    const temp = item.login || '';
                    return !blacklist.includes(temp)
                });
            }
            console.log(blacklist);
            console.log(result);
            updateResult(result);
        });
    }

    let resultList;
    if (result && result.length > 0) {
        resultList = result.map((item, index) => (
            <ResultItem key={index} data={item} />
        ));
    }

    return (
        <>
            <GetResultButton setLoading={setLoading} getResult={getResult} />
            <div className="result">
                {loading && 'Loading...'}
                {!loading && resultList && 
                    <>
                        <div className="result__title">Reviewers for this repository:</div>
                        <ul className="result__list">
                            {resultList}
                        </ul>
                    </>
                }
            </div>
        </>
    );
}

export default Result;
