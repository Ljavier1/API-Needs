export const notFoundError = (resource) => {
  throw {
    httpStatus: 404,
    code: "RESOURCE_NOT_FOUND",
    message: `The path ${resource} doesn't exist`,
  };
};

export const userAlreadyRegistratedError = () => {
  throw {
    httpStatus: 409,
    code: "USER_ALREADY_EXISTS",
    message: `This username already exists`,
  };
};

export const emailAlreadyRegistratedError = () => {
  throw {
    httpStatus: 409,
    code: "EMAIL_ALREADY_USED",
    message: `This email already exists`,
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401,
    code: "ERROR_CREDENTIALS_INCORRECT",
    message: `Incorrect credentials`,
  };
};

export const notAuthorizedError = () => {
  throw {
    httpStatus: 401,
    code: "NOT_AUTHORIZED",
    message: `User not authorized`,
  };
};

export const saveFileError = () => {
  throw {
    httpStatus: 500,
    code: "FILE_SAVE_FAILED",
    message: `Error to save file`,
  };
};

export const deleteFileError = () => {
  throw {
    httpStatus: 409,
    code: "FILE_DELETED_FAILED",
    message: `Error deleting this file`,
  };
};

export const resolveOwnTaskError = () => {
  throw {
    httpStatus: 403,
    code: "CANNOT_RESOLVE_TASK",
    message: `You can't resolve your own task`,
  };
};

export const solutionAlreadyExistsError = () => {
  throw {
    httpStatus: 409,
    code: "SOLUTION_ALREADY_EXISTS",
    message: `This task already has many solutions`,
  };
};

export const poolError = () => {
  throw {
    httpStatus: 502,
    code: "BAD_GATEWAY_CONNECTION",
    message: `Server connection error`,
  };
};