import { Todo, AddTodo } from '../../../src/types/todo';

export const todoMock = {
  id: 1,
  title: 'title',
  description: 'description',
  done: 0,
} as Todo;

export const todoMockWithNoId = {
  title: 'title',
  description: 'description',
  done: 0,
};

export const createTodoMock = {
  title: 'title',
  description: 'description',
} as AddTodo;
