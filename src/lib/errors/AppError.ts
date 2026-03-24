import type { ErrorCodes } from "./errorCodes.js";

type AppErrorOptions = {
  errorCode: ErrorCodes;
  statusCode: number;
  errorMessage: string;
  isOperational?: boolean;
};

export default class AppError extends Error {
  readonly errorCode: ErrorCodes;
  readonly statusCode: number;
  readonly errorMessage: string;
  readonly isOperational: boolean;

  constructor(options: AppErrorOptions) {
    super(options.errorMessage);

    this.errorCode = options.errorCode;
    this.statusCode = options.statusCode;
    this.errorMessage = options.errorMessage;
    this.isOperational = options.isOperational || true;
  }
}

export type ErrorInput = {
  errorMessage: string;
};
