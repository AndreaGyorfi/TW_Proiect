import './App.css';
import React from"react";
import {Route ,Router, Switch} from "react-router-dom";
import history from "./components/history";



import MainMenu from './components/MainMenu';
import About from './components/About';

function App() {
  return (
    <Router history={history} >
      <Switch>
          <Route exact path="/" component={MainMenu}/>
          <Route exact path="/about" component={About}/>
          
      </Switch>
    </Router>
  );
}

export default App;
