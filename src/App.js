import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './containers/Sidebar/Sidebar';
import Chat from './containers/Chat/Chat';

function App() {
  return (
    //BEM Naming convention
    <div className="App">

      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/">
              <Chat />
            </Route>

          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
