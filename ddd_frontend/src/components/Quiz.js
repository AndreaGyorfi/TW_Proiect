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


const steps = ['1', '2', '3', '4','5'];

const Quiz = () =>{

  const [activeStep, setActiveStep] = React.useState(0);
  let totalScore_help = 0;
  const [totalScore, setTotalScore] = React.useState(0);
  const [ q1_ans, setQ1_ans] = React.useState('');
  const [ q2_ans, setQ2_ans] = React.useState('');
  const [ q3_ans, setQ3_ans] = React.useState('');
  const [ q4_ans, setQ4_ans] = React.useState('');
  const [ q5_ans, setQ5_ans] = React.useState('');


  const handleQ1 = (event) =>{
    setQ1_ans(event.target.value);
  }

  const handleQ2 = (event) =>{
    setQ2_ans(event.target.value);
  }

  const handleQ3 = (event) =>{
    setQ3_ans(event.target.value);
  }

  const handleQ4 = (event) =>{
    setQ4_ans(event.target.value);
  }

  const handleQ5 = (event) =>{
    setQ5_ans(event.target.value);
  }


  useEffect(()=>{
    if(q1_ans === 'svg'){
        totalScore_help = totalScore_help + 1;
    }

    if(q2_ans === 'gravitatea'){
        totalScore_help = totalScore_help + 1;
    }

    if(q3_ans === '3_dimensiuni'){
        totalScore_help = totalScore_help + 1;
    }

    if(q4_ans === 'left_red_right_blue'){
        totalScore_help  = totalScore_help +1;
    }

    if(q5_ans === 'personalizare'){
        totalScore_help = totalScore_help +1;
    }

    setTotalScore(totalScore_help)

  },[q1_ans, q2_ans, q3_ans, q4_ans, q5_ans])



  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
   
  };

  const handleReset = () => {
    setActiveStep(0);
    setQ1_ans('');
    setQ2_ans('');
    setQ3_ans('');
    setQ4_ans('');
    setQ5_ans('');
    setTotalScore(0);
  };

  function getStepContent(step){
    switch (step) {
        case 0:
          return(  
              <>
              <div align="center">
              <Card sx={{ maxWidth: 500 }} elevation={5}>
               
                <CardContent>
                    <Typography variant="h5">
                    Care este formatul de fișier pe care l-am salva din Google Drawing?  
                    </Typography>
                </CardContent>

            <CardActions>
               
                <FormControl component="fieldset">
      
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={q1_ans}
                            onChange={handleQ1}
                        >
                            <FormControlLabel value="stl" control={<Radio />} label="stl" />
                            <FormControlLabel value="jpg" control={<Radio />} label="jpg" />
                            <FormControlLabel value="svg" control={<Radio />} label="svg" />
                            <FormControlLabel value="gif" control={<Radio />} label="gif" />
                        </RadioGroup>
                    </FormControl>
               
            </CardActions>
            </Card>
            </div>
              </>
              
            );
        case 1:
          return(
            <>
            <div align="center">
            <Card sx={{ maxWidth: 500 }} elevation={5}>
             
              <CardContent>
                  <Typography variant="h5">
                  Care este cel mai important lucru de care ar trebui să iei în considerare atunci când faci ceva în 3d?  
                  </Typography>
              </CardContent>

          <CardActions>
           
              <FormControl component="fieldset">
    
                      <RadioGroup
                          row
                          aria-label="gender"
                          name="controlled-radio-buttons-group"
                          value={q2_ans}
                          onChange={handleQ2}
                      >
                          <FormControlLabel value="mărimea" control={<Radio />} label="mărimea" />
                          <FormControlLabel value="gravitatea" control={<Radio />} label="gravitatea" />
                          <FormControlLabel value="funcţionalitate" control={<Radio />} label="funcţionalitate" />
                          <FormControlLabel value="calitate" control={<Radio />} label="calitate" />
                      </RadioGroup>
                  </FormControl>
              
          </CardActions>
          </Card>
          </div>
            </>
              
              );
        case 2:
            return(
                <>
                <div align="center">
                <Card sx={{ maxWidth: 500 }} elevation={5}>
                 
                  <CardContent>
                      <Typography variant="h5">
                      Ce înseamnă 3D? 
                      </Typography>
                  </CardContent>
    
              <CardActions>
                  
                  <FormControl component="fieldset">
        
                          <RadioGroup
                              row
                              aria-label="gender"
                              name="controlled-radio-buttons-group"
                              value={q3_ans}
                              onChange={handleQ3}
                          >
                              <FormControlLabel value="filme" control={<Radio />} label="filme" />
                              <FormControlLabel value="3_dimensiuni" control={<Radio />} label="3 dimensiuni" />
                              <FormControlLabel value="stereoscopic" control={<Radio />} label="stereoscopic" />
                              <FormControlLabel value="grafica pe computer" control={<Radio />} label="grafica pe computer" />
                          </RadioGroup>
                      </FormControl>
                  
              </CardActions>
              </Card>
              </div>
                </>
               
            );
        case 3:
            return(
                <>
                <div align="center">
                <Card sx={{ maxWidth: 500 }} elevation={5}>
                 
                  <CardContent>
                      <Typography variant="h5">
                      Cum arată ochelarii 3D de modă veche?
                      </Typography>
                  </CardContent>
    
              <CardActions>
                  
                  <FormControl component="fieldset">
        
                          <RadioGroup
                              row
                              aria-label="gender"
                              name="controlled-radio-buttons-group"
                              value={q4_ans}
                              onChange={handleQ4}
                          >
                              <FormControlLabel value="left blue, right red" control={<Radio />} label="left blue, right red" />
                              <FormControlLabel value="left_red_right_blue" control={<Radio />} label="left red, right blue" />
                              <FormControlLabel value="left black, right white" control={<Radio />} label="left black, right white" />
                              <FormControlLabel value="left yellow, right purple" control={<Radio />} label="left yellow, right purple" />
                          </RadioGroup>
                      </FormControl>
                  
              </CardActions>
              </Card>
              </div>
                </>
               
            );
        case 4:
            return(
                <>
                <div align="center">
                <Card sx={{ maxWidth: 500 }} elevation={5}>
                 
                  <CardContent>
                      <Typography variant="h5">
                      Ce face imprimarea 3D superioară altor tehnici de crafting?
                      </Typography>
                  </CardContent>
    
              <CardActions>
                  
                  <FormControl component="fieldset">
        
                          <RadioGroup
                              row
                              aria-label="gender"
                              name="controlled-radio-buttons-group"
                              value={q5_ans}
                              onChange={handleQ5}
                          >
                              <FormControlLabel value="personalizare" control={<Radio />} label="personalizare" />
                              <FormControlLabel value="eficiență" control={<Radio />} label="eficiență" />
                              <FormControlLabel value="rapiditate" control={<Radio />} label="rapiditate" />
                              <FormControlLabel value="calitate" control={<Radio />} label="calitate" />
                          </RadioGroup>
                      </FormControl>
                  
              </CardActions>
              </Card>
              </div>
                </>
             
            );
        default:
          return "Unknown step";
      }
}



    return(
        <React.Fragment>
            <NavBar/>

            <Box sx={{ width: '100%' }} style={{paddingTop:20}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
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
            <Button onClick={handleReset} variant="contained">Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            
            
            
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            
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