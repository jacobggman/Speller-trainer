import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme'
import { ThemeProvider } from '@material-ui/core';
import { Paper } from '@material-ui/core';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Paper style={{ "height": "100vh" }}>
        <App />
      </Paper>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

