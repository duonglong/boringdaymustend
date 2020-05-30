import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloProvider from './provider/apollo';
dotenv.config();

ReactDOM.render(
  <ApolloProvider />,
  document.getElementById('root')
);
