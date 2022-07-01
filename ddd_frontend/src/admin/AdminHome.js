import React from 'react';
import AdminNavbar from './AdminNavbar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import history from '../components/history';
import Typography from '@material-ui/core/Typography';
import quiz_pic from '../assets/questions.jpg';
import forum from '../assets/forum.svg';

const AdminHome = () => {

    const goToManageQuiz = () => {
        history.push('/manageQuiz');
    }

    const goToManageForum = () =>{
        history.push('/manageForum');
        console.log('Manage forum');
    }

    return (
        <React.Fragment>
            <AdminNavbar />

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{padding:30}}
                spacing={2}
            >

                <Grid item >
                    <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToManageQuiz()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image={quiz_pic}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography fontFamily={'monospace'} align="center" variant="h4" >
                                    Manage Quiz
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>

                <Grid item >
                    <Card sx={{ maxWidth: 345, boxShadow: 3 }} >
                        <ButtonBase
                            style={{
                                display: 'block',
                                textAlign: 'initial'
                            }}
                            onClick={() => goToManageForum()}
                        >
                            <CardMedia
                                component="img"
                                height="194"
                                image={forum}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography fontFamily={'monospace'} align="center" variant="h4" >
                                    Manage Forum
                                </Typography>
                            </CardContent>


                        </ButtonBase>
                    </Card>
                </Grid>

            </Grid>

        </React.Fragment>
    );

}

export default AdminHome;