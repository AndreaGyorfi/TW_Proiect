import React, { useEffect } from 'react'
import quizServices from '../services/quiz.services';
import AdminNavbar from './AdminNavbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Select } from "@material-ui/core";
import history from "../components/history";


const formstyle = makeStyles((theme) => ({
    paper: {
        backgroundColor: "white",
        width: 500,
        borderRadius: 20,
        borderBlockColor: "black",
    },

    textField: {
        width: "25ch",
        fontSize: 20,
        "& .MuiInputLabel-formControl": {
            color: "black",
        },
    },

}));



const EditQuestion = (props) => {

    const classes = formstyle();
    const [question, setQuestion] = React.useState({});
    const [answer, setAnswer] = React.useState({});

    useEffect(() => {
        retriveQuestion(props.match.params.id)
    }, [])



    const retriveQuestion = async (id) => {

        try {

            const response = await quizServices.getQuestion(id);
            console.log(response.data['data']);
            setQuestion(response.data['data']);
            setAnswer(response.data['data'].answer_owner);

        } catch (e) {
            console.log(e);
        }


    }

    const handleTextInputChanges = (event) => {
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value });
    }

    const handleAnswerInputChanges = (event) =>{
        const { name, value } = event.target;
        setAnswer({ ...answer, [name]: value });
    }


    const saveQuestion = () => {
        console.log("FIRST",question.answer_owner);
        question.answer_owner = answer;
        console.log("SECOND", question);

        quizServices.updateQuestion(props.match.params.id, question)
            .then(response => {

                if (response.data['message'] === "success") {
                    history.push("/questionList");
                }

            })
            .catch(e => {
                console.log(e);
            })

    }

    return (
        <React.Fragment>
            <AdminNavbar />

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ padding: 20 }}
            >
                <Paper elevation={6} className={classes.paper}>

                    <Grid
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        style={{ padding: 10 }}
                    >

                        <Grid item xs>
                            <Typography variant="h4">
                                Edit question
                            </Typography>
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="question_text"
                                value={question.question_text || ""}
                                onChange={handleTextInputChanges}
                                label="Question text"
                                type="text"
                                placeholder="Question text"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="a_res"
                                value={answer.a_res || ""}
                                onChange={handleAnswerInputChanges}
                                label="Answer A"
                                type="text"
                                placeholder="Answer A"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="b_res"
                                value={answer.b_res || ""}
                                onChange={handleAnswerInputChanges}
                                label="Answer B"
                                type="text"
                                placeholder="Answer B"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="c_res"
                                value={answer.c_res || ""}
                                onChange={handleAnswerInputChanges}
                                label="Answer C"
                                type="text"
                                placeholder="Answer C"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="d_res"
                                value={answer.d_res || ""}
                                onChange={handleAnswerInputChanges}
                                label="Answer D"
                                type="text"
                                placeholder="Answer D"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <Select
                                className={classes.textField}
                                label="Correct answer"
                                name="correct_answer"
                                value={answer.correct_answer || ""}
                                onChange={handleAnswerInputChanges}
                                variant="outlined"
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <MenuItem value={"D"}>D</MenuItem>
                            </Select>

                        </Grid>

                        <Grid item xs>
                            <Button variant="contained" color="primary" onClick={() => saveQuestion()}>
                                Save
                            </Button>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>

        </React.Fragment>
    );
}

export default EditQuestion;