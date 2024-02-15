import React from 'react';
import IResult from './ResultInterface';

interface ResultItemProps {
    data: IResult,
}

const ResultItem: React.FC<ResultItemProps> = ({data}) => {
    return (
        <li className='border p-1 transition-all hover:border-sky-800 hover:text-sky-800'>
            <a href={data.html_url} target='_blank' rel='noreferrer' className='cursor-pointer flex gap-8 items-center'>
                <img src={data.avatar_url} alt={data.login} style={{
                    width: '75px',
                    height: '75px',
                }}/>
                <span className='transition-all'>{data.login}</span>
            </a>
        </li>
    );
}

export default ResultItem;
