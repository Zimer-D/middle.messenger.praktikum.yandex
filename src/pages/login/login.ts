import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import Block from "../../core/block/Block";
import Authorization from "../../core/controllers/Authorization";
import { store } from "../../core/store";
import { getFormData } from "../../utils/GetData";
import { validateLogin, validatePassword } from "../../utils/Validation";

export default class Login extends Block<TProps> {
  errors = new Array();
  constructor(props: TProps) {
    const defaultValues = {
      loginValue: "",
      passwordValue: "",
      isLoading: store.getState().loginPage.isLoading,
    };

    const customEvents = [
      {
        selector: "#loginForm",
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const formData = getFormData([...target]);
            this.removeChildrenListeners();
            this.handleSubmit(formData);
          },
        },
      },
    ];

    const propsAndChildren = { ...props, ...defaultValues };
    super(propsAndChildren, customEvents);
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setProps({
        isLoading: state.loginPage.isLoading,
      });
    });
  }

  handleSubmit(target: any) {
    const x = Object.keys(target).map((key) => {
      return target[key];
    });
    const myTarget = x.filter((q) => q.nodeName === "INPUT");
    const valid =
      this.errors.filter((n) => n).length == 0 &&
      myTarget.filter((q) => q.value === "");

    if (valid) {
      store.setState({
        loginPage: {
          isLoading: true,
        },
      });
      Authorization.signIn(target).then(() => {
        store.setState({
          loginPage: {
            isLoading: false,
          },
        });
      });
    } else {
      this.errors.push("Заполните пустые поля");
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
    const login = new Input({
      label: "Логин",
      type: "text",
      name: "login",
      errors: this.errors,
      value: this.props.loginValue,
      events: {
        blur: (e: { target: { value: any; }; }) => {
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

    const password = new Input({
      label: "Пароль",
      type: "password",
      name: "password",
      errors: this.errors,
      value: this.props.passwordValue,
      events: {
        blur: (e: { target: { value: any; }; }) => {
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
    const button = new Button({
      type: "submit",
      text: "Войти",
    });

    const header = new Header({
      text: "Войти",
    });

    this.children.login = login;
    this.children.password = password;
    this.children.button = button;
    this.children.header = header;
    const ctx = this.children;
    this.showErrors();
    const temp = `
    <main> 
      <div class='container'>
        <div class="login">
            <% this.header %>
            <form id="loginForm">
            <% this.login %>
            <% this.password %>
            <div class='error-message-wrapper' id="submitErrors">
            </div>
            <% this.button %>
            </form>
            <a href="/register">Зарегистрироваться</a>   
         </div>
      </div>
    </main>  
        `;
    return this.compile(temp, ctx);
  }
}
