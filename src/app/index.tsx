import Settings from '../components/Settings/Settings';
import Result from '../components/Result/Result';
import Error from '../components/Error/Error';
import { ErrorContextProvider } from '../components/Error/ErrorContext';
import './index.css';

const App = () => {
  return(
    <main className='container mx-auto max-w-2xl px-8 py-8 flex flex-col gap-8'>
      <ErrorContextProvider>
        <Settings />
        <Result />
        <Error />
      </ErrorContextProvider>
    </main>
  );
}

export default App;
