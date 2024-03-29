const validation = (schema) => {
  let joiValidation = (req, res, next) => {
    let { error } = schema.validate(req.body);
    if (error) {
      let { message } = error;
      res.status(422).json({ error: message });
    } else {
      next();
    }
  };
  return joiValidation;
};

export default validation;
