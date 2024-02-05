import React from 'react';

interface SettingsButtonProps {
    visibility: boolean,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

const SettingsButton: React.FC<SettingsButtonProps> = ({visibility, setVisibility}) => {
    let classes = 'py-2 px-4 border transition-all ';
    classes += visibility ? 'text-neutral-600 hover:border-sky-600' : 'border-sky-600 hover:bg-sky-600 hover:text-white'

    return (
        <button 
            className={classes}
            onClick={() => setVisibility(!visibility)}
        >
            {visibility ? 'Hide' : 'Show' }&nbsp;settings
        </button>
    );
}

export default SettingsButton;
