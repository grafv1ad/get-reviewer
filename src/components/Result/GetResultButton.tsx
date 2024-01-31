import React from 'react';

interface GetResultButtonProps {
    getResult: Function,
}

const GetResultButton: React.FC<GetResultButtonProps> = ({getResult}) => {
    return (
        <button 
            className="get-result-button"
            onClick={() => getResult()}
        >
            Get reviewers
        </button>
    );
}

export default GetResultButton;
