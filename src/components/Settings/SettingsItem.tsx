import React, { useState, useEffect, useContext } from 'react';
import ISettings from './SettingsInterface';
import { localStorageGetItem } from '../../helpers/LocalStorage/LocalStorage';
import { IErrorContext, ErrorContext } from '../Error/ErrorContext';

interface SettingsItemProps {
    name: string,
    label: string,
    placeholder: string,
    settings: ISettings
    updateSettings: Function,
}

const SettingsItem: React.FC<SettingsItemProps> = ({name, label, placeholder, settings, updateSettings}) => {
    const [value, setValue] = useState<string>('');
    const {setError}: IErrorContext = useContext(ErrorContext);

    useEffect(() => {
        const newValue = localStorageGetItem(name) || settings[name];
        setValue(newValue);
        updateSettings(name, newValue)
    }, []);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="cursor-pointer text-sm text-sky-800">{label}</label>
            <input type="text" 
                id={name} 
                name={name} 
                value={value}
                placeholder={placeholder}
                className="py-2 px-4 border" 
                onChange={(event) => {
                    setError(null);
                    setValue(event.target.value);
                    updateSettings(name, event.target.value);
                }}
            />
        </div>
    );
}

export default SettingsItem;
