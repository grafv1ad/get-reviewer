import React from 'react';
import IResult from './ResultInterface';

interface ResultItemProps {
    data: IResult,
}

const ResultItem: React.FC<ResultItemProps> = ({data}) => {
    return (
        <li>
            <a href={data.html_url}>{data.login}</a>
        </li>
    );
}

export default ResultItem;
