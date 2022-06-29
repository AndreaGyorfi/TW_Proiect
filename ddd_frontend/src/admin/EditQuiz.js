import React,{useEffect} from 'react'
import AdminNavbar from './AdminNavbar';
import history from '../components/history';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import quizServices from '../services/quiz.services';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 300,
        height: 330,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const EditQuiz = (props) =>{

    const classes = useStyles();
    const [quizName, setQuizName] = React.useState("");
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };




    useEffect(() => {
        retriveQuiz(props.match.params.id);
        retriveQuestion();
    }, [])



    const retriveQuiz = async (id) => {

        try {

            const response = await quizServices.getQuiz(id);
            console.log(response.data);
            setRight(response.data['questions']);
            setQuizName(response.data['name']);

        } catch (e) {
            console.log(e);
        }


    }


    const retriveQuestion = async () => {

        try {

            const response = await quizServices.getAllQuestion();
            console.log(response.data);
            setLeft(response.data);


        } catch (e) {
            console.log(e);
        }


    }

    const handleTextInputChanges = (event) =>{
        const { name, value } = event.target;
        setQuizName(value);
    }

    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-xitem-${value}-label`;

                    return (
                        <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.question_text} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );


    const submitEdit = () =>{
        console.log("Quiz questions", right);
        let quiz_data = {
            name:quizName,
            data:right,
        }

        console.log("edit data",quiz_data);

        quizServices.editQuiz(props.match.params.id, quiz_data)
            .then(response => {

                if (response.data['message'] === "success") {
                    history.push("/quizList");
                }

            })
            .catch(e => {
                console.log(e);
            })
    }

    return(
        <React.Fragment>
            <AdminNavbar/>


            <Grid container
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  spacing={3}
                  style={{paddingTop:30}}
            >


            <Grid item xs>
                <TextField
                    className={classes.textField}
                    name="name"
                    value={quizName}
                    onChange={handleTextInputChanges}
                    label="Quiz name"
                    type="text"
                    placeholder="Quiz name"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
            </Grid>

            <Grid item xs>

            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                className={classes.root}
                style={{ paddingTop: 30 }}
            >
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllRight}
                            disabled={left.length === 0}
                            aria-label="move all right"
                        >
                            ≫
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllLeft}
                            disabled={right.length === 0}
                            aria-label="move all left"
                        >
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>
            </Grid>

            </Grid>

            <Grid item xs>
                <Button variant="contained" color="primary" 
                 onClick={() => submitEdit()}
                >
                    Edit quiz
                </Button>
            </Grid>

            </Grid>

        </React.Fragment>
    );

}

export default EditQuiz;