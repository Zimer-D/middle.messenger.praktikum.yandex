import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import { ProfileEdit } from "../../components/profile/profileEdit";
import Block from "../../core/block/Block";
import "./profile.css";
// @ts-ignore
import Avatar from "../../../static/assets/avatar.png";
import { validatePassword } from "../../utils/Validation";
import { store } from "../../core/store";
import { getFormData } from "../../utils/GetData";
import ProfileApi from "../../core/controllers/Profile";

export default class ChangePassword extends Block<TProps> {
  errors = new Array();
  constructor(props: TProps) {
    const defaultValues = {
      oldPasswordValue: "",
      newPasswordValue: "",
      confirmPasswordValue: "",
    };

    const customEvents = [
      {
        selector: "#changePassword",
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const target = e.target;
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

  handleSubmit(target: any) {
    const x = Object.keys(target).map((key) => {
      return target[key];
    });
    const myTarget = x.filter((q) => q.nodeName === "INPUT");
    const valid =
      this.errors.filter((n) => n).length == 0 &&
      myTarget.filter((q) => q.value === "");
    if (target.newPassword !== target.confirmPassword) {
      this.errors.push("Пароли не совпадают");
      this.render();
      return this.errors;
    } else if (valid) {
      store.setState({
        passwordEditPage: {
          isLoading: true,
        },
      });

      ProfileApi.updatePassword(target).then(() => {
        store.setState({
          passwordEditPage: {
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
    const oldPassword = new ProfileEdit({
      key: "Старый пароль",
      value: this.props.oldPasswordValue,
      errors: this.errors,
      type: "password",
      name: "oldPassword",
      events: {
        blur: (e: any) => {
          this.setProps({ oldPasswordValue: e.target.value });
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
      name: "newPassword",
      events: {
        blur: (e: any) => {
          this.setProps({ newPasswordValue: e.target.value });
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
      name: "confirmPassword",
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
    this.showErrors();

    const temp = `
    <main>  
        <div class='container'>   
            <div class="profile">
                <div class="avatar">
                    <img src=${Avatar} alt="avatar" class="avatarImage" />
                </div>
                <% this.header %>
                <form id='changePassword'>
                <% this.oldPassword %>
                <% this.newPassword %>
                <% this.confirmPassword %>
                <div class='error-message-wrapper' id="submitErrors"></div>
                <% this.button %>
                </form>
            </div>
         </div>
    </main>            
        `;
    return this.compile(temp, this.props);
  }
}
