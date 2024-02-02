import React, { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

const Error = () => {
    const {error}: any = useContext(ErrorContext);

    return (
        <>
            {error?.name &&
                <div className="error">
                    {error.message || 'Unknown error, please try again'}
                </div>
            }
        </>
    );
}

export default Error;
