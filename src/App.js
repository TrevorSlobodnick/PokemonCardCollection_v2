import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AddCardPage from './components/AddCardPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/?sort=rarity&search=&type=name">
            <HomePage/>
          </Route>
          <Route path="/add">
            <AddCardPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
