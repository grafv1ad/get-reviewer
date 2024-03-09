import React, { useContext } from 'react';
import { IErrorContext, ErrorContext } from '../Error/ErrorContext';

interface ResultButtonProps {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    updateResult: Function,
}

const ResultButton: React.FC<ResultButtonProps> = ({loading, setLoading, updateResult}) => {
    const {setError}: IErrorContext = useContext(ErrorContext);

    const resultButtonHandler = async () => {
        setError(null);
        setLoading(true);
        updateResult();
    }

    return (
        <button 
            className='py-2 px-4 border border-sky-600 transition-all hover:bg-sky-600 hover:text-white disabled:opacity-50 disabled:bg-sky-600 disabled:text-white'
            onClick={resultButtonHandler}
            disabled={loading}
        >
            Get reviewer
        </button>
    );
}

export default ResultButton;
