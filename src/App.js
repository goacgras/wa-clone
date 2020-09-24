import React, { useState, useEffect } from 'react';
import db from './firebase';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './context/StateProvider';

import Sidebar from './containers/Sidebar/Sidebar';
import Chat from './containers/Chat/Chat';
import Login from './components/Login/Login';
import SideDrawer from './components/SideDrawer/SideDrawer';

import './App.css';


function App() {
  const [rooms, setRooms] = useState([]);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const { user } = useStateValue()[0];
  console.log(user);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const drawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }))
      )
    ));

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    //BEM Naming convention
    <div className="App">

      {!user ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar rooms={rooms} />

              {/* <SideDrawer /> */}
              <SideDrawer
                opened={showSideDrawer}
                closed={sideDrawerCloseHandler}
                rooms={rooms} />

              <Switch>

                {/* Creating a path */}
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>

                <Route path="/">
                  <Chat drawerToggleClick={drawerToggleHandler} />
                </Route>

              </Switch>
            </Router>

          </div>
        )}
    </div>
  );
}

export default App;
