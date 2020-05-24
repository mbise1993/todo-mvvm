/* eslint-disable */
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _Any: any;
  /** The `DateTime` scalar represents a date and time following the ISO 8601 standard */
  DateTime: any;
  _FieldSet: any;
};

export type Query = {
  __typename?: 'Query';
  users: Maybe<Array<Maybe<User>>>;
  user: Maybe<User>;
  todos: Maybe<Array<Maybe<Todo>>>;
  todo: Maybe<Todo>;
  _typeDefs: Scalars['String'];
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  _aggregation: Scalars['Float'];
};

export type QueryUsersArgs = {
  page: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  sort: Maybe<Scalars['String']>;
  dir: Maybe<Scalars['String']>;
  where: Maybe<UsersWhere>;
  ref: Maybe<Scalars['String']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryTodosArgs = {
  page: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  sort: Maybe<Scalars['String']>;
  dir: Maybe<Scalars['String']>;
  where: Maybe<TodosWhere>;
  ref: Maybe<Scalars['String']>;
};

export type QueryTodoArgs = {
  id: Scalars['ID'];
};

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};

export type Query_AggregationArgs = {
  type: Maybe<Scalars['String']>;
  field: Maybe<Scalars['String']>;
  stat: Scalars['String'];
  ref: Maybe<Scalars['String']>;
};

export type UsersWhere = {
  and: Maybe<Array<UsersWhere>>;
  or: Maybe<Array<UsersWhere>>;
  not: Maybe<Array<UsersWhere>>;
  id_gt: Maybe<Scalars['Float']>;
  id_ge: Maybe<Scalars['Float']>;
  id_lt: Maybe<Scalars['Float']>;
  id_le: Maybe<Scalars['Float']>;
  id_eq: Maybe<Scalars['Float']>;
  id_neq: Maybe<Scalars['Float']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_nin: Maybe<Array<Scalars['ID']>>;
  firstname_contains: Maybe<Scalars['String']>;
  firstname_startswith: Maybe<Scalars['String']>;
  firstname_endswith: Maybe<Scalars['String']>;
  firstname_eq: Maybe<Scalars['String']>;
  firstname_neq: Maybe<Scalars['String']>;
  firstname_in: Maybe<Array<Scalars['String']>>;
  firstname_nin: Maybe<Array<Scalars['String']>>;
  firstname_exists: Maybe<Scalars['Boolean']>;
  search: Maybe<Scalars['String']>;
  like: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  _nest: User;
  _int: Scalars['Int'];
  _float: Scalars['Float'];
  _boolean: Scalars['Boolean'];
  _string: Scalars['String'];
  todos: Maybe<Array<Maybe<Todo>>>;
  firstname: Scalars['String'];
};

export type User_IntArgs = {
  min: Maybe<Scalars['Int']>;
  max: Maybe<Scalars['Int']>;
};

export type User_FloatArgs = {
  min: Maybe<Scalars['Float']>;
  max: Maybe<Scalars['Float']>;
  fixed: Maybe<Scalars['Int']>;
};

export type User_StringArgs = {
  type: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
  template: Maybe<Scalars['String']>;
  length: Maybe<Scalars['Int']>;
  syllables: Maybe<Scalars['Int']>;
  casing: Maybe<Scalars['String']>;
  min: Maybe<Scalars['Int']>;
  max: Maybe<Scalars['Int']>;
  pool: Maybe<Scalars['String']>;
  sentences: Maybe<Scalars['Int']>;
  words: Maybe<Scalars['Int']>;
  nationality: Maybe<Scalars['String']>;
  full: Maybe<Scalars['Boolean']>;
};

export type UserTodosArgs = {
  page: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  sort: Maybe<Scalars['String']>;
  dir: Maybe<Scalars['String']>;
  where: Maybe<TodosWhere>;
  ref: Maybe<Scalars['String']>;
};

export type UserFirstnameArgs = {
  length: Maybe<Scalars['Int']>;
};

