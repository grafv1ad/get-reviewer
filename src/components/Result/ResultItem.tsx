import React from 'react';
import IResult from './ResultInterface';

interface ResultItemProps {
    data: IResult,
}

const ResultItem: React.FC<ResultItemProps> = ({data}) => {
    return (
        <li>
            <a href={data.html_url}>
                <img src={data.avatar_url} alt={data.login} style={{
                    width: '50px',
                    height: '50px',
                }}/>
                <span>{data.login}</span>
            </a>
        </li>
    );
}

export default ResultItem;
