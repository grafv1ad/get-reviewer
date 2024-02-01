import React from 'react';

interface SettingsItemProps {
    name: string,
    label: string,
    placeholder: string,
    updateSettings: Function,
}

const SettingsItem: React.FC<SettingsItemProps> = ({name, label, placeholder, updateSettings}) => {
    return (
        <div className="settings__item">
            <label htmlFor={name} className="settings__item-label">{label}</label>
            <input type="text" 
                id={name} 
                name={name} 
                className="settings__item-input" 
                placeholder={placeholder}
                onChange={(event) => updateSettings(name, event.target.value)}
            />
        </div>
    );
}

export default SettingsItem;
