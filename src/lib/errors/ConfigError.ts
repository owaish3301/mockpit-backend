import AppError, { type ErrorInput } from "./AppError.js";
import { errorCodes } from "./errorCodes.js";

export default class ConfigurationError extends AppError {
  constructor(input: ErrorInput) {
    super({
      errorCode: errorCodes.CONFIG_INVALID,
      statusCode: 500,
      errorMessage: input.errorMessage,
      isOperational: false,
    });
  }
}
