export const notFoundError = (resourse) => {
  throw {
    httpStatus: 404,
    code: "RESOURECE_NOT_FOUND",
    message: `Esta ruta no existe ${resourse}`,
  };
};

export const userAlReadyRegistratedError = () => {
  throw {
    httpStatus: 409,
    code: "USER_ALREADY_EXIST",
    message: `UserName alredy`,
  };
};

export const emailAlReadyRegistratedError = () => {
  throw {
    httpStatus: 409,
    code: "EMAIL_ALREDY_USED",
    message: `Email alredy used`,
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401,
    code: "ERROR_CREDENTIALS_INCORRECT",
    message: `Incorrect credentials`,
  };
};

export const notAuthorizationError = () => {
  throw {
    httpStatus: 401,
    code: "NOT_ACREDITED",
    message: `User not acredited`,
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
    message: `Can't delete img`,
  };
};

export const canNotResolveTaskError = () => {
  throw {
    httpStatus: 403,
    code: "CANNOT_RESOLVE_TASK",
    message: `You can't resolve your own task`,
  };
};

export const solutionAlredyExistError = () => {
  throw {
    httpStatus: 409,
    code: "SOLUTION_ALLREDY_TASK",
    message: `The task have a solution`,
  };
};
