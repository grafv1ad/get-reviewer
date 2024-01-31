import React from 'react';

interface ToggleSettingsButtonProps {
    visibility: boolean,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

const ToggleSettingsButton: React.FC<ToggleSettingsButtonProps> = ({visibility, setVisibility}) => {
    return (
        <button 
            className="settings__toggle-button"
            onClick={() => setVisibility(!visibility)}
        >
            Toggle settings
        </button>
    );
}

export default ToggleSettingsButton;
