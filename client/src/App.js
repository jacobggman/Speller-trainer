import React from "react";
import { EmailPass } from "./components/EmailPassl";
import { Username } from "./components/Username";
import { Typography } from '@material-ui/core';

const App = () => {
  return (
    <div>
      <Typography>Register</Typography>
      <Username></Username>
      <EmailPass></EmailPass>
    </div>
  );
};

export default App;