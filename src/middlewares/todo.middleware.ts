import { missingFieldTextResponse } from '../utils/missingFieldTextResponse';
import { Todo } from '../types/todo';
import { NextFunction, Request, Response } from 'express';
import StatusCode from '../types/statusCode';

export const todoMiddleware = {
  async validateNewTodo(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    console.log(body);

    const requiredFields: (keyof Omit<Todo, 'id'>)[] = [
      'title',
      'description',
      'done',
    ];

    const missingFieldsText = missingFieldTextResponse(body, requiredFields);

    if (missingFieldsText) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: missingFieldsText });
    }

    next();
  },
};
