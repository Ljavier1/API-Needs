import Joi from "joi";

const newTaskSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),

  description: Joi.string().max(300),
});

export default newTaskSchema;
