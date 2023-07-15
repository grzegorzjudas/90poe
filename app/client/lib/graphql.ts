import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export function createApolloClient (githubToken: string) {
    return new ApolloClient({
        link: createHttpLink({
            uri: 'https://api.github.com/graphql',
            headers: {
                Authorization: `Bearer ${githubToken}`
            }
        }),
        cache: new InMemoryCache()
    });
}
