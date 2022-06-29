import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar';
import Footer from './Footer';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import history from './history';

import quizServices from '../services/quiz.services';





const Quiz = (props) =>{

  const [activeStep, setActiveStep] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  const [quiz, setQuiz] = React.useState({});
  const [answer, setAnswer] = React.useState('');
  const [allAnswers, setAllanswers] = React.useState([]);


  useEffect(()=>{
    retriveQuiz(props.match.params.id);
  },[])  

  const retriveQuiz = async (id) =>{
      try {

        const response = await quizServices.getQuiz(id);
        console.log(response.data);
        setQuiz(response.data);
        console.log(Array.from(Array(response.data['questions'].length).keys()));
        setSteps(Array.from(Array(response.data['questions'].length).keys()))
        

    } catch (e) {
        console.log(e);
    }
  }



  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setAnswer('');
   
  };

  const handleAnswer = (event) =>{
    const {name, value } = event.target;
    console.log(value);
    console.log(name);
    setAnswer(value);
    let array = [];
    array = allAnswers;
    array.push(value);
    setAllanswers(array);
  }

  const handleFinish = () =>{
    console.log("All answers",allAnswers);

    let question_array = quiz.questions
    console.log("question array ", question_array);

    let total_score = 0;

    for(let i=0; i<allAnswers.length;i++){
      console.log(question_array[i].answer_owner['correct_answer']);
      if(allAnswers[i] === question_array[i].answer_owner['correct_answer']){
          total_score = total_score + 1;
      }
    }

    setTotalScore(total_score);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  }

  useEffect(()=>{

  },[totalScore])

  const handleReset  = async () =>{
    setActiveStep(0);
    setTotalScore(0);

    let data ={
      result:totalScore,
      quiz_id: quiz.id,
      user:localStorage.getItem('currentUser'),
    }

    console.log(data);

    
    try {

        const response = await quizServices.addQuizResult(data);

        console.log("response", response.data);

        if (response.data['message'] === "success") {
            history.push('/quizzes');
        } else {
            console.log('save error');
        }

    } catch (e) {
        console.log(e);
    }
}

  function getStepContent(step){
    if(quiz!== undefined){
    let questions = quiz.questions
    if(questions !== undefined){
    let question = questions[parseInt(step)]
    
    return(  
      <>
      <div align="center">
      <Card sx={{ maxWidth: 500 }} elevation={5}>
       
        <CardContent>
            <Typography variant="h5">
              {question.question_text}
            </Typography>
        </CardContent>

    <CardActions>
       
        <FormControl component="fieldset">

                <RadioGroup
                    row
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={answer}
                    onChange={handleAnswer}
                >
                    <FormControlLabel value="A" control={<Radio />} label={question.answer_owner['a_res']} />
                    <FormControlLabel value="B" control={<Radio />} label={question.answer_owner['b_res']} />
                    <FormControlLabel value="C" control={<Radio />} label={question.answer_owner['c_res']} />
                    <FormControlLabel value="D" control={<Radio />} label={question.answer_owner['d_res']} />
                </RadioGroup>
            </FormControl>
       
    </CardActions>
    </Card>
    </div>
      </>
      
    );
    }
    }
  }

 



    return(
        <React.Fragment>
            <NavBar/>

            <Box sx={{ width: '100%' }} style={{paddingTop:20}}>
      <Stepper activeStep={activeStep}>
        {steps !== undefined && steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}/>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          
          <div align="center">
                <Card sx={{ maxWidth: 500 }} elevation={5}>
                 
                  <CardContent>
                      <Typography variant="h5">
                      Your Score:{totalScore}
                      </Typography>
                  </CardContent>

              
              </Card>
              </div>
         
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset} variant="contained">Save</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            
            
            
            
              {activeStep === steps.length - 1 ? (<>
                <Button onClick={handleFinish} variant="contained">
                Finish
                </Button>
              </>) : (<>
                <Button onClick={handleNext} variant="contained">Next</Button>
              
              </>)}
            
            
          </Box>
        </React.Fragment>
      )}
    </Box>
            <div style={{position:'absolute',
                        left:0,bottom:0,right:0}}>
            <Footer />
            </div>
        </React.Fragment>
    );

}


export default Quiz;