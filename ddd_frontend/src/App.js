import './App.css';
import React from"react";
import {Route ,Router, Switch} from "react-router-dom";
import history from "./components/history";


import PrivateRoute from "./private_route";

import MainMenu from './components/MainMenu';
import About from './components/About';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Quiz from './components/Quiz';
import Quizzes from './components/Quizzes';
import Forum from './components/Forum';
import LeaderBoard from './components/LeaderBoard';
import QuizLeaderBoard from './components/QuizLeaderBoard';
//ADMIN PAGES
import AdminHome from './admin/AdminHome';
import QuizManage from './admin/QuizManage';
import AddQuestion from './admin/AddQuestion';
import QuestionList from './admin/QuestionList';
import EditQuestion from './admin/EditQuestion';
import CreateQuiz from './admin/CreateQuiz';
import QuizList from './admin/QuizList';
import EditQuiz from './admin/EditQuiz';
import ManageForum from './admin/ManageForum';

//PDFS
import Scanare from './components/Scanare';
import Imprimante3D from './components/Imprimanta';

function App() {
  return (
    <Router history={history} >
      <Switch>
          
          <Route exact path="/" component={MainMenu}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/register" component={RegisterForm}/>
          <Route exact path="/scanare" component={Scanare}/>
          <Route exact path="/imprimante3d" component={Imprimante3D}/>

          <PrivateRoute exact path="/quiz/:id" component={Quiz}/>
          <PrivateRoute exact path="/quizzes" component={Quizzes}/>
          <PrivateRoute exact path="/forum" component={Forum}/>
          <PrivateRoute exact path="/leaderboard" component={LeaderBoard}/>
          <PrivateRoute exact path="/leaderboard/:id" component={QuizLeaderBoard}/>
          

          <PrivateRoute exact path="/adminMain" component={AdminHome} />
          <PrivateRoute exact path="/manageQuiz" component={QuizManage}/>
          <PrivateRoute exact path="/addquestion" component={AddQuestion}/>
          <PrivateRoute exact path="/questionList" component={QuestionList}/>
          <PrivateRoute exact path="/editquestion/:id" component={EditQuestion}/>
          <PrivateRoute exact path="/createQuiz" component={CreateQuiz}/>
          <PrivateRoute exact path="/quizList" component={QuizList}/>
          <PrivateRoute exact path="/editquiz/:id" component={EditQuiz}/>
          <PrivateRoute exact path="/manageForum" component={ManageForum}/>
          
      </Switch>
    </Router>
  );
}

export default App;
