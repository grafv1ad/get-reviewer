import React, { useState } from 'react';
import ISettings from './components/Settings/SettingsInterface';
import Settings from './components/Settings/Settings';
import Result from './components/Result/Result';

const App = () => {
  const [settings, setSettings]: [ISettings, React.Dispatch<React.SetStateAction<ISettings>>] = useState({
    login: '',
    repo: '',
    blacklist: '',
  });

  return(
    <main className='main'>
      <Settings settings={settings} setSettings={setSettings} />
      <Result settings={settings} />
    </main>
  );
}

export default App;
