import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axiosInstance from '../components/axiosApi';
import history from "../components/history";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
      },
    fullList: {
        width: 'auto',
    },
}));





const AdminNavbar = () => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        left: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const goToQuestionList = () =>{
        history.push('/questionList');
    }

    const goToAdminHome = () =>{
        history.push('/adminMain');
    }

    const goToManageQuiz = () =>{
        history.push('/manageQuiz');
    }

    const goToQuizList = () =>{
      history.push('/quizList');
    }

    const goToManageForum = () =>{
      history.push('/manageForum');
    }


    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>

              <ListItem button key={"Admin home"} onClick={() => goToAdminHome()}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={"Admin Home"} />
              </ListItem>

              <ListItem button key={"Manage Quiz"} onClick={() => goToManageQuiz()}>
                <ListItemIcon><HelpIcon/></ListItemIcon>
                <ListItemText primary={"Manage Quiz"} />
              </ListItem>

              <ListItem button key={"Manage Forum"} onClick={() => goToManageForum()}>
                <ListItemIcon><PeopleIcon/></ListItemIcon>
                <ListItemText primary={"Manage Forum"} />
              </ListItem>
            
              <ListItem button key={"Question List"} onClick={() => goToQuestionList()}>
                <ListItemIcon><ListIcon/></ListItemIcon>
                <ListItemText primary={"Question List"} />
              </ListItem>

              <ListItem button key={"Quiz List"} onClick={() => goToQuizList()}>
                <ListItemIcon><ListIcon/></ListItemIcon>
                <ListItemText primary={"Quiz List"} />
              </ListItem>

              
            
          </List>
        </div>
      );


    const LogOut = async () =>{
        try{
          const response = await axiosInstance.post('/authentication/token/delete/', {withCredentials: true});
          if (response.status == 200) {
            localStorage.setItem('currentUser', null);
            localStorage.setItem("currentUser_email",null);
            history.push('/');
          }
        } catch(error) {
          console.log(error);
        }
      }

    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                {['left'].map((anchor) => (
                            <React.Fragment key={'left'}>  
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                    </React.Fragment>
                ))}
                    <Typography variant="h6" className={classes.title}>
                        3D Admin
                    </Typography>
                    <Button color="inherit" onClick={() => LogOut()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>


    );
}

export default AdminNavbar;