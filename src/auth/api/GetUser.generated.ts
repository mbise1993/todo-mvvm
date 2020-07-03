/* eslint-disable */
import * as Types from '../../graphql.generated';

import { UserFields } from './userFields.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';

export type GetUserVariables = {
  id: Types.Scalars['ID'];
};

export type GetUser = {
  __typename?: 'Query';
  user: Types.Maybe<{ __typename?: 'User' } & UserFields>;
};

export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
  ${UserFields}
`;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUser, GetUserVariables>;
export function refetchGetUser(variables?: GetUserVariables) {
  return { query: GetUserDocument, variables: variables };
}
