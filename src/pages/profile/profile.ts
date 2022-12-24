import { TProps } from "../../../types/types";
import { Header } from "../../components/header/header";
import { ProfileData } from "../../components/profile/profileData";
import Block from "../../core/block/Block";
import "./profile.css";
// @ts-expect-error
import Avatar from "../../../static/assets/avatar.png";

export default class Profile extends Block {
  constructor(props: TProps) {
    // CHILDREN

    const errors: any = [];
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
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const target = { ...e.target };
            // Костыльный метод, блокирующий вызовы blur, при отправке формы
            this.removeChildrenListeners();
            //   this.handleSubmit(target);
          },
        },
      },
    ];

    // Объединяем текущие пропсы компонента и его детей
    const propsAndChildren = { ...props, errors, ...defaultValues };

    super(propsAndChildren, customEvents);
  }

  // handleSubmit(target: any) {
  //   const isValidated = validate(this, true);

  //   if (isValidated === true) {
  //     const formData = {};
  //     // @ts-ignore
  //     Object.entries(target).forEach(([key, child]) => {
  //       // @ts-ignore
  //       if (child.nodeName === 'ProfileData') {
  //         // @ts-ignore
  //         formData[child.name] = child.value;
  //       }
  //     });

  //     console.log(formData);
  //   }
  // }

  render() {
    const email = new ProfileData({
      key: "Адрес электронной почты",
      value: this.props.emailValue,
    });

    const login = new ProfileData({
      key: "Логин",
      value: this.props.loginValue,
    });
    const firstName = new ProfileData({
      key: "Имя",
      value: this.props.firstNameValue,
    });
    const secondName = new ProfileData({
      key: "Фамилия",
      value: this.props.secondNameValue,
    });
    const nickName = new ProfileData({
      key: "Имя в чате",
      value: this.props.nickNameValue,
    });
    const phone = new ProfileData({
      key: "Телефон",
      value: this.props.phoneValue,
    });

    const header = new Header({
      text: "Anonim",
    });
    this.children.email = email;
    this.children.login = login;
    this.children.firstName = firstName;
    this.children.secondName = secondName;
    this.children.nickName = nickName;
    this.children.phone = phone;
    this.children.header = header;
    const ctx = this.children;
    const temp = `  
        <div class='container'>  
            <div class="profile">
                <div class="avatar">
                    <img src=${Avatar} alt="avatar" class="avatarImage" />
                    <a href="./changeAvatar.hbs" class="img__description">Поменять аватар</a>
                </div>
                    <div style='margin: 0 auto'><% this.header %></div>
                    <% this.email %>
                    <% this.login %>
                    <% this.firstName %>
                    <% this.secondName %>
                    <% this.nickName %>
                    <% this.phone %>
                    <a href="/edit-profile">Изменить данные</a>
                    <a href="/change-password">Изменить пароль</a>
                    <a href="/login" style=color:red>Выйти</a>
            </div>  
         </div>
        `;
    return this.compile(temp, ctx);
  }
}
