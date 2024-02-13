export const APP_STATUS_TYPES = {
  INIT: 0,
  LOADING: 1,
  CHAT_MODE: 2,
  ERROR: -1,
} as const;

export type AppStatus =
  (typeof APP_STATUS_TYPES)[keyof typeof APP_STATUS_TYPES];
