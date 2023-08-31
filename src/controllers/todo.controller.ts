import { Request, Response } from 'express';
import { todoService } from '../services';

export const todoController = {
  async create(req: Request, res: Response) {
    const { body } = req;

    const todo = await todoService.create(body);

    if (todo.error) {
      return res.status(todo.status).json({ error: { message: todo.error } });
    }

    return res.status(todo.status).json(todo.data);
  },

  async findAll(_req: Request, res: Response) {
    const todos = await todoService.findAll();

    return res.status(todos.status).json(todos.data);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const todo = await todoService.findById(+id);

    if (todo.error) {
      return res.status(todo.status).json({ error: { message: todo.error } });
    }

    res.status(todo.status).json(todo.data);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const updatedTodo = await todoService.update(+id, body);

    if (updatedTodo.error) {
      return res
        .status(updatedTodo.status)
        .json({ error: { message: updatedTodo.error } });
    }

    return res.status(updatedTodo.status).json();
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteTodo = await todoService.delete(+id);

    if (deleteTodo.error) {
      return res
        .status(deleteTodo.status)
        .json({ error: { message: deleteTodo.error } });
    }

    return res.status(deleteTodo.status).json();
  },
};
