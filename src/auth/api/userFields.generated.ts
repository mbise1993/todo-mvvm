/* eslint-disable */
import * as Types from '../../graphql.generated';

import gql from 'graphql-tag';

export type UserFields = { __typename?: 'User'; id: string; firstname: string };

export const UserFields = gql`
  fragment UserFields on User {
    id
    firstname
  }
`;
