import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import Block from "../../core/block/Block";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
} from "../../utils/Validation";

export default class Register extends Block {
  errors = new Array();
  constructor(props: TProps) {
    const defaultValues = {
      emailValue: "",
      loginValue: "",
      firstNameValue: "",
      secondNameValue: "",
      passwordValue: "",
      confirmPasswordValue: "",
    };

    const customEvents = [
      {
        selector: "#registerForm",
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const target = { ...e.target };
            this.removeChildrenListeners();
            this.handleSubmit(target);
          },
        },
      },
    ];

    const propsAndChildren = { ...props, ...defaultValues };

    super(propsAndChildren, customEvents);
  }

  handleSubmit(target: any) {
    const x = Object.keys(target).map((key) => {
      return target[key];
    });
    const myTarget = x.filter((q) => q.nodeName === "INPUT");
    const valid =
      this.errors.filter((n) => n).length == 0 &&
      !myTarget.filter((q) => q.value === "");
    const formData = {};

    if (valid) {
      Object.entries(target).forEach(([key, child]) => {
        console.log(key, child);
        // @ts-ignore
        if (child.nodeName === "INPUT") {
          // @ts-ignore
          if (!child.value) {
            this.errors.push("Заполните пустые поля");
          }
          // @ts-ignore
          formData[child.name] = child.value;
        }
      });

      console.log(formData);
    } else {
      this.errors.push("Заполните пустые поля");
      console.log(44, this.errors);
      this.render();
      return this.errors;
    }
  }

  showErrors() {
    const uniqErrors = [...new Set(this.errors)];
    const errMsg = uniqErrors
      .map((q) => `<div class='errorMessage'>${q}</div>`)
      .join(" ");
    const errBlock = document?.getElementById("submitErrors");
    if (errBlock) {
      errBlock.innerHTML = errMsg;
    }
    this.errors = [];
  }

  render() {
    const email = new Input({
      label: "Адрес электронной почты",
      type: "text",
      name: "email",
      errors: this.errors,
      value: this.props.emailValue,
      events: {
        blur: (e: any) => {
          this.setProps({ emailValue: e.target.value });
          const errorMessage = validateEmail(this.props.emailValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validateEmail(this.props.emailValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });

    const login = new Input({
      label: "Логин",
      type: "text",
      name: "login",
      errors: this.errors,
      value: this.props.loginValue,
      events: {
        blur: (e: any) => {
          this.setProps({ loginValue: e.target.value });
          const errorMessage = validateLogin(this.props.loginValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validateLogin(this.props.loginValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const first_name = new Input({
      label: "Имя",
      type: "text",
      name: "first_name",
      errors: this.errors,
      value: this.props.firstNameValue,
      events: {
        blur: (e: any) => {
          this.setProps({ firstNameValue: e.target.value });
          const errorMessage = validateName(this.props.firstNameValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validateName(this.props.firstNameValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const second_name = new Input({
      label: "Фамилия",
      type: "text",
      name: "second_name",
      errors: this.errors,
      value: this.props.secondNameValue,
      events: {
        blur: (e: any) => {
          this.setProps({ secondNameValue: e.target.value });
          const errorMessage = validateName(this.props.secondNameValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validateName(this.props.secondNameValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const password = new Input({
      label: "Пароль",
      type: "password",
      name: "password",
      errors: this.errors,
      value: this.props.passwordValue,
      events: {
        blur: (e: any) => {
          this.setProps({ passwordValue: e.target.value });
          const errorMessage = validatePassword(this.props.passwordValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validatePassword(this.props.passwordValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const confirmPassword = new Input({
      label: "Повторите пароль",
      type: "password",
      name: "confirm_password",
      errors: this.errors,
      value: this.props.confirmPasswordValue,
      events: {
        blur: (e: any) => {
          this.setProps({ confirmPasswordValue: e.target.value });
          const errorMessage = validatePassword(
            this.props.confirmPasswordValue
          );
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validatePassword(
              this.props.confirmPasswordValue
            );
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const button = new Button({
      type: "submit",
      text: "Зарегистрироваться",
    });

    const header = new Header({
      text: "Регистрация",
    });
    this.children.email = email;
    this.children.login = login;
    this.children.firstName = first_name;
    this.children.secondName = second_name;
    this.children.password = password;
    this.children.confirmPassword = confirmPassword;
    this.children.button = button;
    this.children.header = header;
    const ctx = this.children;
    this.showErrors();

    let temp = `
    <main> 
        <div class='container'>
            <div class="login">
                <% this.header %>
                <form id='registerForm'>
                    <% this.email %>
                    <% this.login %>
                    <% this.firstName %>
                    <% this.secondName %>
                    <% this.password %>
                    <% this.confirmPassword %>
                    <div class='error-message-wrapper' id="submitErrors">
                    </div>
                    <% this.button %>
                </form>
                <a href="/register">Уже зарегистрированы? Войти!</a>
            </div> 
         </div>
    </main>  
        `;
    return this.compile(temp, ctx);
  }
}
