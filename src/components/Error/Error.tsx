import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

const Error = () => {
    const {error}: any = useContext(ErrorContext);

    if (!error) {
        return null;
    }

    return (
        <div className="text-red-800 font-semibold text-lg">
            {error.message || 'Unknown error, please try again'}
        </div>
    );
}

export default Error;
