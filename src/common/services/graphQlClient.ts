import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export class GraphQlClient extends ApolloClient<NormalizedCacheObject> {}

export const graphQlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://fakeql.com/graphql/8e0ce186bd13d85165e50444267c3f02',
  }),
});
