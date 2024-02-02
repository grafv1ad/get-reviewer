import React, { PropsWithChildren, useState } from 'react';
import IError from './ErrorInterface';

interface IErrorContext {
    error: IError | null,
    setError: React.Dispatch<React.SetStateAction<IError | null>>
}

export const ErrorContext = React.createContext<IErrorContext | null>(null);

export const ErrorContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [error, setError] = useState<IError | null>(null)

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {props.children}
        </ErrorContext.Provider>
    );
}
