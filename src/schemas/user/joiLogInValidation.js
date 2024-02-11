import Joi from "joi";

const logInSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "es"] },
  }),
});

export default logInSchema;
