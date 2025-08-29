"use client";

import { useContext, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const ApolloClientProvider = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: 'http://localhost:8000/graphql',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: 'ws://localhost:8000/graphql',
        connectionParams: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }, [accessToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
