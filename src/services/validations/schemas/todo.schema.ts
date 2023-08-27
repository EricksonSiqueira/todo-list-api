import Joi from 'joi';

const addTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  done: Joi.number().required(),
});

export { addTodoSchema };
