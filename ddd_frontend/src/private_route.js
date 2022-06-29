import React, { useState, useEffect}  from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import useLoggedIn from "./user.component";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));




function isLogin(user = null) {
  //if(user){
  //  return false;
  //}
  if (localStorage.getItem("currentUser") === "null") {
    return false;
  }
  return true;
}


const PrivateRoute = ({ component: Component, ...rest }) => {
  let location = useLocation();
  const [toCheck, settoCheck] = useState(0);
  const {status, data} = useLoggedIn('/authentication/user/current/');
  let user = null;

  useEffect(()=>{
    console.log("Sefule", status, data);
  },[data])
  
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
         
            <Component {...props} toCheck={toCheck} />
         
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;