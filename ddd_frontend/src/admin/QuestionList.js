import React,{useEffect} from 'react'
import AdminNavbar from './AdminNavbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import history from '../components/history';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

//SERVICE
import quizServices from '../services/quiz.services';

const QuestionList = () =>{

    const [allQuestion, setAllQuestion] = React.useState([]);

    useEffect(()=>{
        retriveQuestion();
    },[])

    const retriveQuestion = async () => {

        try {

            const response = await quizServices.getAllQuestion();
            console.log(response.data);
            setAllQuestion(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    useEffect(()=>{

    },[allQuestion])
    
    const deleteQuestion = async (id) =>{
        
        try {

            const response = await quizServices.deleteQuestion(id);
            console.log(response.data);
            if(response.data['message'] === 'success'){
                retriveQuestion()
            }
            

        }catch(e){
            console.log(e);
        }


    }

    const editQuestion = (id) =>{
        console.log(id);
        history.push("/editquestion/"+id);
    }

    const handleAddQuestion = () =>{
      history.push("/addquestion");
    }


    return(
        <React.Fragment>
            <AdminNavbar/>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{padding:30}}
            >

            <Grid item xs>
              <Tooltip title={<h3>Add question</h3>} placement="bottom" >
                        <IconButton aria-label="Add"  onClick={() => handleAddQuestion()}>
                            <AddCircleIcon color="primary" style={{ fontSize: 70 }} />
                        </IconButton>
                    </Tooltip>
            </Grid>


            <Grid item xs>
            
<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>QuestionText</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allQuestion.length !== 0 && allQuestion.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.question_text}</TableCell>
              <TableCell>
                <IconButton aria-label="Add" onClick={() => editQuestion(row.id)}>
                    <EditIcon color="primary" style={{ fontSize: 30 }} />
                </IconButton>
              </TableCell>
              <TableCell>
              <IconButton aria-label="Add" onClick={()=> deleteQuestion(row.id)}>
                    <DeleteIcon color="primary" style={{ fontSize: 30 }} />
                </IconButton>
              </TableCell>
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

export default QuestionList;