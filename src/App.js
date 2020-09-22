import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './context/StateProvider';

import Sidebar from './containers/Sidebar/Sidebar';
import Chat from './containers/Chat/Chat';
import Login from './components/Login/Login';
// import SideDrawer from './components/SideDrawer/SideDrawer';

import './App.css';


function App() {
  const { user } = useStateValue()[0];
  console.log(user);

  return (
    //BEM Naming convention
    <div className="App">

      {!user ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              {/* <SideDrawer /> */}

              <Switch>

                {/* Creating a path */}
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>

                <Route path="/">
                  <Chat />
                </Route>

              </Switch>
            </Router>
          </div>
        )}
    </div>
  );
}

export default App;
