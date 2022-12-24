import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import { ProfileEdit } from "../../components/profile/ProfileEdit";
import Block from "../../core/block/Block";
import "./profile.css";
// @ts-expect-error
import Avatar from "../../../static/assets/avatar.png";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from "../../utils/Validation";

export default class EditProfile extends Block {
  errors = new Array();
  constructor(props: TProps) {
    const defaultValues = {
      emailValue: "dmitry.zimer",
      loginValue: "",
      firstNameValue: "",
      secondNameValu: "",
      nickNameValue: "",
      phoneValue: "",
    };

    const customEvents = [
      {
        selector: "#profileForm",
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
    const email = new ProfileEdit({
      key: "Адрес электронной почты",
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

    const login = new ProfileEdit({
      key: "Логин",
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
    const firstName = new ProfileEdit({
      key: "Имя",
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
            this.props.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const secondName = new ProfileEdit({
      key: "Фамилия",
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
    const nickName = new ProfileEdit({
      key: "Имя в чате",
      value: this.props.nickNameValue,
      type: "text",
    });
    const phone = new ProfileEdit({
      key: "Телефон",
      value: this.props.phoneValue,
      type: "text",
      errors: this.errors,
      name: "phone",
      events: {
        blur: (e: any) => {
          this.setProps({ phoneValue: e.target.value });
          const errorMessage = validatePhone(this.props.phoneValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validatePhone(this.props.phoneValue);
            this.props.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const header = new Header({
      text: "Anonim",
    });
    const button = new Button({
      type: "submit",
      text: "Сохранить",
    });

    this.children.button = button;
    this.children.email = email;
    this.children.login = login;
    this.children.firstName = firstName;
    this.children.secondName = secondName;
    this.children.nickName = nickName;
    this.children.phone = phone;
    this.children.header = header;
    const ctx = this.children;
    this.showErrors();
    const temp = ` 
        <div class='container'>   
            <div class="profile">
                <div class="avatar">
                <img alt="avatar" class="avatarImage" src=${Avatar}/>
            </div>
            <div style='margin: 0 auto'><% this.header %></div>
            <form id='profileForm'>
                    <% this.email %>
                    <% this.login %>
                    <% this.firstName %>
                    <% this.secondName %>
                    <% this.nickName %>
                    <% this.phone %>
                    <div class='error-message-wrapper' id="submitErrors">
                    </div>
                    <% this.button %>
                    </form>
            </div> 
         </div> 
        `;
    return this.compile(temp, ctx);
  }
}
