import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleTable, { MediaRecord } from './Table';

function App() {
  const [media, setMedia] = useState<Array<MediaRecord>>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch('/media/list').then((res) => res.json());

      setMedia(res.media);
    };

    fetchMedia();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SimpleTable rows={media}></SimpleTable>
    </div>
  );
}

export default App;
