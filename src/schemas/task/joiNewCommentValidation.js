import Joi from "joi";

const newCommentSchema = Joi.object({
  description: Joi.string().max(300).alphanum(),
});

export default newCommentSchema;
