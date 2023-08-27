import { Todo } from '../../types/todo';
import StatusCode from '../../types/statusCode';
import { addTodoSchema } from './schemas/todo.schema';

export const todoValidations = {
  newTodo({ title, description, done }: Omit<Todo, 'id'>) {
    const { error } = addTodoSchema.validate({ title, description, done });

    if (error) {
      return { status: StatusCode.BAD_REQUEST, message: error.message };
    }
  },
};
