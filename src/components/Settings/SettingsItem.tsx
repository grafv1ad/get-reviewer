import React, { useContext, useEffect } from 'react';
import { IErrorContext, ErrorContext } from '../Error/ErrorContext';
import { useSelector, useDispatch } from 'react-redux';
import ISettings from './SettingsInterface';
import { changeSettingsItem } from '../../store';
import { localStorageSetItem } from '../../helpers/LocalStorage/LocalStorage';

interface SettingsItemProps {
    name: string,
    label: string,
    placeholder: string,
}

const SettingsItem: React.FC<SettingsItemProps> = ({name, label, placeholder}) => {
    const value = useSelector((state: ISettings) => state[name]);
    const dispatch = useDispatch();
    const {setError}: IErrorContext = useContext(ErrorContext);

    useEffect(() => {
        localStorageSetItem(name, value);
    }, [value]);
    
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
                    dispatch(changeSettingsItem(name, event.target.value));
                }}
            />
        </div>
    );
}

export default SettingsItem;
