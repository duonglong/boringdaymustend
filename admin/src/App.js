import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" /> */}
        <Route exact path="/login" component={Login}/>
        {/* <Route exact path="/product" /> */}
        {/* <Route exact path="/article" /> */}
        {/* <Route exact path="/user" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
