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

//ADMIN PAGES
import AdminHome from './admin/AdminHome';
import QuizManage from './admin/QuizManage';
import AddQuestion from './admin/AddQuestion';
import QuestionList from './admin/QuestionList';
import EditQuestion from './admin/EditQuestion';
import CreateQuiz from './admin/CreateQuiz';
import QuizList from './admin/QuizList';
import EditQuiz from './admin/EditQuiz';

//PDFS
import Scanare from './components/Scanare';

function App() {
  return (
    <Router history={history} >
      <Switch>
          
          <Route exact path="/" component={MainMenu}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/register" component={RegisterForm}/>
          <Route exact path="/scanare" component={Scanare}/>

          <PrivateRoute exact path="/quiz/:id" component={Quiz}/>
          <PrivateRoute exact path="/quizzes" component={Quizzes}/>
          <PrivateRoute exact path="/forum" component={Forum}/>

          <PrivateRoute exact path="/adminMain" component={AdminHome} />
          <PrivateRoute exact path="/manageQuiz" component={QuizManage}/>
          <PrivateRoute exact path="/addquestion" component={AddQuestion}/>
          <PrivateRoute exact path="/questionList" component={QuestionList}/>
          <PrivateRoute exact path="/editquestion/:id" component={EditQuestion}/>
          <PrivateRoute exact path="/createQuiz" component={CreateQuiz}/>
          <PrivateRoute exact path="/quizList" component={QuizList}/>
          <PrivateRoute exact path="/editquiz/:id" component={EditQuiz}/>
          
      </Switch>
    </Router>
  );
}

export default App;
