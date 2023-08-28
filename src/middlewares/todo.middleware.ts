import { missingFieldTextResponse, tooManyFieldsTextRespose } from '../utils';
import { AddTodo } from '../types/todo';
import { NextFunction, Request, Response } from 'express';
import StatusCode from '../types/statusCode';

export const todoMiddleware = {
  async validateNewTodo(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const requiredFields: (keyof AddTodo)[] = ['title', 'description'];

    const missingFieldsText = missingFieldTextResponse(body, requiredFields);

    if (missingFieldsText) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: missingFieldsText });
    }

    const leftOverFieldsText = tooManyFieldsTextRespose(body, requiredFields);

    if (leftOverFieldsText) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: leftOverFieldsText });
    }

    next();
  },
  async validateId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (+id <= 0) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ error: 'Id must be a positive number' });
    }

    next();
  },
};
