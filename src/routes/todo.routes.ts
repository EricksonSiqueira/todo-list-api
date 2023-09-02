import { Router } from 'express';
import { todoController } from '../controllers';
import { todoMiddleware } from '../middlewares/todo.middleware';

const todoRoute = Router();

todoRoute.post(
  '/',
  todoMiddleware.validateBody,
  todoMiddleware.validateNewTodo,
  todoController.create
);
todoRoute.get('/', todoController.findAll);
todoRoute.get('/:id', todoMiddleware.validateId, todoController.findById);
todoRoute.put(
  '/:id',
  todoMiddleware.validateId,
  todoMiddleware.validateBody,
  todoMiddleware.validateTodoUpdate,
  todoController.update
);
todoRoute.delete('/:id', todoMiddleware.validateId, todoController.delete);

export { todoRoute };
