import React from 'react';
import AdminNavbar from './AdminNavbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import history from '../components/history';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import quiz_pic from '../assets/questions.jpg';




const QuizManage = () =>{

    

    const goToManageQuizzes = () =>{
        history.push("/quizList");
    }

    const goToManageQuestions = () =>{
        history.push("/questionList")
    }

    return(
        <React.Fragment>
            <AdminNavbar/>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{padding:30}}
            >

                <Grid item>
                <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToManageQuestions()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image={quiz_pic}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography fontFamily={'monospace'} align="center" variant="h4" >
                                    Manage Questions
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>

                <Grid item>
                <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToManageQuizzes()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://elearningindustry.com/wp-content/uploads/2021/10/Shareable-Quizzes-In-Online-Training-7-Reasons.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography fontFamily={'monospace'} align="center" variant="h4" >
                                    Manage Quizzes
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>
                
           
            </Grid>
            

        </React.Fragment>
    );
}


export default QuizManage;