import React,{ useRef, useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import history from "./history";
import Link from '@mui/material/Link';
import axiosInstance from "./axiosApi";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles({
  
    appbar_text:{
      color:'black',
    },

   

});



const NavBar = () =>{

    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToAbout = () =>{
        history.push("/about");
    }

    const goToQuiz = () =>{
        history.push("/quizzes");
    }

    const goToLogin = () =>{
        history.push("/login");
    }

    const goToProfile = () =>{
        console.log("go to profile");
    }

    const goToForum = () =>{
        history.push("/forum");
    }

    useEffect(()=>{

        
        setCurrentUser(localStorage.getItem('currentUser'));
        console.log(localStorage.getItem('currentUser'));
    },[currentUser])


    const  LogOut = async () =>{
        try{
          const response = await axiosInstance.post('/authentication/token/delete/', {withCredentials: true});
          if (response.status == 200) {
            localStorage.setItem('currentUser', null);
            localStorage.setItem('currentUserGroups', null);
            localStorage.setItem('currentUserEntity', null);
            history.push('/login');
          }
        } catch(error) {
          console.log(error);
        }
      }

    return(

        <React.Fragment>
            
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{background: 'transparent', boxShadow: 'none' }}>
                    <Toolbar>

                       
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold' }} className={classes.appbar_text}>
                            <Link href="/" underline="none" color="black">
                            Tehnologii 3D
                            </Link>
                        </Typography>
                        
                        
                        <Stack direction="row" spacing={2}>
                        <Button color="primary" variant="contained" onClick={goToAbout}>About</Button>
                        { ((currentUser !== 'null') && (currentUser !== null)) && (
                            <>
                            <Button color="primary" variant="contained" onClick={goToQuiz}>Quiz</Button>
                            <Button color="primary" variant="contained" onClick={goToForum}>Forum</Button>
                            </>
                            )
                        }
                        { ((currentUser === 'null') || (currentUser === null)) ? (
                            <Button color="primary" variant="contained" onClick={() => goToLogin()}> Login</Button>
                            ):(
                                <>
                                    <Avatar onClick={handleClick}>
                                        <PersonIcon color="primary"/>
                                    </Avatar>
                                    <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                  >
                                    <MenuItem onClick={goToProfile}>My Profile</MenuItem>
                                    <MenuItem onClick={LogOut}>Logout</MenuItem>
                                  </Menu>
                                </>
                            )
                        }
                        </Stack>
                    </Toolbar>
                    </AppBar>
                </Box>
        </React.Fragment>
    );

}

export default NavBar;