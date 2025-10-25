import { Request, Response, NextFunction } from "express";
import { constants } from "../constants";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || res.statusCode || constants.SERVER_ERROR;
  res.status(statusCode);

  let response = {
    title: "Error",
    message: err.message,
    stackTrace: err.stack,
  };

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.title = "Validation Failed";
      break;
    case constants.UNAUTHORISED:
      response.title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      response.title = "Forbidden";
      break;
    case constants.NOT_FOUND:
      response.title = "Not Found";
      break;
    case constants.SERVER_ERROR:
    default:
      response.title = "Internal Server Error";
      break;
  }

  res.json(response);
};
