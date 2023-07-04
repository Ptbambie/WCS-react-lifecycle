import React, { useEffect, useState } from 'react';
import {
  getElapsedTime,
  startTime,
  startHms,
  getHms,
  getTickerStep,
  addMissing0,
  safeCheckTicker,
  hasBeenForced,
} from './_';

import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [clock, setClock] = useState(startTime);
  const [tickerStep, setTickerStep] = useState(clock.getSeconds() % 2 ? 'Tic' : 'Tac');

  const hms = getHms(clock);
  const spentHms = getElapsedTime(count);

  const tick = () => {
    const d = new Date();
    setTickerStep(getTickerStep(d));
    setClock(d);
  };

  useEffect(() => { // Code à exécuter lors du montage du composant (équivalent à componentDidMount)
    const ticker = setInterval(() => {
      if (!safeCheckTicker(ticker)) return;

      setCount((prevCount) => prevCount + 1);
    }, 1_000);

    const forcedReload = hasBeenForced();
    if (forcedReload) {
      alert("Something is really wrong with this component and we had to force reload :(\n We'll refresh the page to bring you to the starting point");
      document.location = "/";
    }

    return () => {
      clearInterval(ticker);  // Code de nettoyage à exécuter lors du démontage du composant (équivalent à componentWillUnmount)
    };
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    tick();
  }, [count]);

  return (
    <div className="App">
      <span>{tickerStep}</span>

      <span>
        Started at:
        {' '}
        {startHms.map(addMissing0).join(':')}
      </span>

      <span>
        Current time is:
        <br />
        {hms.map(addMissing0).join(':')}
      </span>

      <span>
        Spent time:
        <br />
        {spentHms.map(addMissing0).join(':')}
      </span>

      <span>
        Count:
        <br />
        {`${count}`}
      </span>
    </div>
  );
}

export default App;
