import { AddTodo, EditTodo, Todo } from '../../types/todo';
import StatusCode from '../../types/statusCode';
import { addTodoSchema, editTodoSchema } from './schemas/todo.schema';

export const todoValidations = {
  newTodo({ title, description }: AddTodo) {
    const { error } = addTodoSchema.validate({ title, description });

    if (error) {
      return { status: StatusCode.BAD_REQUEST, message: error.message };
    }
  },
  editTodo({ title, description, done }: EditTodo) {
    const { error } = editTodoSchema.validate({ title, description, done });

    if (error) {
      return { status: StatusCode.BAD_REQUEST, message: error.message };
    }
  },
};
