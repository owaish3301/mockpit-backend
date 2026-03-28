export const errorCodes = {
  BAD_REQUEST: "BAD_REQUEST",
  CONFIG_INVALID: "CONFIG_INVALID",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
  CONFLICT_ERROR: "CONFLICT_ERROR",
} as const;

export type ErrorCodes = (typeof errorCodes)[keyof typeof errorCodes];
