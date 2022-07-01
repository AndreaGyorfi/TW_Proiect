import React, { useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TreeItem from '@material-ui/lab/TreeItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import forumServices from '../services/forum.services';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card_width:{
        width:600,
    },
    paper:{
        height:'100%',
    },
    card: {
        width: 600,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
      },
    
  }));

const ManageForum = () => {
    const classes = useStyles();
    const [allPosts, setAllPosts] = React.useState([]);

    useEffect(()=>{
        retriveAllPosts();
    },[])


    useEffect(()=>{

    },[allPosts])

    const retriveAllPosts = async () => {

        try {

            const response = await forumServices.getAllPosts();
            console.log(response.data);
            setAllPosts(response.data);


        } catch (e) {
            console.log(e);
        }

    }

    const deletePost = async (id) =>{
        console.log("delete post",id);
        try{

            const response = await forumServices.deleteForum(id);
            if(response.data['message'] === 'success'){
                retriveAllPosts();
            }

        }catch(e){
            console.log(e);
        }
    } 

    const deleteComment = async (id) =>{
        console.log("delete comment",id);
        try{

            const response = await forumServices.deleteComment(id);
            if(response.data['message'] === 'success'){
                retriveAllPosts();
            }

        }catch(e){
            console.log(e);
        }
    }


    return (
        <React.Fragment>
            <AdminNavbar />
            <Grid container
                justifyContent='center'
                alignContent='center'
                style={{ paddingTop: 30 }}
            >



                <Grid item>

                    <TreeView
                        //className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {allPosts.length !== 0 && allPosts.map((item) => (
                            <>
                                <br />
                                <TreeItem nodeId={item.id} label={
                                    <>
                                        <Card className={classes.card} >
                                            <CardContent>
                                                <Typography variant="h5" component="h2">
                                                    {item.post_title}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {item.post_content}
                                                </Typography>
                                            </CardContent>
                                            <CardActions >
                                                <div style={{display:'flex',justifyContent: "flex-start",flexGrow: 1}}>
                                                <Chip label={item.post_owner['username']} color="primary" />
                                                <Chip label={moment(item.create_time).format('MMMM Do YYYY, h:mm a')} />
                                                <Chip label={
                                                <Typography variant='caption'>{item.comments.length} Comments</Typography>}/>
                                                </div>
                                                <Button
                                                
        variant="contained"
        color="warning"
        startIcon={<DeleteIcon />}
        onClick={()=>deletePost(item.id)}
      >
        Delete
      </Button>
      
                                            </CardActions>
                                        </Card>

                                    </>
                                }>


                                    {item.comments.map((item) => (
                                        <>
                                            <br />
                                            <TreeItem nodeId={item.id} label={
                                                <>
                                                    <Card className={classes.card_width} >
                                                        <CardContent>
                                                            <Typography variant="h5" component="h2">
                                                                {item.comment_content}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                        <div style={{display:'flex',justifyContent: "flex-start",flexGrow: 1}}>
                                                            <Chip label={item.comment_owner['username']} color="primary" />
                                                            <Chip label={moment(item.create_time).format('MMMM Do YYYY, h:mm:ss a')} />
                                                        </div>
                                                        <Button
                                                
        variant="contained"
        color="warning"
        startIcon={<DeleteIcon />}
        onClick={()=>deleteComment(item.id)}
      >
        Delete
      </Button>

                                                        </CardActions>
                                                    </Card>
                                                </>}
                                            />
                                        </>
                                    ))
                                    }





                                </TreeItem>

                                <br></br>
                            </>
                        ))}
                    </TreeView>

                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default ManageForum;