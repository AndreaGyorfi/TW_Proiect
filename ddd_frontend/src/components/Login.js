import React, { useState , useEffect} from "react";
import axiosInstance from "./axiosApi";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import history from "./history";

const useStyles = makeStyles({
  paper: {
    //marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    //margin: theme.spacing(1),
    //backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
  },
  submit: {
   // margin: theme.spacing(3, 0, 2),
  },
});

export default function Login() {
  const classes = useStyles();
  const [Userdata, setUserdata] = useState({ username: "", password: "" });
  const [error, setError] = useState();

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...Userdata, [name]: value });
  };
  
  /*
  useEffect(() => {
   let isAuth = localStorage.getItem("currentUser");
      console.log("ITT");
   if((isAuth & isAuth !== 'undefined') || (isAuth !== 'null')){
      history.push('/')
       console.log("IN IF");
   }else{
       history.push('/login');
   }
}, [])
*/
    
 

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/authentication/token/obtain/",
        { username: Userdata.username, password: Userdata.password }
      );

      if (response.status === 200) {
        let base64User = response.data.access.split(".")[1];
        base64User = JSON.parse(window.atob(base64User));
        localStorage.setItem("currentUser_email", base64User.email);
        localStorage.setItem("currentUser", base64User.user);
        history.push("/"); // Push home
      }
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  
  return (
    <Container component="main" maxWidth="xs" style={{padding:50}}>
      <CssBaseline />
       
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={Userdata.username}
            onChange={handleInputChanges}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={Userdata.password}
            onChange={handleInputChanges}
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          {error && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
          
        </form>
      </div>
    </Container>
  );
}
