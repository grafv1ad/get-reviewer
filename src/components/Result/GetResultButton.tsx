import React, { useContext } from 'react';
import { ErrorContext } from '../Error/ErrorContext';

interface GetResultButtonProps {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    getResult: Function,
}

const GetResultButton: React.FC<GetResultButtonProps> = ({loading, setLoading, getResult}) => {
    const {setError}: any = useContext(ErrorContext);

    const onClick = async () => {
        setError(null);
        setLoading(true);
        try {
            await getResult();
        } catch(error) {
            setLoading(false);
            setError(error);
        }
    }

    return (
        <button 
            className="py-2 px-4 border border-sky-600 transition-all hover:bg-sky-600 hover:text-white disabled:opacity-50 disabled:bg-sky-600 disabled:text-white"
            onClick={onClick}
            disabled={loading}
        >
            Get reviewer
        </button>
    );
}

export default GetResultButton;
