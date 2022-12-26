export type TProps = Record<string, any>;

export type Nullable<T> = T | null;

export type TObj = Record<string, any>;

export type Keys<T extends Record<string, unknown>> = keyof T;

export type Values<T extends Record<string, unknown>> = T[Keys<T>];

export type ButtonProps = {
    text: string;
    type: string,
    onClick?: () => void
};

export type HeaderProps = {
    text: string;
    className?: string,
};

export type InputProps = {
    label: string;
    type: string;
    value?: string;
    name: string;
    errors: string| Array<string>;
    events: any;
};

export type LinkProps = {
    text: string;
    url: string;
};

export type ChatListProps = {
    items: Array<any>
};

export type ChatAreaProps = {
    messages: Array<any>
};

export type ProfileDataProps = {
    key: string;
    value: string;
};

export type ProfileEditProps = {
    key: string;
    type: string;
    value: string;
    name: string;
    errors?: string| Array<string>;
    events?: any;
}