/* eslint-disable */
import * as Types from '../../graphql.generated';

import { TodoItemFields } from './todoItemFields.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';

export type GetTodoItemsVariables = {
  userId: Types.Scalars['Float'];
};

export type GetTodoItems = {
  __typename?: 'Query';
  todos: Types.Maybe<Array<Types.Maybe<{ __typename?: 'Todo' } & TodoItemFields>>>;
};

export const GetTodoItemsDocument = gql`
  query GetTodoItems($userId: Float!) {
    todos(where: { user_id_eq: $userId }) {
      ...TodoItemFields
    }
  }
  ${TodoItemFields}
`;
export type GetTodoItemsQueryResult = ApolloReactCommon.QueryResult<
  GetTodoItems,
  GetTodoItemsVariables
>;
export function refetchGetTodoItems(variables?: GetTodoItemsVariables) {
  return { query: GetTodoItemsDocument, variables: variables };
}
