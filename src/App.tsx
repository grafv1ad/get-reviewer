import React, { useState, useEffect } from 'react';
import './App.css';

import Settings from './components/Settings/Settings';
import IResult from './components/Result/ResultInterface';
import Result from './components/Result/Result';

const App = () => {
  const [result, setResult]: [IResult[] | undefined, React.Dispatch<React.SetStateAction<IResult[] | undefined>>] = useState();

  return(
    <main className='main'>
      <Settings />
      <Result result={result} setResult={setResult} />
    </main>
  );
}

export default App;
