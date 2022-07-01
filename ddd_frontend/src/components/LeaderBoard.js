import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import history from './history';
import quizServices from '../services/quiz.services';

const LeaderBoard = () =>{

    const [allQuizzes, setAllQuizzes]  = React.useState([]);

    useEffect(()=>{
        retriveQuiz();
    },[]);

    const retriveQuiz = async () =>{

        try {

            const response = await quizServices.getAllQuiz();
            console.log(response.data);
            setAllQuizzes(response.data);


        } catch (e) {
            console.log(e);
        }

    }

    const goToQuizResults = (id) =>{
        history.push("/leaderboard/"+id);
    } 

    

    return(
        <React.Fragment>
            <NavBar/>

            <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ padding: 30 }}
                    spacing={2}
            >
                { allQuizzes.length !== 0 && allQuizzes.map((item)=>(
                
                    <Grid item key={item.id}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToQuizResults(item.id)}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://gamipress.com/wp-content/uploads/2018/12/leaderboards.svg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography fontFamily={'monospace'} align="center" variant="h4" >
                                    {item.name}
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                    </Grid>
                ))}

            </Grid>

        </React.Fragment>
    );

}

export default LeaderBoard;