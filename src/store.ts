import { createStore } from 'redux';
import { localStorageGetItem } from './shared/helpers/localstorage/localstorage';
import ISettings from './components/Settings/SettingsInterface';

interface ISettingsReducerAction {
    type: string,
    payload: string,
}

const initialState: ISettings = {
    login: localStorageGetItem('login') || '',
    repo: localStorageGetItem('repo') || '',
    blacklist: localStorageGetItem('blacklist') || '',
};

export const settingsReducer = (state = initialState, action: ISettingsReducerAction) => {
    switch (action.type) {
        case 'CHANGE_LOGIN':
            return {
                ...state,
                login: action.payload || '',
            };
        case 'CHANGE_REPO':
            return {
                ...state,
                repo: action.payload || '',
            };
        case 'CHANGE_BLACKLIST':
            return {
                ...state,
                blacklist: action.payload || '',
            };
        default:
            return state;
    }
}

export const changeSettingsItem = (name: string, value: string) => {
    return {
        type: `CHANGE_${name.toUpperCase()}`,
        payload: value,
    };
}

export const store = createStore(settingsReducer);
