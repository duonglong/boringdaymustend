import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" />
      <Route exact path="/login" />
      <Route exact path="/product" />
      <Route exact path="/article" />
      <Route exact path="/user" />
    </BrowserRouter>
  );
}

export default App;
