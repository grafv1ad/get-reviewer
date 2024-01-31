import { useState } from 'react';
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

const Settings = () => {
    const [visibility, setVisibility] = useState(true);

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
                        />
                    ))}
                </div>
            }   
            <ToggleSettingsButton visibility={visibility} setVisibility={setVisibility} />
        </div>
    );
}

export default Settings;
