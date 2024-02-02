import React, { useState } from 'react';
import ISettings from './SettingsInterface';
import SettingsItem from './SettingsItem';
import ToggleSettingsButton from './ToggleSettingsButton';

const settingsList = [
    {
        name: 'login',
        label: 'Login',
        placeholder: 'Enter user login',
    },
    {
        name: 'repo',
        label: 'Repository name',
        placeholder: 'Enter repository name',
    },
    {
        name: 'blacklist',
        label: 'Users blacklist',
        placeholder: 'Enter user logins separated by commas',
    },
];

interface SettingsProps {
    settings: ISettings,
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>,
}

const Settings: React.FC<SettingsProps> = ({settings, setSettings}) => {
    const [visibility, setVisibility] = useState(true);

    const updateSettings = (name: string, value: string) => {
        setSettings({ 
            ...settings, 
            [name]: value,
        });
    }

    return (
        <div className="settings">
            {visibility &&
                <div className="settings__list">
                    {settingsList.map((item) => (
                        <SettingsItem 
                            key={item.name} 
                            name={item.name} 
                            label={item.label} 
                            placeholder={item.placeholder} 
                            settings={settings}
                            updateSettings={updateSettings}
                        />
                    ))}
                </div>
            }   
            <ToggleSettingsButton visibility={visibility} setVisibility={setVisibility} />
        </div>
    );
}

export default Settings;
