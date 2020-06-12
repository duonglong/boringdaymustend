import {
    ApolloClient,
    HttpLink,
    InMemoryCache
} from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { Observable, } from 'apollo-link';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL
});

const getNewToken = () => {
    return client.mutate({
        variables: { 'refreshToken': localStorage.getItem('refreshToken') },
        mutation: gql`
            mutation refreshToken(
                $refreshToken: String!
            ){
                refreshToken(refreshToken:$refreshToken){
                    accessToken
                } 
            }
        `
    });
}

const refreshTokenPromise = (operation, forward) => {
    return new Observable(observer => {
        getNewToken()
            .then(refreshResponse => {
                const headers = operation.getContext().headers;
                localStorage.setItem("accessToken", refreshResponse.data.refreshToken.accessToken)
                operation.setContext({
                    headers: {
                        ...headers,
                        authorization: `Bearer ${refreshResponse.data.refreshToken.accessToken}`,
                    },
                });
            })
            .then(() => {
                const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer)
                };
                // Retry last failed request
                forward(operation).subscribe(subscriber);
            })
            .catch(error => {
                // No refresh or client token available, we force user to login
                observer.error(error);
            });
    });
}

const withToken = setContext(async (_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null
        }
    };
});

const resetToken = onError(({ response, graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED':
                    return refreshTokenPromise(operation, forward);
                default:
                    break;
            }
        }
    }
    if (networkError && networkError.statusCode === 401) {
        console.log(`[Network error]: ${networkError}`);
        // localStorage.removeItem('accessToken');
        return refreshTokenPromise(operation, forward);
    }
});

const authFlowLink = withToken.concat(resetToken);

const link = authFlowLink.concat(httpLink);

const cache = new InMemoryCache();

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
    link,
    cache
});

export default client;
