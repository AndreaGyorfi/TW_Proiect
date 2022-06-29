import React from "react";
import AdminNavbar from "./AdminNavbar";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from "@material-ui/core";
import history from "../components/history";

//SERVICE
import quizServices from "../services/quiz.services";

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

const answers = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'B',
      label: 'B',
    },
    {
      value: 'C',
      label: 'C',
    },
    {
      value: 'D',
      label: 'D',
    },
  ];

const AddQuestion = () => {

    const classes = formstyle();
    const [question, setQuestion ] = React.useState({
        question_text:"",
        a_res:"",
        b_res:"",
        c_res:"",
        d_res:"",
        correct_answer:"",
    })

    const handleTextInputChanges = (event) =>{
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value });
    }

    const saveQuestion = async () =>{
        console.log(question);

        try {

            const response = await quizServices.addQuestion(question);

            console.log("response", response.data);

            if (response.data['message'] === "success") {
                history.push('/questionList')
            } else {
                console.log('save error');
            }

        } catch (e) {
            console.log(e);
        }
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
                        style={{padding:10}}
                    >

                        <Grid item xs>
                            <Typography variant="h4">
                                Add question
                            </Typography>
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="question_text"
                                value={question.question_text}
                                onChange={handleTextInputChanges}
                                label="Question text"
                                type="text"
                                placeholder="Question text"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="a_res"
                                value={question.a_res}
                                onChange={handleTextInputChanges}
                                label="Answer A"
                                type="text"
                                placeholder="Answer A"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="b_res"
                                value={question.b_res}
                                onChange={handleTextInputChanges}
                                label="Answer B"
                                type="text"
                                placeholder="Answer B"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="c_res"
                                value={question.c_res}
                                onChange={handleTextInputChanges}
                                label="Answer C"
                                type="text"
                                placeholder="Answer C"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                name="d_res"
                                value={question.d_res}
                                onChange={handleTextInputChanges}
                                label="Answer D"
                                type="text"
                                placeholder="Answer D"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                select
                                className={classes.textField}
                                label="Correct answer"
                                name="correct_answer"
                                value={question.correct_answer}
                                onChange={handleTextInputChanges}
                                variant="outlined"
                            >
                                {answers.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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

export default AddQuestion;