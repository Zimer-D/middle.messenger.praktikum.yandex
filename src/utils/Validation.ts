const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const loginRegExp = /^[a-z0-9_-]{2,19}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g;
const passwordRegExp = /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g;
const phoneRegExp = /^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/;

export const validateEmail = (value: string): string => {
  let errorMessage = "";
  if (value.search(emailRegExp) === -1) {
    errorMessage = `Некорректный Email`;
  }

  return errorMessage;
};

export const validateLogin = (value: string): string => {
  let errorMessage = "";
  if (value.search(loginRegExp) === -1) {
    return (errorMessage = `Поле логин должно содержать от 3 до 20 латинских символов`);
  }

  return (errorMessage = ``);
};

export const validateName = (value: string): string => {
  let errorMessage = "";
  if (value.search(nameRegExp) === -1) {
    return (errorMessage = `Первая буква буква должна быть заглавной, допускаются только латиница и кириллица`);
  }
  if (value.length < 3) {
    return (errorMessage = "Не менее 3 символов");
  }

  return ``;
};

export const validatePassword = (value: string): string => {
  let errorMessage = "";
  if (value.search(passwordRegExp) === -1) {
    return (errorMessage = `Пароль должен содержать от 8 до 40 латинских символов, цифру и заглавную букву`);
  }

  return ``;
};

export const validatePhone = (value: string): string => {
  let errorMessage = "";
  if (value.search(phoneRegExp) === -1) {
    return (errorMessage = `Некорректный номер телефна`);
  }

  return (errorMessage = ``);
};
