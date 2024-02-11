import Joi from "joi";

const newSolutionSchema = Joi.object({
  description: Joi.string().max(300),
});

export default newSolutionSchema;
