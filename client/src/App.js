import React, { useState } from "react";
import Game from "pages/Game";
import { Login } from "pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

  const [username, setUserName] = useState("UserName");

  return (
    <Router>
      {/*<Typography variant="h1" >SPELLER TRAINER</Typography>*/}

      <Switch>
        <Route exact path="/">
          <Login setUserName={setUserName} />
        </Route>
        <Route path="/login">
          <Login setUserName={setUserName} />
        </Route>
        <Route path="/game">
          <Game name="Test" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;