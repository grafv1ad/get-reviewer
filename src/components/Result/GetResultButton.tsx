import React, { useContext } from 'react';
import { ErrorContext } from '../Error/ErrorContext';

interface GetResultButtonProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    getResult: Function,
}

const GetResultButton: React.FC<GetResultButtonProps> = ({setLoading, getResult}) => {
    const {error, setError}: any = useContext(ErrorContext);

    const onClick = async () => {
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
        >
            Get reviewer
        </button>
    );
}

export default GetResultButton;
