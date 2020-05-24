/* eslint-disable */
import * as Types from '../../graphql.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';

export type DeleteTodoItemVariables = {
  id: Types.Scalars['ID'];
};

export type DeleteTodoItem = { __typename?: 'Mutation'; deleteTodo: string };

export const DeleteTodoItemDocument = gql`
  mutation DeleteTodoItem($id: ID!) {
    deleteTodo(id: $id)
  }
`;
export type DeleteTodoItemMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTodoItem,
  DeleteTodoItemVariables
>;
export type DeleteTodoItemMutationResult = ApolloReactCommon.MutationResult<DeleteTodoItem>;
export type DeleteTodoItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTodoItem,
  DeleteTodoItemVariables
>;
