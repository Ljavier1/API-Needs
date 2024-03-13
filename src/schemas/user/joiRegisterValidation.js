import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  bio: Joi.string(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "es"] },
  }),
});

export default registerSchema;
