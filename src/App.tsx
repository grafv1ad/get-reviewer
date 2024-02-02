import React, { useState } from 'react';
import ISettings from './components/Settings/SettingsInterface';
import Settings from './components/Settings/Settings';
import Result from './components/Result/Result';
import Error from './components/Error/Error';
import { ErrorContextProvider } from './components/Error/ErrorContext';

const App = () => {
  const [settings, setSettings]: [ISettings, React.Dispatch<React.SetStateAction<ISettings>>] = useState({
    login: '',
    repo: '',
    blacklist: '',
  });

  return(
    <main className='main'>
      <ErrorContextProvider>
        <Settings settings={settings} setSettings={setSettings} />
        <Error />
        <Result settings={settings} />
      </ErrorContextProvider>
    </main>
  );
}

export default App;
