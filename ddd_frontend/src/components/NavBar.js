import React,{ useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import history from "./history";
import Link from '@mui/material/Link';

const useStyles = makeStyles({
  
    appbar_text:{
      color:'black',
    },

   

});

const NavBar = () =>{

    const classes = useStyles();

    const goToAbout = () =>{
        history.push("/about");
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
                        <Button color="primary" variant="contained">Quiz</Button>
                        <Button color="primary" variant="contained"> Login</Button>
                        </Stack>
                    </Toolbar>
                    </AppBar>
                </Box>
        </React.Fragment>
    );

}

export default NavBar;