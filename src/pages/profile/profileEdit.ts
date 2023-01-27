import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import { ProfileEdit } from "../../components/profile/profileEdit";
import Block from "../../core/block/Block";
import "./profile.css";
//@ts-ignore
import Avatar from "../../../static/assets/avatar.png";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from "../../utils/Validation";
import { store } from "../../core/store";
import { getFormData } from "../../utils/GetData";
import ProfileApi from "../../core/controllers/Profile";
import { RESOURCES_URL } from "../../core/api/URLS";


export default class EditProfile extends Block<TProps> {
  errors = new Array();
  constructor(props: TProps) {
    const currentUser = store.getState();
    const defaultValues = {
      emailValue: currentUser.email,
      loginValue: currentUser.login,
      firstNameValue: currentUser.first_name,
      secondNameValu: currentUser.second_name,
      nickNameValue: currentUser.dispaly_name,
      phoneValue: currentUser.phone,
      isLoading: currentUser.isLoading,
    };

    const customEvents = [
      {
        selector: "#profileForm",
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
        avatar: !state.currentUser.avatar
          ? Avatar
          : RESOURCES_URL + state.currentUser.avatar,
        first_name: state.currentUser.first_name,
        second_name: state.currentUser.second_name,
        email: state.currentUser.email,
        login: state.currentUser.login,
        phone: state.currentUser.phone,
      });
    });
  }
  handleSubmit(target: any) {
    this.errors = [];
    const x = Object.keys(target).map((key) => {
      return target[key];
    });
    const myTarget = x.filter((q) => q.nodeName === "INPUT");
    const valid =
      this.errors.filter((n) => n).length == 0 &&
      myTarget.filter((q) => q.value === "");

    if (valid) {
      store.setState({
        accountEditPage: {
          isLoading: true,
        },
      });

      ProfileApi.updateInfo(target).then(() => {
        store.setState({
          accountEditPage: {
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
    const email = new ProfileEdit({
      key: "Адрес электронной почты",
      type: "text",
      name: "email",
      errors: this.errors,
      value: this.props.email,
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
      value: this.props.login,
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
      value: this.props.first_name,
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
    const secondName = new ProfileEdit({
      key: "Фамилия",
      type: "text",
      name: "second_name",
      errors: this.errors,
      value: this.props.second_name,
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
      value: this.props.dispaly_name,
      type: "text",
      name: "display_name",
    });
    const phone = new ProfileEdit({
      key: "Телефон",
      value: this.props.phone,
      type: "text",
      errors: this.errors,
      name: "phone",
      events: {
        blur: (e: any) => {
          this.setProps({ phoneValue: e.target.value });
          const errorMessage = validatePhone(this.props.phone);
          this.errors.push(errorMessage);
          this.showErrors();
        },
        focus: () => {
          setTimeout(() => {
            const errorMessage = validatePhone(this.props.phone);
            this.errors.push(errorMessage);
            this.showErrors();
          }, 10000);
        },
      },
    });
    const header = new Header({
      text: this.props.login,
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
    this.showErrors();
    const temp = `
    <main> 
        <div class='container'>   
            <div class="profile">
                <div class="avatar">
                <img src='<% this.avatar %>' alt="avatar" class="avatarImage" />
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
    </main> 
        `;
    return this.compile(temp, this.props);
  }
}
