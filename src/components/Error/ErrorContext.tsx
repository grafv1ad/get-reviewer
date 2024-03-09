import React, { PropsWithChildren, useState } from 'react';
import IError from './ErrorInterface';

export interface IErrorContext {
    error: IError | null | unknown,
    setError: React.Dispatch<React.SetStateAction<IError | null | unknown>>
}

export const ErrorContext = React.createContext<IErrorContext>({
    error: null,
    setError: (): void => {},
});

export const ErrorContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [error, setError] = useState<IError | null | unknown>(null)

    return (
        <ErrorContext.Provider value={{error, setError}}>
            {props.children}
        </ErrorContext.Provider>
    );
}
