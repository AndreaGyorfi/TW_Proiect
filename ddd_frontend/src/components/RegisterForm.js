import React from 'react';
import register_image from './../assets/register.svg';
import Grid from '@mui/material/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import history from './history';
import axiosInstance from "./axiosApi";


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


const RegisterForm = () =>{
    const classes = formstyle();
    const [userData, setUserData] = React.useState({
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        password:"",
    });


    const handleTextInputChanges = (event) =>{
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    }

    const register = async (event) => {
        //event.preventDefault();
    
        try {
          const response = await axiosInstance.post(
            "/authentication/user/create/", userData
          );
            
          console.log("THIS IS THE RESPONSE",response);
          if (response.status === 201) {
            //let base64User = response.data.access.split(".")[1];
            //base64User = JSON.parse(window.atob(base64User));
            //console.log("user data",base64User);
            //localStorage.setItem("currentUser_email", base64User.email);
            //localStorage.setItem("currentUser", base64User.user);
            history.push("/login"); // Push home
          }
        } catch (error) {
          console.log(error.response.data.detail);
        }
      };

    return(
        <React.Fragment>

            <Grid 
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{paddingTop:50}}
            >
               
               <Grid 
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{paddingTop:30}}
                >

                    <Grid item >
                        <img src={register_image} />
                    </Grid>

                    <Grid item >

                    <Paper elevation={6} className={classes.paper}>

                            <Grid
                                container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"
                                spacing={2}
                                //style={{padding:10}}
                            >

                                    <Grid item >
                                        <Typography variant="h4">
                                            Welcome!
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            className={classes.textField}
                                            name="first_name"
                                            value={userData.first_name}
                                            onChange={handleTextInputChanges}
                                            label="First Name"
                                            type="text"
                                            placeholder="First Name"
                                            variant="outlined"
                                            //fullWidth
                                            required
                                        />
                                    </Grid>


                                    <Grid item>
                                        <TextField
                                            className={classes.textField}
                                            name="last_name"
                                            value={userData.last_name}
                                            onChange={handleTextInputChanges}
                                            label="Last Name"
                                            type="text"
                                            placeholder="Last Name"
                                            variant="outlined"
                                            //fullWidth
                                            required
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            className={classes.textField}
                                            name="username"
                                            value={userData.username}
                                            onChange={handleTextInputChanges}
                                            label="Username"
                                            type="text"
                                            placeholder="Username"
                                            variant="outlined"
                                            //fullWidth
                                            required
                                        />
                                    </Grid>


                                    <Grid item>
                                        <TextField
                                            className={classes.textField}
                                            name="email"
                                            value={userData.email}
                                            onChange={handleTextInputChanges}
                                            label="E-mail"
                                            type="text"
                                            placeholder="E-mail"
                                            variant="outlined"
                                            //fullWidth
                                            required
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            className={classes.textField}
                                            name="password"
                                            value={userData.password}
                                            onChange={handleTextInputChanges}
                                            label="Password"
                                            type="password"
                                            placeholder="Password"
                                            variant="outlined"
                                            //fullWidth
                                            required
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={() => register()}>
                                            Register
                                        </Button>
                                    </Grid>

                                    <Grid item>

                                    </Grid>

                            </Grid>
                    </Paper>


                    </Grid>

                </Grid>

            </Grid>

        </React.Fragment>
    );

}

export default RegisterForm;