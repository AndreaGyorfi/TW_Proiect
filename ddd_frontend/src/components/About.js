
import React,{ useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import history from "./history";
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from '@mui/material/Link';
//Navbar
import NavBar from './NavBar';

//Footer
import Footer from './Footer';
import slider_1 from '../assets/slider_1.jpg';
import slider_2 from '../assets/slider_2.jpg';
import slider_3 from '../assets/slider_3.jpg';
import slider_4 from '../assets/slider_4.jpg';
import slider_5 from '../assets/slider_5.jpg';
import slider_text from '../assets/slider_text.PNG';

import imp_vid from '../assets/3d_imprimante_vid.mp4';
//"https://www.youtube-nocookie.com/embed/FqQAjkZOBeY"

const useStyles = makeStyles({
  
    appbar_text:{
      color:'black',
    },

    paper:{
      width: '100%',
      alignItems:'center',
      justifyContent:'center',
    }

});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
      imgPath: slider_1,
    },

    {
        imgPath:slider_2,
    },
    
    {
        imgPath: slider_3,
    },

    {
        imgPath:slider_4,
    },

    {
        imgPath:slider_5,
    },

]

const About = () =>{

    const classes = useStyles();
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    return(
        <React.Fragment>
            <Paper className={classes.paper}>
                <NavBar/>

                <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                />


                    <Grid item xs>

                        <Grid container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={30}
                            style={{padding:40}}
                            >
                        

                            <Grid item >
                                
                                <Card  style={{background: 'transparent', boxShadow: 'none',  maxWidth: 450 }}>
                                    <CardMedia
                                        component="img"
                                        src={slider_text}
                                    />
                                </Card>

                            </Grid>



                            <Grid item >

                                <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
                                    <Paper
                                        square
                                        elevation={0}
                                        sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: 50,
                                        pl: 2,
                                        bgcolor: 'background.default',
                                        }}
                                    >
                                    
                                    </Paper>
                                    <AutoPlaySwipeableViews
                                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                            index={activeStep}
                                            onChangeIndex={handleStepChange}
                                            enableMouseEvents
                                        >
                                            {images.map((step, index) => (
                                            <div key={step.label}>
                                                {Math.abs(activeStep - index) <= 2 ? (
                                                    <Box
                                                component="img"
                                                sx={{
                                                height: 400,
                                                display: 'block',
                                                maxWidth: 500,
                                                overflow: 'hidden',
                                                width: '100%',
                                                }}
                                                src={step.imgPath}
                                                alt={step.label}
                                            />
                                        ) : null}
                                        </div>
                                    ))}
                                        </AutoPlaySwipeableViews>
                                        <MobileStepper
                                            steps={maxSteps}
                                            position="static"
                                            activeStep={activeStep}
                                            nextButton={
                                            <Button
                                                size="small"
                                                onClick={handleNext}
                                                disabled={activeStep === maxSteps - 1}
                                            >
                                                Next
                                                {theme.direction === 'rtl' ? (
                                                <KeyboardArrowLeft />
                                                ) : (
                                                <KeyboardArrowRight />
                                                )}
                                            </Button>
                                            }
                                            backButton={
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                {theme.direction === 'rtl' ? (
                                                <KeyboardArrowRight />
                                                ) : (
                                                <KeyboardArrowLeft />
                                                )}
                                                Back
                                            </Button>
                                            }
                                        />
                                        </Box>

                            </Grid>
                        </Grid>
                    </Grid>
                

                <Grid item xs>


                        <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={20}
                        style={{padding:40}}
                        >

                            <Grid item >
                                <iframe src={imp_vid}  width={600} height={500} />
                            </Grid>

                            <Grid item >
                                <List>

                                <Link href="https://www.printam3d.ro/blog/totul-despre-imprimantele-3d-/" underline="none">
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <FiberManualRecordIcon color="primary" />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText >
                                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold' }} className={classes.appbar_text}>
                                            Totul despre imprimante 3D
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </Link>
                                
                                <Link href="https://www.printam3d.ro/blog/totul-despre-printarea-3d-/" underline="none">
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <FiberManualRecordIcon color="primary"/>
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText >
                                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold' }} className={classes.appbar_text}>
                                            Totul despre scanare 3D
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    </Link>
                                    
                                    {/* 
                                    <Link href="https://instrumentic.info/ro/hardware/3d-tv.html#gsc.tab=0" underline="none">
                                    
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <FiberManualRecordIcon color="primary" />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText >
                                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold' }} className={classes.appbar_text}>
                                        Totul despre sisteme 3D polarizat
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    </Link>
                                    */}

                                </List>
                            </Grid>
                        </Grid>

                    </Grid>

                    

                <Footer/>
            </Paper>





            







                
        </React.Fragment>
    )
}


export default About;