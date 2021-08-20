import React, { useState, useEffect } from "react";

import { contact, firebaseConfig } from "./config";

import { Grid, IconButton, Button, Typography, Box, CssBaseline, responsiveFontSizes, TextField } from "@material-ui/core";
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { blue, yellow } from '@material-ui/core/colors';

// Icons used
import ContactsIcon from '@material-ui/icons/Contacts';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonIcon from '@material-ui/icons/Person';
import CommentIcon from '@material-ui/icons/Comment';

// For full page on mobile devices
import Div100vh from 'react-div-100vh'

// Import firebase
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/analytics'
import ContactField from "./ContactField";

let theme = createTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: yellow,
    background: {
      default: "#181818"
    }
  },
});
theme = responsiveFontSizes(theme)

const useStyles = makeStyles((theme) => ({
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: "40px",
  },
  fullPage: {
    minWidth: '100vw',
    alignSelf: 'center',
    resizeMode: 'contain',
    scrollSnapAlign: "start",
    scrollSnapStop: "normal"
  },
  bg: {
    backgroundImage: "url(" + contact.fullpage_picture + ")",
    minWidth: '100vw',
    backgroundSize: 'cover', 
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    scrollSnapAlign: "center",
    scrollSnapStop: "normal",
    position: "relative",
  },
  icon_button: {
    backgroundColor: "#314CDD", 
    color: '#FFFFFF'
  }, 
  viewer: {
    width: "100vw",
    height: "100vh",
    overflowY: "scroll",
    scrollSnapType: "y mandatory",
    maxWidth: "100%",
    overflowX: "hidden"
  }, 
  bottom: {
    bottom: "0",
    position: "absolute",
    margin: "auto",
    width: "100%"
  }
}));

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function ContactCard() {
  const classes = useStyles();
  const [newContactName, setNewContactName] = useState()
  const [newContacPhone, setNewContactPhone] = useState()
  const [newContactEmail, setNewContactEmail] = useState()
  const [newContactNote, setNewContactNote] = useState()
  const [submitted, setSubmitted] = useState(false)

  function writeNewContact() {
    setSubmitted(true)
    var postData = {
      name: newContactName || "",
      phone: newContacPhone || "",
      email: newContactEmail || "", 
      note: newContactNote || "", 
      time: (new Date()).toUTCString()
    };
  
    var newPostKey = firebase.database().ref().child('contacts').push().key;

    localStorage.setItem('contactUuid', newPostKey);

    // Write the new post's data to firebase
    var updates = {};
    updates['/contacts/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
  }

  return (
    <div className={classes.viewer}>
      <ThemeProvider theme={theme} className={classes.container} >
      <CssBaseline/>
      <Div100vh className={classes.bg}>
        <Box p={1} align="center" m={0}>
          <Box>
            <Typography variant="h1" fontWeight="bold">
              <b>{contact.first_name} {contact.last_name}</b>
            </Typography>
          </Box>
          <Box p={2} className={classes.bottom} fontWeight="fontWeightBold">
            <Box m={-1}>
              <KeyboardArrowUpIcon fontSize="large"/>
            </Box>
            <Box>
              Contact Below
            </Box>
          </Box>
        </Box>
      </Div100vh>
      
      <Div100vh className={classes.fullPage}>
        <Box align="center" p={2} m={1}>
          <Box maxWidth="500px">
            <Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={4} sm={5}>
                  <img className={classes.img} alt={`${contact.first_name} ${contact.last_name} profile for contact`} src={contact.profile_picture} />
                </Grid>
                <Grid item xs={12}>
                  <Box align="center">
                    <Box fontWeight="fontWeightBold" fontSize="h3.fontSize">
                      {contact.first_name} {contact.last_name}
                    </Box>
                    <Box m={-1} fontSize="h5.fontSize">
                      {contact.position} 
                    </Box>
                    <Box fontStyle="italic" m={0} fontSize="h5.fontSize">
                      {contact.company} 
                    </Box>
                  </Box>
                </Grid>

                {contact.contactFields.map(field => <ContactField details={field}/>)}
              </Grid>


              {/* Download contact to phone & send your contact */}
              <Box m={2}>
                <Button href={contact.contact_download} size="large" fullWidth variant="contained" color="secondary">
                  <ContactsIcon />
                  &nbsp;&nbsp;&nbsp;
                  <b>Add Contact</b>
                </Button>
              </Box>
            </Typography>
          </Box>
        </Box>
        </Div100vh>

      <Div100vh>
        {!submitted ?
        <>
          {/* Send your contact */}
          <Box align="center" className={classes.fullPage} p={2} m={1}>
            <Box maxWidth="500px">
              <Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Box align="center">
                      <Box fontWeight="fontWeightBold" fontSize="h3.fontSize">
                        Send your contact
                      </Box>
                    </Box>
                  </Grid>

                  {/* Name contact */}
                  <Grid item xs={2}>
                    <IconButton size="medium" className={classes.icon_button} href={`tel:${contact.phone_number}`}>
                      <PersonIcon/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Box align="left" m={2}>
                      <Box fontSize="h5.fontSize">
                        <TextField name="name" onChange={e => setNewContactName(e.target.value)} fullWidth />
                      </Box>
                    </Box>
                  </Grid>

                  {/* Phone number contact */}
                  <Grid item xs={2}>
                    <IconButton size="medium" className={classes.icon_button} href={`tel:${contact.phone_number}`}>
                      <PhoneIcon/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Box align="left" m={2}>
                      <Box fontSize="h5.fontSize">
                        <TextField name="phone" onChange={e => setNewContactPhone(e.target.value)} fullWidth />
                      </Box>
                    </Box>
                  </Grid>

                  {/* Email contact */}
                  <Grid item xs={2}>
                    <IconButton size="medium" className={classes.icon_button} href={`mailto:${contact.email}`}>
                      <EmailIcon/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Box align="left" m={2}>
                      <Box fontSize="h5.fontSize">
                        <TextField name="email" onChange={e => setNewContactEmail(e.target.value)} fullWidth />
                      </Box>
                    </Box>
                  </Grid>

                  {/* Notes contact */}
                  <Grid item xs={2}>
                    <IconButton size="medium" className={classes.icon_button} href={`https://github.com/${contact.linkedIn}`}>
                      <CommentIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Box align="left" m={2}>
                      <Box fontSize="h5.fontSize">
                        <TextField onChange={e => setNewContactNote(e.target.value)} multiline fullWidth />
                      </Box>
                    </Box>
                  </Grid>

                </Grid>

                {/* Download contact to phone & send your contact */}
                <Box m={2}>
                  <Button size="large" fullWidth variant="contained" onClick={() => writeNewContact()} color="primary">
                    <SendIcon />
                    &nbsp;&nbsp;&nbsp;
                    <b>Send Contact</b>
                  </Button>
                </Box>
              </Typography>
            </Box>
          </Box>
        </>
        :
        <>
          <Box align="center" className={classes.fullPage} p={2} m={1}>
            <Box maxWidth="500px">
              <Typography>
                Contact Sent!
              </Typography>
            </Box>
          </Box>
        </>
        }
      </Div100vh>
    </ThemeProvider>
    </div>
  );
}

export default ContactCard;
