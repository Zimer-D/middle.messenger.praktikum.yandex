export type TProps = Record<string, any>;

export type Nullable<T> = T | null;

export type RecordItem = Record<string, any>;

export type Keys<T extends Record<string, unknown>> = keyof T;

export type Values<T extends Record<string, unknown>> = T[Keys<T>];

export type ButtonProps = {
  text: string;
  type: string;
  id?: string;
  onClick?: () => void;
};

export type HeaderProps = {
  text: string;
  className?: string;
};

export type InputProps = {
  label: string;
  type: string;
  value?: string;
  name: string;
  errors: string | Array<string>;
  events: any;
};

export type LinkProps = {
  text: string;
  url: string;
};

export type ChatListProps = {
  items: Array<any>;
};

export type ChatAreaProps = { messages: Array<any> };

export type ProfileDataProps = {
  key: string;
  value: string;
};

export type ProfileEditProps = {
  key: string;
  type: string;
  value: string;
  name: string;
  errors?: string | Array<string>;
  events?: any;
};

export type FileInputProps = {
  type: string;
  value: string;
};

export type PageType = {
  errors?: Array<string>;
  customEvents?: Array<RecordItem>;
  children: RecordItem;
  ctx: RecordItem;
  props?: TProps;
};

export type TAccess = "public" | "protected" | "";

export interface UserData {
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
}

export interface PasswordUpdate {
  oldPassword?: string;
  newPassword?: string;
}

export interface LoginData {
  login?: string;
  password?: string;
}
