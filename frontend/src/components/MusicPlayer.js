import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
  Slider,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import { green } from "@material-ui/core/colors";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }

  previousSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/previous-song", requestOptions);
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip-song", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause-song", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play-song", requestOptions);
  }

  shuffleSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/shuffle-song", requestOptions);
  }

  repeatSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/repeat-song", requestOptions);
  }

  render() {
    const songProgress =
      (this.props.song.time / this.props.song.duration) * 100;

    return (
      <Grid container spacing={1}>
        <Grid item align="center" xs={12}>
          <Card>
            <Grid container alignItems="center">
              <Grid item align="center" xs={4}>
                <img
                  src={this.props.song.image_url}
                  height="100%"
                  width="100%"
                />
              </Grid>
              <Grid item align="center" xs={8}>
                <Typography component="h5" variant="h5">
                  {this.props.song.title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  {this.props.song.artist}
                </Typography>
                <div>
                  <IconButton onClick={() => this.shuffleSong()}>
                    {this.props.song.is_shuffled ? (
                      <ShuffleIcon style={{ color: green[500] }} />
                    ) : (
                      <ShuffleIcon />
                    )}
                  </IconButton>
                  <IconButton onClick={() => this.previousSong()}>
                    <SkipPreviousIcon /> {this.props.song.previous_votes} /{" "}
                    {this.props.song.votes_required}
                  </IconButton>
                  {this.props.isHost ? (
                    <IconButton
                      onClick={() => {
                        this.props.song.is_playing
                          ? this.pauseSong()
                          : this.playSong();
                      }}
                    >
                      {this.props.song.is_playing ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowIcon />
                      )}
                    </IconButton>
                  ) : this.props.song.guest_can_pause ? (
                    <IconButton
                      onClick={() => {
                        this.props.song.is_playing
                          ? this.pauseSong()
                          : this.playSong();
                      }}
                    >
                      {this.props.song.is_playing ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowIcon />
                      )}
                    </IconButton>
                  ) : null}
                  <IconButton onClick={() => this.skipSong()}>
                    {this.props.song.votes} / {this.props.song.votes_required}
                    <SkipNextIcon />
                  </IconButton>
                  <IconButton onClick={() => this.repeatSong()}>
                    {this.props.song.is_repeating === "context" ? (
                      <RepeatIcon style={{ color: green[500] }} />
                    ) : this.props.song.is_repeating === "track" ? (
                      <RepeatOneIcon style={{ color: green[500] }} />
                    ) : (
                      <RepeatIcon />
                    )}
                  </IconButton>
                </div>
              </Grid>
              <Slider
                style={{ color: green[500] }}
                // color="primary" // Primary = Blue Secondary = Pink
                variant="determinate"
                value={songProgress}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
