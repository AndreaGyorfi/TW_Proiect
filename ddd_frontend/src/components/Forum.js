import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CommentIcon from '@material-ui/icons/Comment';
import forumServices from '../services/forum.services';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    card_width:{
        width:400,
    },
    paper:{
        height:'100%',
    },
  }));


function AddPost(props) {

    const { onClose, openAddPost } = props;
    const [newPost, setNewPost] = React.useState({
        post_title: "",
        post_content: "",
    })


    const handleTextInput = (event) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    }


    const savePost = async () => {
        console.log(newPost);
        let data = {
            post_title: newPost.post_title,
            post_content: newPost.post_content,
            user: localStorage.getItem('currentUser'),
        }

        console.log("DATA", data);

        try {

            const response = await forumServices.addNewPost(data);

            if (response.data['message'] === "success") {
                console.log("I'm  here new post");
                onClose();
            } else {
                console.log('save error');
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            <Dialog open={openAddPost} onClose={onClose} sx={{ boxShadow: 3 }}>



                <DialogContent>

                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >

                        <Grid item xs>
                            <Typography fontFamily={'monospace'} align="center" variant="h4" color="initial" >Create a new post</Typography>
                        </Grid>

                        <Grid item xs>
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                name="post_title"
                                variant="outlined"
                                value={newPost.post_title}
                                onChange={handleTextInput}
                                multiline
                                minRows={2}
                            />

                        </Grid>


                        <Grid item xs>
                            <TextField
                                id="outlined-basic"
                                label="Content"
                                variant="outlined"
                                name="post_content"
                                value={newPost.post_content}
                                onChange={handleTextInput}
                                multiline
                                minRows={4}
                            />

                        </Grid>


                        <Grid item xs>
                            <Button color="primary" variant='contained' onClick={() => savePost()}>
                                Create post
                            </Button>
                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>

        </React.Fragment>
    );


}

AddPost.propTypes = {
    onClose: PropTypes.func.isRequired,
    openAddPost: PropTypes.bool.isRequired,
};


const Forum = () => {

    const classes = useStyles();
    const [openAddPost, setOpenAddPost] = React.useState(false);
    const [allPosts, setAllPosts] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");

    useEffect(() => {
        retriveAllPosts();
    }, [])

    const retriveAllPosts = async () => {

        try {

            const response = await forumServices.getAllPosts();
            console.log(response.data);
            setAllPosts(response.data);


        } catch (e) {
            console.log(e);
        }

    }

    const handleClickOpen = () => {
        console.log("here I'M");
        setOpenAddPost(true);
    };

    const handleClose = () => {
        retriveAllPosts();
        setOpenAddPost(false);
    }

    const handleNewComment = (event) =>{
        const {name, value } = event.target;
        setNewComment(value);
    }

    const sendComment = async (id) =>{

        let data = {
            comment_content: newComment,
            user: localStorage.getItem('currentUser'),
        }

        console.log("POST ID", id);

        try {

            const response = await forumServices.addNewComment(id,data);

            if (response.data['message'] === "success") {
                retriveAllPosts();
            } else {
                console.log('save error');
            }

        } catch (e) {
            console.log(e);
        }


    } 

    return (
        <React.Fragment>
            <NavBar />

            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ padding: 20 }}
                //spacing={2}
            >

                <Grid item>
                    <Typography variant="h3">Welcome in the forum!</Typography>

                </Grid>

                <Grid item>
                    <Grid container
                        direction="row-reverse"
                        justifyContent="flex-start"
                        alignItems="center"
                        style={{ paddingLeft: 1000 }}
                        //spacing={2}
                    >

                        <Grid item>
                            <Tooltip title={<h3>Add new post</h3>} placement="top" >
                                <IconButton aria-label="Add" onClick={() => handleClickOpen()}>
                                    <AddCircleIcon color="primary" style={{ fontSize: 70 }} />
                                </IconButton>
                            </Tooltip>
                            <AddPost openAddPost={openAddPost} onClose={handleClose} />
                        </Grid>

                    </Grid>
                </Grid>


                <Grid item>

                <TreeView
                    //className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {allPosts.length !== 0 && allPosts.map((item) =>(
                      <>
                        <br/>
                        <TreeItem nodeId={item.id} label={
                            <>
                            <Card className={classes.card_width} >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                {item.post_title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                {item.post_content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Chip label={item.post_owner['username']} color="primary" />
                                <Chip label={moment(item.create_time).format('MMMM Do YYYY, h:mm:ss a')}/>
                            </CardActions>
                            </Card>
                            
                            </>
                        }>
                            {item.comments['comment_owner'] === null ? (<>
                           
                                <TreeItem nodeId="newID" label={
                                    <>
                                <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <CommentIcon />
                                </Grid>
                                <Grid item>
                                    <TextField multiline minRows={2} variant="outlined" name="newComment" onChange={handleNewComment} value={newComment} label="Comment..." />
                                </Grid>
                                <Grid item>
                                    <Button size="small" color="primary" variant="contained" onClick={() => sendComment(item.id)}>Send</Button>
                                </Grid>
                                </Grid> </>} />
                            
                            
                            
                            </>):(<>
                                
                            { item.comments.map((item) => (
                                <>
                                <br/>
                                <TreeItem nodeId={item.id} label={
                            <>
                            <Card className={classes.card_width} >
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                {item.comment_content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Chip label={item.comment_owner['username']} color="primary" />
                                <Chip label={moment(item.create_time).format('MMMM Do YYYY, h:mm:ss a')}/>
                            </CardActions>
                            </Card>
                            </>}
                            />
                            </>
                            ))
                            }
                                <br/>
                                <TreeItem nodeId="newID" label={
                                    <>
                                <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <CommentIcon />
                                </Grid>
                                <Grid item>
                                    <TextField multiline minRows={2} variant="outlined" name="newComment" onChange={handleNewComment} value={newComment} label="Comment..." />
                                </Grid>
                                <Grid item>
                                    <Button size="small" color="primary" variant="contained" onClick={() => sendComment(item.id)}>Send</Button>
                                </Grid>
                                </Grid> </>} />

                            
                            </>)}
                        
                        </TreeItem>
                        
                        <br></br>
                        </>
                    ))}
                </TreeView>

                </Grid>

            </Grid>

                                

        {/* 
            <div style={{flex: '0 0 auto'}}>
                
                <Footer/>
                
            </div>
            */}
            
            
        </React.Fragment>
    );

}

export default Forum;