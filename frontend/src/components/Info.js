import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  CREATE: "pages.create",
  JOIN: "pages.join",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return (
      <Grid container spacing={1}>
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
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function createInfo() {
    return "Create page";
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h3" variant="h3">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
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
