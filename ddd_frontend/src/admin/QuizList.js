import React, { useEffect } from 'react'
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

//Service
import quizServices from '../services/quiz.services';


const QuizList = () => {

    const [allQuiz, setAllQuiz] = React.useState([]);

    useEffect(() => {
        retriveQuiz();
    }, [])

    const retriveQuiz = async () => {

        try {

            const response = await quizServices.getAllQuiz();
            console.log(response.data);
            setAllQuiz(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    const handleAddQuiz = () => {
        history.push("/createQuiz");
    }

    const editQuiz = (id) => {
        history.push("/editquiz/"+id);
    }

    useEffect(()=>{

    },[allQuiz])

    const deleteQuiz = async (id) => {
        try {

            const response = await quizServices.deleteQuiz(id);
            console.log(response.data);
            if(response.data['message'] === 'success'){
                retriveQuiz()
            }
            

        }catch(e){
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            <AdminNavbar />

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ padding: 30 }}
            >

                <Grid item xs>
                    <Tooltip title={<h3>Add quiz</h3>} placement="bottom" >
                        <IconButton aria-label="Add" onClick={() => handleAddQuiz()}>
                            <AddCircleIcon color="secondary" style={{ fontSize: 70 }} />
                        </IconButton>
                    </Tooltip>
                </Grid>

                <Grid item xs>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Quiz Name</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allQuiz.length !== 0 && allQuiz.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Add" onClick={() => editQuiz(row.id)}>
                                                <EditIcon color="primary" style={{ fontSize: 30 }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Add" onClick={() => deleteQuiz(row.id)}>
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

export default QuizList;