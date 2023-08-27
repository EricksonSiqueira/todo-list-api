import { AddTodo, Todo } from '../../types/todo';
import StatusCode from '../../types/statusCode';
import { addTodoSchema } from './schemas/todo.schema';

export const todoValidations = {
  newTodo({ title, description }: AddTodo) {
    const { error } = addTodoSchema.validate({ title, description });

    if (error) {
      return { status: StatusCode.BAD_REQUEST, message: error.message };
    }
  },
};
