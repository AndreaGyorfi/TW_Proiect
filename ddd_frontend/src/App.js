import './App.css';
import React from"react";
import {Route ,Router, Switch} from "react-router-dom";

import history from "./components/history";



import MainMenu from './components/MainMenu';
import Contact from './components/Contact';

function App() {
  return (
    <Router history={history} >
      <Switch>
          <Route exact path="/" component={MainMenu}/>
          <Route exact path="/contact" component={Contact}/>
          
      </Switch>
    </Router>
  );
}

export default App;
