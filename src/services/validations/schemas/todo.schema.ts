import Joi from 'joi';

const addTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required().allow(''),
});

const editTodoSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  done: Joi.number().valid(0, 1).optional(),
});

export { addTodoSchema, editTodoSchema };
