import Header from './components/Header';
import HomePage from './components/HomePage';
import AddCardPage from './components/AddCardPage';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
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
