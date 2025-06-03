export type ReturnMessageType = { message: string; error?: boolean };

export type LoginReturnType =
  | {
      token: string;
      username: string;
    }
  | ReturnMessageType;

export type RegisterReturnType =
  | {
      token: string;
      username: string;
    }
  | ReturnMessageType;
