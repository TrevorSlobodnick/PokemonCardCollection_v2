import Header from './components/Header';
import HomePage from './components/HomePage';
import AddCardPage from './components/AddCardPage';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [homePath, setHomePath] = useState("/?sort=rarity&search=&searchType=name")

  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/Add">
            <AddCardPage/>
          </Route>
          <Route path="/">
            <HomePage homePath={homePath} setHomePath={setHomePath} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
