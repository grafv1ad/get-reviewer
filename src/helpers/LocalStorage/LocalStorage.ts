export const getLocalStorageSupport = () => {
    try {
        return !!window.localStorage;
    } catch (error) {
        console.debug(error);
        return false;
    }
}

export const localStorageSetItem = (name: string, value: string) => {
    if (!getLocalStorageSupport()) return;
    try {
        window.localStorage.setItem(name, value);
    } catch (error) {
        console.debug(error);
        // Сносим, так как функция универсальная и не предусматривает
        // Попытку восстановить данные
        window.localStorage.removeItem(name);
    }
}

export const localStorageGetItem = (name: string) => {
    if (!getLocalStorageSupport()) return;
    try {
        return window.localStorage.getItem(name);
    } catch (error) {
        console.debug(error);
    }
}
