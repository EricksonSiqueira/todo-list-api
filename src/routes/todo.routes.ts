import { Router } from 'express';
import { todoController } from '../controllers';
import { todoMiddleware } from '../middlewares/todo.middleware';

const todoRoute = Router();

todoRoute.post('/', todoMiddleware.validateNewTodo, todoController.create);
todoRoute.get('/', todoController.findAll);
todoRoute.get('/:id', todoController.findById);
todoRoute.put('/:id', todoController.update);
todoRoute.delete('/:id', todoController.delete);

export { todoRoute };
