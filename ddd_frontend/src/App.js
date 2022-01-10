import './App.css';
import React from"react";
import {Route ,Router, Switch} from "react-router-dom";
import history from "./components/history";



import MainMenu from './components/MainMenu';
import About from './components/About';
import Login from './components/Login';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router history={history} >
      <Switch>
          
          <Route exact path="/" component={MainMenu}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/quiz" component={Quiz}/>
          
      </Switch>
    </Router>
  );
}

export default App;
