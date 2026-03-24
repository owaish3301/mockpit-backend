import AppError, { type ErrorInput } from "./AppError.js";
import { errorCodes } from "./errorCodes.js";

export class InternalError extends AppError {
  constructor(input: ErrorInput) {
    super({
      errorCode: errorCodes.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      errorMessage: input.errorMessage,
      isOperational: true,
    });
  }
}
