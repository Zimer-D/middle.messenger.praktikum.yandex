import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import { ProfileEdit } from "../../components/profile/ProfileEdit";
import Block from "../../core/block/Block";
import "./profile.css";
// @ts-expect-error
import Avatar from "../../../static/assets/avatar.png";
import { validatePassword } from "../../utils/Validation";

export default class ChangePassword extends Block {
  errors = new Array();
  constructor(props: TProps) {
    const defaultValues = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    const customEvents = [
      {
        selector: "#changePassword",
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
    const oldPassword = new ProfileEdit({
      key: "Старый пароль",
      value: this.props.oldPasswordValue,
      errors: this.errors,
      type: "password",
      name: "old-password",
      events: {
        blur: (e: any) => {
          this.setProps({ confirmPasswordValue: e.target.value });
          const errorMessage = validatePassword(this.props.oldPasswordValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validatePassword(this.props.oldPasswordValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });

    const newPassword = new ProfileEdit({
      key: "Новый пароль",
      value: this.props.newPasswordValue,
      type: "password",
      errors: this.errors,
      name: "new-password",
      events: {
        blur: (e: any) => {
          this.setProps({ confirmPasswordValue: e.target.value });
          const errorMessage = validatePassword(this.props.newPasswordValue);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validatePassword(this.props.newPasswordValue);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const confirmPassword = new ProfileEdit({
      key: "Повторите пароль",
      value: this.props.confirmPasswordValue,
      type: "password",
      errors: this.errors,
      name: "confirm-password",
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
    const header = new Header({
      text: "Смена пароля",
    });

    const button = new Button({
      type: "submit",
      text: "Сохранить",
    });
    this.children.oldPassword = oldPassword;
    this.children.newPassword = newPassword;
    this.children.confirmPassword = confirmPassword;
    this.children.header = header;
    this.children.button = button;
    const ctx = this.children;
    this.showErrors();

    const temp = ` 
        <div class='container'>   
            <div class="profile">
                <div class="avatar">
                    <img alt="avatar" class="avatarImage" src=${Avatar}/>
                </div>
                <% this.header %>
                <form id='changePassword'>
                <% this.oldPassword %>
                <% this.newPassword %>
                <% this.confirmPassword %>
                <div class='error-message-wrapper' id="submitErrors">
                <% this.button %>
                </form>
            </div>
         </div>  
        `;
    return this.compile(temp, ctx);
  }
}
