import React,{ useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import history from "./history";
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

//3d cube
import Cube_3d from "./Cube_3d";
//images
import image from '../assets/main_pic_first.png';
import card1_image from '../assets/card1_image.png';
import card2_image from '../assets/card2_image.png';
import card3_image from '../assets/card3_image.png';



//Navbar
import NavBar from './NavBar';
//Footer 
import Footer from './Footer';

const useStyles = makeStyles({
  
    appbar_text:{
      color:'black',
    },

    paper:{
      width: '100%',
    }

});





const MainMenu = () =>{

  const classes = useStyles();

  const goToAbout = () =>{
    history.push("/about");
  }
    

    return(
        <React.Fragment>
          <Paper className={classes.paper}>
           <NavBar/>


    

        

      
      <div style={{ paddingTop: 40 }}>
      <Box  sx={{
          height: 410, width: '100%', backgroundColor: '#94adcf', }} >
            
            <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        
      >

        <Grid item xs>
          <Card style={{background: 'transparent', boxShadow: 'none' }}>
            <CardMedia
              component="img"
              src={image}
            />
          </Card>

          
        </Grid>

      </Grid>


      </Box>

      </div>


     

      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop: 35 }}
        >

          <Grid item xs>

          <Cube_3d/>

          </Grid>
        
          <Grid item xs style={{ paddingLeft: 50 }}  >

            <Card sx={{ width: 350 }} elevation={5} >
              <CardContent>

                <Typography variant="body2">
                  Printarea 3D este foarte populară în zilele noastre și 
                  asta pentru că acoperă o serie de procese destinate 
                  producerii de piese sau ansambluri din diferite 
                  tipuri de materiale. Practic, printarea 3D transformă
                  un design tridimensional într-un obiect fizic.
                  Toate tehnologiile folosite pentru a printa 3D au în comun 
                  felul în care sunt produse aceste piese - mai exact 
                  prin suprapunerea de straturi de material care duc 
                  spre forma finală a obiectului printat.
                </Typography>

              </CardContent>
              <CardActions>
                
                <Button color="primary" variant="contained" onClick={goToAbout} >Learn more</Button>
              </CardActions>
            </Card>

          </Grid>

      </Grid> 


      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ padding: 30, paddingTop:60 }}
        spacing={2}
        >

          <Grid item xs>

            <Card sx={{ maxWidth: 345 }} elevation={5}>
            <CardMedia
              component="img"
              src={card1_image}
              height="319"
              //width="319"
        
            />
            <CardContent>
              <Typography variant="h5">
              Imprimantă 3D
              </Typography>
            </CardContent>

            <CardActions>
              <Button color="primary" variant="contained" onClick={goToAbout}>Learn more</Button>
            </CardActions>
            </Card>

          </Grid>


          <Grid item xs>

            <Card sx={{ maxWidth: 345 }} elevation={5}>
            <CardMedia
              component="img"
              src={card2_image}
              height="319"
              //width="319"

            />
            <CardContent>
              <Typography variant="h5">
              Scanare 3D
              </Typography>
            </CardContent>

            <CardActions>
              <Button color="primary" variant="contained" onClick={goToAbout}>Learn more</Button>
            </CardActions>
            </Card>

            </Grid>


            <Grid item xs>

            <Card sx={{ maxWidth: 345 }} elevation={5}>
            <CardMedia
              component="img"
              src={card3_image}
              height="319"
              //width="319"

            />
            <CardContent>
              <Typography variant="h5">
              Sistem 3D polarizat
              </Typography>
            </CardContent>

            <CardActions>
              <Button color="primary" variant="contained" onClick={goToAbout}>Learn more</Button>
            </CardActions>
            </Card>

            </Grid>



        </Grid>

        <div  style={{ paddingTop: 50 }}>
          <Footer/>
          </div>
          </Paper>
        </React.Fragment>
    );    


}


export default MainMenu;