import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function () {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ flexGrow: 1, marginBottom: "2em" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Problock
            </Typography>
            <Button color="inherit">Board Config</Button>
            <Button color="inherit">Tile Config</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Modal
        open={false}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          elevation={3}
          square
          style={{ margin: "10em auto", padding: "1em 0", width: "66.7%" }}
        >
          <Container>
            <form noValidate autoComplete="off">
              <Typography gutterbottom variant="h2">
                Board Configuration
              </Typography>
              <Typography gutterbottom variant="h3">
                Properties
              </Typography>
              <Typography gutterbottom variant="h3">
                Events
              </Typography>
              <Typography variant="body1">
                Some quick board properties
              </Typography>
              <Button variant="contained">Save</Button>
            </form>
          </Container>
        </Paper>
      </Modal>
      <Modal
        open
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          elevation={3}
          square
          style={{ margin: "10em auto", padding: "1em 0", width: "66.7%" }}
        >
          <Container>
            <form noValidate autoComplete="off">
              <Typography gutterbottom variant="h2">
                Tile Configuration
              </Typography>
              <Typography gutterbottom variant="h3">
                Properties
              </Typography>
              <TextField
                id="standard-basic"
                label="@row"
                defaultValue={0}
                style={{ marginRight: "1em" }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                id="standard-basic"
                label="@column"
                defaultValue={1}
                InputProps={{ readOnly: true }}
              />
              <Typography gutterbottom variant="h3">
                Events
              </Typography>
              <Typography variant="body1">
                Some quick board properties
              </Typography>
              <Button variant="contained">Save</Button>
            </form>
          </Container>
        </Paper>
      </Modal>
      <Container fixed>
        <Typography gutterbottom variant="h1">
          Problock
        </Typography>
        {/**
        import Grid from "@material-ui/core/Grid";
        <Grid container spacing={1} justify="flex-end">
          <Grid item xs={3} spacing={0}>
            <Card square style={{ height: "100%" }} variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} spacing={0}>
            <Card square style={{ height: "100%" }} variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} spacing={0}>
            <Card square style={{ height: "100%" }} variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
         */}
        <GridList cellHeight={160} spacing={5} cols={3}>
          {[...Array(3).keys()].map((row) =>
            [...Array(3).keys()].map((col) => (
              <GridListTile key={(row + 1) * col} cols={1}>
                <Card square style={{ height: "100%" }} variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    style={{ position: "absolute", bottom: "0", width: "100%" }}
                  >
                    <IconButton aria-label="add to favorites">
                      <SettingsIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </GridListTile>
            ))
          )}
        </GridList>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "absolute", bottom: "2em", right: "2em" }}
      >
        <SettingsIcon />
      </Fab>
    </React.Fragment>
  );
}
