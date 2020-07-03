/* eslint-disable */
import * as Types from '../../graphql.generated';

import { TodoItemFields } from './todoItemFields.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';

export type CreateTodoItemVariables = {
  input: Types.CreateTodoInput;
};

export type CreateTodoItem = {
  __typename?: 'Mutation';
  createTodo: { __typename?: 'Todo' } & TodoItemFields;
};

export const CreateTodoItemDocument = gql`
  mutation CreateTodoItem($input: CreateTodoInput!) {
    createTodo(input: $input) {
      ...TodoItemFields
    }
  }
  ${TodoItemFields}
`;
export type CreateTodoItemMutationFn = ApolloReactCommon.MutationFunction<
  CreateTodoItem,
  CreateTodoItemVariables
>;
export type CreateTodoItemMutationResult = ApolloReactCommon.MutationResult<CreateTodoItem>;
export type CreateTodoItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTodoItem,
  CreateTodoItemVariables
>;
