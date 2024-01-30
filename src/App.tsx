import React from 'react';
import './App.css';

import Settings from './components/Settings/Settings';
import GetResultButton from './components/GetResultButton/GetResultButton';
import Result from './components/Result/Result';

const App = () => {
  return(
    <main className='main'>
      <Settings />
      <GetResultButton />
      <Result />
    </main>
  );
}

export default App;
