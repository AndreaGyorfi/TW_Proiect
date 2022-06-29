import React,{useEffect} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import history from '../components/history';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

//Services
import quizServices from '../services/quiz.services';

const Quizzes = () =>{

    const [allQuizzes, setAllQuizzes] = React.useState([]);


    useEffect(()=>{
        retriveQuiz();
    },[])

    const retriveQuiz = async () => {

        try {

            const response = await quizServices.getAllQuiz();
            console.log(response.data);
            setAllQuizzes(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    const goToQuiz = (id) =>{
        history.push('/quiz/'+id);
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
                            onClick={() => goToQuiz(item.id)}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://skeepers.io/wp-content/uploads/2020/06/questions.jpg"
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

<div style={{position:'absolute',
                        left:0,bottom:0,right:0}}>
            <Footer />
            </div>
        </React.Fragment>
    );
}

export default Quizzes;