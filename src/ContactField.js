import React from "react";

import { Grid, IconButton, Box, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { Facebook, Phone, Email, LinkedIn, GitHub, Language, Home, Work, Cake } from "@material-ui/icons";

const icons = {
  phone: <Phone />, 
  email: <Email />,
  linkedIn: <LinkedIn />, 
  facebook: <Facebook />, 
  github: <GitHub />, 
  website: <Language />, 
  homeAddress: <Home />, 
  workAddress: <Work />, 
  birthday: <Cake />
}


const useStyles = makeStyles((theme) => ({
    icon_button: {
      backgroundColor: "#314CDD", 
      color: '#FFFFFF'
    }, 
  }));


export default function ContactField({details}) {
    const classes = useStyles();
    return (
        details.show && 
        <>
            <Grid item xs={2}>
                <IconButton size="medium" className={classes.icon_button} href={`${details.href}`}>
                    {icons[details.id]}
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <Box fontSize="h5.fontSize" align="left" m={2}>
                    <Link color="inherit" href={`${details.href}`}>{details.value}</Link>
                </Box>
            </Grid>
        </>
        
    )
}
