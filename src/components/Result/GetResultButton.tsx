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
            className="get-result-button"
            onClick={onClick}
            disabled={loading}
        >
            Get reviewer
        </button>
    );
}

export default GetResultButton;
