import AppError, { type ErrorInput } from "./AppError.js";
import { errorCodes } from "./errorCodes.js";

export class BadRequest extends AppError {
  constructor(input: ErrorInput) {
    super({
      errorCode: errorCodes.BAD_REQUEST,
      statusCode: 400,
      errorMessage: input.errorMessage,
      isOperational: true,
    });
  }
}

export class ConflictError extends AppError {
  constructor(input: ErrorInput) {
    super({
      errorCode: errorCodes.CONFLICT_ERROR,
      statusCode: 409,
      errorMessage: input.errorMessage,
      isOperational: true,
    });
  }
}

// bad inputs - cant be processed - unprocessable entity 422
export class UnprocessableEntity extends AppError {
  constructor(input: ErrorInput) {
    super({
      errorCode: errorCodes.UNPROCESSABLE_ENTITY,
      statusCode: 422,
      errorMessage: input.errorMessage,
      isOperational: true,
    });
  }
}

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
