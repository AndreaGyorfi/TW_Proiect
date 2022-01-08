import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () =>{

    return(
        <React.Fragment>
            <Grid
        container
        justify="center"
        alignItems="center"
        
      >
        <Box  sx={{
            height: 120, width: '100%',alignItems:"center", backgroundColor: '#272124'}}
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
  
           
          
              <Stack direction="row" spacing={2}>
                <FacebookIcon color="primary"/>
                <TwitterIcon color="primary"/>
                <InstagramIcon color="primary"/>
                <LinkedInIcon color="primary"/>
              </Stack>
            
          
  
            </Box>

            </Grid>
        </React.Fragment>
    )

}

export default Footer;