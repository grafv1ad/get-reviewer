import React from 'react';
import octokit from '../Octokit/Octokit';
import IResult from './ResultInterface';
import ResultItem from './ResultItem';
import GetResultButton from './GetResultButton';

interface ResultProps {
    result: IResult[] | undefined,
    setResult: React.Dispatch<React.SetStateAction<IResult[] | undefined>>,
}

const Result: React.FC<ResultProps> = ({ result, setResult }) => {
    const getResult = async () => {
        await octokit.request('GET /repos/{owner}/{repo}/contributors', {
            owner: 'grafv1ad',
            repo: 'php-site-parser',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }).then(response => {
            return setResult(response.data);
        });
    }

    let resultList;
    if (result && result.length > 0) {
        resultList = result.map((item, index) => (
            <ResultItem key={index} data={item} />
        ));
    }

    console.log(result)
    return (
        <>
            <GetResultButton getResult={getResult} />
            <div className="result">
                <div className="result__title">Reviewers for this repository:</div>
                <ul className="result__list">
                    {resultList}
                </ul>
            </div>
        </>
    );
}

export default Result;
