import React from 'react';
import classNames from 'classnames';

interface SettingsButtonProps {
    visibility: boolean,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

const SettingsButton: React.FC<SettingsButtonProps> = ({visibility, setVisibility}) => {
    const classes = classNames('py-2 px-4 border transition-all', {
        'text-neutral-600': visibility,
        'hover:border-sky-600': visibility,
        'border-sky-600': !visibility,
        'hover:bg-sky-600': !visibility,
        'hover:text-white': !visibility,
    });

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
