import { Mutation } from '../../common/mutations/mutation';
import {
  UpdateTodoItem,
  UpdateTodoItemDocument,
  UpdateTodoItemVariables,
} from '../api/UpdateTodoItem.generated';

export class UpdateTodoItemMutation extends Mutation<UpdateTodoItem, UpdateTodoItemVariables> {
  constructor(variables: UpdateTodoItemVariables) {
    super(UpdateTodoItemDocument, variables);
  }
}
