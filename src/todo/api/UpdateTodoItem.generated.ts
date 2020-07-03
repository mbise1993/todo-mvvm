/* eslint-disable */
import * as Types from '../../graphql.generated';

import { TodoItemFields } from './todoItemFields.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';

export type UpdateTodoItemVariables = {
  id: Types.Scalars['ID'];
  input: Types.UpdateTodoInput;
};

export type UpdateTodoItem = {
  __typename?: 'Mutation';
  updateTodo: { __typename?: 'Todo' } & TodoItemFields;
};

export const UpdateTodoItemDocument = gql`
  mutation UpdateTodoItem($id: ID!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      ...TodoItemFields
    }
  }
  ${TodoItemFields}
`;
export type UpdateTodoItemMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTodoItem,
  UpdateTodoItemVariables
>;
export type UpdateTodoItemMutationResult = ApolloReactCommon.MutationResult<UpdateTodoItem>;
export type UpdateTodoItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTodoItem,
  UpdateTodoItemVariables
>;
