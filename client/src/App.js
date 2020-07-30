import React from "react";
import { Game } from "pages/Game";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;