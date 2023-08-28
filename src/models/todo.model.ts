import { camelizeKeys } from 'humps';
import { AddTodo, EditTodo, Todo } from '../types/todo';
import connection from './connection';
import { getFormattedUpdateColumns } from '../utils/getFormattedUpdateColumns';

export const todoModel = {
  async create({ title, description }: AddTodo) {
    const [result] = await connection.execute(
      'INSERT INTO todos (title, description) VALUES (?, ?)',
      [title, description]
    );

    const { insertId } = result as { insertId: Todo['id'] };

    return insertId;
  },
  async findAll() {
    const [todos] = await connection.execute('SELECT * FROM todos');

    return camelizeKeys(todos) as Todo[];
  },

  async findById(id: Todo['id']) {
    const [result] = await connection.execute(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );

    const [todo] = result as Todo[];

    return camelizeKeys(todo) as Todo;
  },

  async exists(id: Todo['id']) {
    const [result] = await connection.execute(
      'SELECT COUNT(*) AS count FROM todos WHERE id = ?',
      [id]
    );

    const [{ count }] = result as { count: number }[];

    return !!count;
  },

  async update(id: Todo['id'], newTodoData: EditTodo) {
    const [result] = await connection.execute(
      `UPDATE todos SET ${getFormattedUpdateColumns(newTodoData)} WHERE id = ?`,
      [...Object.values(newTodoData), id]
    );

    return result;
  },

  async delete(id: Todo['id']) {
    await connection.execute('DELETE FROM todos WHERE id = ?', [id]);

    return { deleted: true };
  },
};
