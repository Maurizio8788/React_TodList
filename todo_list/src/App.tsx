import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header/Header';
import TodoList from './Components/TodoList/TodoList';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'





function App() {

  return (
    <Fragment>
        <CssBaseline />
        <Header />
        <TodoList />
    </Fragment>
  );
}

export default App;
