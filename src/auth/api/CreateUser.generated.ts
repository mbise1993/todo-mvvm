/* eslint-disable */
import * as Types from '../../graphql.generated';

import { UserFields } from './userFields.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';

export type CreateUserVariables = {
  input: Types.CreateUserInput;
};

export type CreateUser = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User' } & UserFields;
};

export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFields
    }
  }
  ${UserFields}
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUser,
  CreateUserVariables
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUser>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUser,
  CreateUserVariables
>;
