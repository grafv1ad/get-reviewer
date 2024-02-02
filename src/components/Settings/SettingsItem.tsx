import React from 'react';
import ISettings from './SettingsInterface';

interface SettingsItemProps {
    name: string,
    label: string,
    placeholder: string,
    settings: ISettings
    updateSettings: Function,
}

const SettingsItem: React.FC<SettingsItemProps> = ({name, label, placeholder, settings, updateSettings}) => {
    return (
        <div className="settings__item">
            <label htmlFor={name} className="settings__item-label">{label}</label>
            <input type="text" 
                id={name} 
                name={name} 
                value={settings[name]}
                placeholder={placeholder}
                className="settings__item-input" 
                onChange={(event) => updateSettings(name, event.target.value)}
            />
        </div>
    );
}

export default SettingsItem;
