import { MakeResponse, HttpStatus, StatusForCode } from "../types/generic";
import { ValidationError } from "joi"
import { logger } from "../log/logger";
import { Response } from "express";


export const makeResponse = (
  status: number | boolean,
  message: string,
  data: any,
): MakeResponse => {
  return {
    status,
    message,
    data,
  };
};

export const _sendErrorResponse = (
  res: Response,
  message: string,
  data: Record<string, any>,
  statusCode: number = 400
): Response => {
  return res.status(statusCode).json({
    status: false,
    message: message,
    data: data,
  });
};

export const _sendSuccessResponse = (
  res: Response,
  message: string,
  data: Record<string, any>,
  statusCode: number = 200
): Response | void => {
  return res.status(statusCode).json({
    status: true,
    message: message,
    data: data,
  });
};

export const sendErrorResponse = (
  message: string,
  code: number = 400
) => {
  logger.error(`error with message and code :: ${message} :: ${code}`);
  return {
    message,
    code: StatusForCode[code] || HttpStatus.BadRequest,
    status: code,
  };
};

export const sendSuccessResponse = (
  message: string,
  data: unknown,
): {
  message: string;
  data: unknown;
} => {
  return {
    message,
    data,
  };
};

export const handleValidationError = (
  validateErrorData: ValidationError
) => {
  return sendErrorResponse(validateErrorData.details[0].message, 400);
};
