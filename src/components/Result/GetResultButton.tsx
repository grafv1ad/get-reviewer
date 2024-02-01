import React from 'react';

interface GetResultButtonProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    getResult: Function,
}

const GetResultButton: React.FC<GetResultButtonProps> = ({setLoading, getResult}) => {
    return (
        <button 
            className="get-result-button"
            onClick={() => {
                setLoading(true);
                getResult();
            }}
        >
            Get reviewers
        </button>
    );
}

export default GetResultButton;
