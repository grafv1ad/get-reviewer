import { FunctionComponent, useState } from 'react';

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

interface ToggleSettingsButtonProps {
    visibility: boolean,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

const ToggleSettingsButton: FunctionComponent<ToggleSettingsButtonProps> = ({ visibility, setVisibility }) => {
    return (
        <button 
            className="settings__toggle-button"
            onClick={() => setVisibility(!visibility)}
        >
            Toggle settings
        </button>
    );
}

const settingsList = [
    {
        name: 'login',
        label: 'Login',
    },
    {
        name: 'repo',
        label: 'Repository name',
    },
    {
        name: 'blacklist',
        label: 'Users blacklist',
    },
];

const Settings = () => {
    const [visibility, setVisibility] = useState(true);

    return (
        <div className={visibility ? 'settings settings_active' : 'settings'}>
            <div className="settings__list">
                {settingsList.map((item) => <SettingsItem key={item.name} name={item.name} label={item.label} />)}
            </div>
            <ToggleSettingsButton visibility={visibility} setVisibility={setVisibility} />
        </div>
    );
}

export default Settings;
