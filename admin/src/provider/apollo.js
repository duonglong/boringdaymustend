import React from 'react';
import App from '../App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider, withApollo } from 'react-apollo';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
const AppWithClient = withApollo(App);
function Provider() {
  return (
    <ApolloProvider client={client}>
      <AppWithClient />
    </ApolloProvider>
  );
}
export default Provider;