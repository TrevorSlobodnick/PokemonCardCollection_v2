import Header from './components/Header';
import HomePage from './components/HomePage';
import AddCardPage from './components/AddCardPage';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import { PATH } from './util/Constants';

function App() {

  return (
    <Router basename={PATH}>
      <div className="App">
        <Route exact path={["/logout", "/login", "/add", "/"]}>
          <Header/>
        </Route>
        <Switch>
          <Route exact path="/logout">
            <Logout/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/add">
            <AddCardPage/>
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
