import { useState } from 'react';
import ISettings from './components/Settings/SettingsInterface';
import Settings from './components/Settings/Settings';
import Result from './components/Result/Result';
import Error from './components/Error/Error';
import { ErrorContextProvider } from './components/Error/ErrorContext';

const App = () => {
  const [settings, setSettings] = useState<ISettings>({
    login: '',
    repo: '',
    blacklist: '',
  });

  return(
    <main className="container mx-auto max-w-2xl px-8 py-8 flex flex-col gap-8">
      <ErrorContextProvider>
        <Settings settings={settings} setSettings={setSettings} />
        <Result settings={settings} setSettings={setSettings} />
        <Error />
      </ErrorContextProvider>
    </main>
  );
}

export default App;
