import React from "react";
import { Game } from "pages/Game";
import { Login } from "pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {


  return (
    <Router>
      {/*<Typography variant="h1" >SPELLER TRAINER</Typography>*/}

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;