export type TodosWhere = {
  and: Maybe<Array<TodosWhere>>;
  or: Maybe<Array<TodosWhere>>;
  not: Maybe<Array<TodosWhere>>;
  id_gt: Maybe<Scalars['Float']>;
  id_ge: Maybe<Scalars['Float']>;
  id_lt: Maybe<Scalars['Float']>;
  id_le: Maybe<Scalars['Float']>;
  id_eq: Maybe<Scalars['Float']>;
  id_neq: Maybe<Scalars['Float']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_nin: Maybe<Array<Scalars['ID']>>;
  user_id_exists: Maybe<Scalars['Boolean']>;
  task_contains: Maybe<Scalars['String']>;
  task_startswith: Maybe<Scalars['String']>;
  task_endswith: Maybe<Scalars['String']>;
  task_eq: Maybe<Scalars['String']>;
  task_neq: Maybe<Scalars['String']>;
  task_in: Maybe<Array<Scalars['String']>>;
  task_nin: Maybe<Array<Scalars['String']>>;
  task_exists: Maybe<Scalars['Boolean']>;
  done_eq: Maybe<Scalars['Boolean']>;
  done_exists: Maybe<Scalars['Boolean']>;
  search: Maybe<Scalars['String']>;
  like: Maybe<Scalars['String']>;
  user_and: Maybe<Array<UsersWhere>>;
  user_or: Maybe<Array<UsersWhere>>;
  user_not: Maybe<Array<UsersWhere>>;
  user_id_gt: Maybe<Scalars['Float']>;
  user_id_ge: Maybe<Scalars['Float']>;
  user_id_lt: Maybe<Scalars['Float']>;
  user_id_le: Maybe<Scalars['Float']>;
  user_id_eq: Maybe<Scalars['Float']>;
  user_id_neq: Maybe<Scalars['Float']>;
  user_id_in: Maybe<Array<Scalars['ID']>>;
  user_id_nin: Maybe<Array<Scalars['ID']>>;
  user_firstname_contains: Maybe<Scalars['String']>;
  user_firstname_startswith: Maybe<Scalars['String']>;
  user_firstname_endswith: Maybe<Scalars['String']>;
  user_firstname_eq: Maybe<Scalars['String']>;
  user_firstname_neq: Maybe<Scalars['String']>;
  user_firstname_in: Maybe<Array<Scalars['String']>>;
  user_firstname_nin: Maybe<Array<Scalars['String']>>;
  user_firstname_exists: Maybe<Scalars['Boolean']>;
  user_search: Maybe<Scalars['String']>;
  user_like: Maybe<Scalars['String']>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  _nest: Todo;
  _int: Scalars['Int'];
  _float: Scalars['Float'];
  _boolean: Scalars['Boolean'];
  _string: Scalars['String'];
  user: User;
  task: Scalars['String'];
  done: Scalars['Boolean'];
};

export type Todo_IntArgs = {
  min: Maybe<Scalars['Int']>;
  max: Maybe<Scalars['Int']>;
};

export type Todo_FloatArgs = {
  min: Maybe<Scalars['Float']>;
  max: Maybe<Scalars['Float']>;
  fixed: Maybe<Scalars['Int']>;
};

export type Todo_StringArgs = {
  type: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
  template: Maybe<Scalars['String']>;
  length: Maybe<Scalars['Int']>;
  syllables: Maybe<Scalars['Int']>;
  casing: Maybe<Scalars['String']>;
  min: Maybe<Scalars['Int']>;
  max: Maybe<Scalars['Int']>;
  pool: Maybe<Scalars['String']>;
  sentences: Maybe<Scalars['Int']>;
  words: Maybe<Scalars['Int']>;
  nationality: Maybe<Scalars['String']>;
  full: Maybe<Scalars['Boolean']>;
};

export type TodoTaskArgs = {
  length: Maybe<Scalars['Int']>;
};

export type _Entity = User | Todo;

export type _Service = {
  __typename?: '_Service';
  sdl: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: Scalars['ID'];
  createTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Scalars['ID'];
  _createSnapshot: Scalars['Boolean'];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  input: UpdateTodoInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};

export type Mutation_CreateSnapshotArgs = {
  key: Scalars['String'];
};

export type CreateUserInput = {
  firstname: Scalars['String'];
};

export type UpdateUserInput = {
  firstname: Maybe<Scalars['String']>;
};

export type CreateTodoInput = {
  user_id: Scalars['ID'];
  task: Scalars['String'];
  done: Scalars['Boolean'];
};

export type UpdateTodoInput = {
  user_id: Maybe<Scalars['ID']>;
  task: Maybe<Scalars['String']>;
  done: Maybe<Scalars['Boolean']>;
};

export enum MathOptions {
  Round = 'ROUND',
  Floor = 'FLOOR',
  Ceil = 'CEIL',
}
