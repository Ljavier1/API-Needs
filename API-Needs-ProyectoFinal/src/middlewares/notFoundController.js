import { notFoundError } from "../service/errorService.js";

const notFound = (req, res, next) => {
  next(notFoundError());
};

export default notFound;
