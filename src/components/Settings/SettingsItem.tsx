import React from 'react';

interface SettingsItemProps {
    name: string,
    label: string,
    placeholder: string,
}

const SettingsItem: React.FC<SettingsItemProps> = ({name, label, placeholder}) => {
    const updateSettings = () => {
        console.log('success')
    }

    return (
        <div className="settings__item">
            <label htmlFor={name} className="settings__item-label">{label}</label>
            <input type="text" 
                id={name} 
                name={name} 
                className="settings__item-input" 
                placeholder={placeholder}
                onChange={updateSettings}
            />
        </div>
    );
}

export default SettingsItem;
