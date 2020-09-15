import React from 'react';
import './App.css';

import Sidebar from './containers/Sidebar/Sidebar';
import Chat from './containers/Chat/Chat';

function App() {
  return (
    //BEM Naming convention
    <div className="App">

      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
