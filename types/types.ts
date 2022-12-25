export type TProps = Record<string, any>;

export type Nullable<T> = T | null;

export type TObj = Record<string, any>;

export type Keys<T extends Record<string, unknown>> = keyof T;

export type Values<T extends Record<string, unknown>> = T[Keys<T>];
