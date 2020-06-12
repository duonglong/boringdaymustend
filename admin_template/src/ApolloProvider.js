import React from 'react';
import App from './App';
import { ApolloProvider, withApollo} from 'react-apollo';
import Apolloclient from './ApolloClient';

const AppWithClient = withApollo(App);
function Provider() {
    return  (
        <ApolloProvider client={Apolloclient}>
          <AppWithClient />
        </ApolloProvider>
      );
}
export default Provider;