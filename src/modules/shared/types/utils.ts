export type Result<T> = Ok<T> | Err;

export type Ok<T> = { kind: "ok"; value: T };

export type Err = { kind: "err"; error: string };
