import React, { useEffect } from 'react';
import quizServices from '../services/quiz.services';
import NavBar from './NavBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@mui/material/Divider';
import forum from '../assets/forum.svg';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    card: {
        width: 500,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
      },
  });
  


const QuizLeaderBoard = (props) =>{

    const classes = useStyles();
    const [rows, setRows] = React.useState([]);

    useEffect(()=>{
        retriveResults(props.match.params.id);
    },[]);

    function compare( a, b ) {
        if ( a.result > b.result ){
          return -1;
        }
        if ( a.result < b.result){
          return 1;
        }
        return 0;
      }
      

    const retriveResults = async (id) =>{

        try {

            const response = await quizServices.getResultsByQuiz(id);
            console.log(response.data);
            let array = response.data;
            let sort_array = array.sort(compare);
            console.log(sort_array);
            setRows(response.data);
            
    
        } catch (e) {
            console.log(e);
        }

    }

    return(
        <React.Fragment>
            <NavBar/>

            <Grid container
            direction='column'
                  alignContent='center'
                  justifyContent='center'
                  spacing={3}
                  style={{paddingTop:30}}
            >

            <Grid item >


            <Card className={classes.card}>
        
        <CardContent className={classes.content}>

            
        <Grid container
                  direction="column"
                  alignContent='center'
                  justifyContent='center'
                  
            >
          <Grid item>
          <img src="https://gamipress.com/wp-content/uploads/2018/12/leaderboards.svg" width={400} heigh={200}/>
          </Grid>

          
          <Grid>
          <Divider className={classes.divider} light />
          </Grid>
          </Grid>
        </CardContent>
      </Card>
            </Grid>

            <Grid item>

            

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>

            </Grid>

        </React.Fragment>
    );
}

export default QuizLeaderBoard;