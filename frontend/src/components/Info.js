import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton, Card } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  ISSUES: "pages.issues",
  ROOMS: "pages.rooms",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.ROOMS);

  function roomsInfo() {
    return (
      <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
      <Card>
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            Join Page
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h5" variant="h5">
            Joining a room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" variant="p">
            To join a room, go to the Join page, and enter the code that the
            room host gave to you.<br/><br/>Now, you'll see the Music Player.
            <br/>If the host <strong>doesn't have Spotify Premium</strong>, you'll only be able to see all of the information about the song, but you won't be able to play, pause, skip or previous the song.
          </Typography>
        </Grid>
        <Typography component="h5" variant="h5">
            Creating a room
          </Typography>
          <Typography component="p" variant="p">
            To create a room, go to the Create page, and modify the settings to what for what control you would like your guests to have If you want one person to be able to skip the current song or go back to the previous song. Press Create.<br/><br/>Now, you'll see the Music Player.
            <br/>If you <strong>doesn't have Spotify Premium</strong>, you(and your guests) will only be able to see all of the information about the song, but you won't be able to play, pause, skip go to the previous song, shuffle or repeat songs.<br/><br/>
          </Typography>
        </Card>
        </Grid>
      </Grid>
    );
  }

  function issuesInfo() {
    return (<Grid container spacing={1}>
      <Grid item xs={12} align='center'>
      <Card>
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            Troubleshooting
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h5" variant="h5">
            Song not loading
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" variant="p">
            If the song isn't loading, refresh the page. If it still isn't working, ask the host to refresh their page. This will refresh the connection to Spotify. If it still isn't working, ask the host to delete that room and create a new one.
          </Typography>
        </Grid>
        <Typography component="h5" variant="h5">
            Controls not working
          </Typography>
          <Typography component="p" variant="p">
            If the music player controls aren't working, make sure that the host has Spotify Premium, or the controls won't work. This is because Spotify's Web API requires a Premium account in order to work. If it still isn't working, check that the room still exists by trying to rejoin it.
            <br/><br/>
          </Typography>
        </Card>
        </Grid>
      </Grid>);
  }


        //   <Typography component="h5" variant="h5">
        //   Troubleshooting
        //   </Typography>
        //   <Typography component="p" variant="p">
        //   If the timeline isn't accurate, or the song isn't updating, you should refresh the page. If it still isn't working, tell the host to refresh their page as that should refresh their connection with Spotify.<br/><br/>
        //   </Typography>


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h3" variant="h3">
          Spotter - Information
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.ROOMS ? roomsInfo() : issuesInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.ISSUES ? setPage(pages.ROOMS) : setPage(pages.ISSUES);
          }}
        >
          {page === pages.ISSUES ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
