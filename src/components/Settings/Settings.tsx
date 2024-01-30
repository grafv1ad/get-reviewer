import { FunctionComponent } from 'react';

interface SettingsItemProps {
    name: string,
    label: string,
}

const SettingsItem: FunctionComponent<SettingsItemProps> = ({name, label}) => {
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
                onChange={updateSettings}
            />
        </div>
    );
}

const Settings = () => {
    return (
        <div className="setting">
            <SettingsItem name="login" label="Login" />
            <SettingsItem name="repo" label="Repository name" />
            <SettingsItem name="blacklist" label="Users blacklist" />
        </div>
    );
}

export default Settings;
