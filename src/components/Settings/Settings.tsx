import React, { useState, useContext } from 'react';
import ISettings from './SettingsInterface';
import SettingsItem from './SettingsItem';
import SettingsButton from './SettingsButton';
import { localStorageSetItem } from '../LocalStorage/LocalStorageContext';

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
        localStorageSetItem(name, value);
        setSettings(settings => {
            return {
                ...settings, 
                [name]: value,
            } 
        });
    }

    return (
        <div className="settings">
            {visibility &&
                <div className="flex flex-col gap-3 mb-4">
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
            <SettingsButton visibility={visibility} setVisibility={setVisibility} />
        </div>
    );
}

export default Settings;
