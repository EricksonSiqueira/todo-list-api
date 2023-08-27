import { create } from 'domain';
import { todoValidations } from './validations/todo.validation';
import { AddTodo, Todo } from '../types/todo';
import { todoModel } from '../models';
import StatusCode from '../types/statusCode';

export const todoService = {
  async create({ title, description }: AddTodo) {
    const error = todoValidations.newTodo({ title, description });

    if (error) {
      return { status: error.status, error: error.message };
    }

    const newTodoId = await todoModel.create({ title, description });

    return { status: StatusCode.CREATED, data: { id: newTodoId } };
  },

  async findAll() {
    const todos = await todoModel.findAll();

    return { status: StatusCode.OK, data: todos };
  },

  async findById(id: Todo['id']) {
    const todo = await todoModel.findById(id);

    return { status: StatusCode.OK, data: todo };
  },

  async update(id: Todo['id'], newTodoData: Omit<Todo, 'id'>) {
    const todoExists = await todoModel.exists(id);

    if (!todoExists) {
      return { status: StatusCode.NOT_FOUND, error: 'Todo not found' };
    }

    await todoModel.update(id, newTodoData);

    return { status: StatusCode.NO_CONTENT, message: 'Todo updated' };
  },

  async delete(id: Todo['id']) {
    const todoExists = await todoModel.exists(id);

    if (!todoExists) {
      return { status: StatusCode.NOT_FOUND, error: 'Todo not found' };
    }

    await todoModel.delete(id);

    return { status: StatusCode.NO_CONTENT };
  },
};
