/* eslint-disable */
import * as Types from '../../graphql.generated';

import gql from 'graphql-tag';

export type TodoItemFields = { __typename?: 'Todo'; id: string; task: string; done: boolean };

export const TodoItemFields = gql`
  fragment TodoItemFields on Todo {
    id
    task
    done
  }
`;
