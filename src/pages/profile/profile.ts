import { Header } from "../../components/header/header";
import { ProfileData } from "../../components/profile/profileData";
import Block from "../../core/block/Block";
import "./profile.css";
// @ts-ignore
import Avatar from "../../../static/assets/avatar.png";
import { TProps } from "../../../types/types";
import { store } from "../../core/store";
import Authorization from "../../core/controllers/Authorization";
import ProfileApi from "../../core/controllers/Profile";
// @ts-ignore
import ArrowLeft from "../../../static/assets/arrowleft.png";
import router from "../../core/router";
import { RESOURCES_URL } from "../../core/api/URLS";
function handelClick() {
  //@ts-ignore
  document.getElementById("input_file").click();
}

export default class Profile extends Block<TProps> {
  constructor(props: TProps) {
    const currentUser = store.getState();
    const defaultValues = {
      avatar: currentUser.avatar,
      first_name: currentUser.first_name,
      second_name: currentUser.second_name,
      login: currentUser.login,
      email: currentUser.email,
      phone: currentUser.phone,
      dispaly_name: currentUser.dispaly_name,
      isLoading: currentUser.isLoading,
    };
    const customEvents = [
      {
        selector: "#sign-out",
        events: {
          click: () => {
            Authorization.signOut();
          },
        },
      },
      {
        selector: "#change_avatar",
        events: {
          click: () => {
            handelClick();
          },
        },
      },
      {
        selector: "#backToChats",
        events: {
          click: () => {
           router.go('/chats')
          },
        },
      },
      {
        selector: "#input_file",
        events: {
          change: (e: Event) => {
            const formData = new FormData();
            const { files } = <HTMLInputElement>e.target;
            if (!files?.length) {
              return;
            }
            const [file] = files;
            formData.append("avatar", file);
            ProfileApi.updateAvatar(formData);
          },
        },
      },
    ];
    super({ ...props, ...defaultValues }, customEvents);
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setProps({
        avatar: !state.currentUser.avatar
          ? Avatar
          : RESOURCES_URL + state.currentUser.avatar,
        first_name: state.currentUser.first_name,
        second_name: state.currentUser.second_name,
        display_name: state.currentUser.display_name,
        email: state.currentUser.email,
        login: state.currentUser.login,
        phone: state.currentUser.phone,
        isLoading: state.currentUser.isLoading,
      });
    });
  }
  render() {
    const email = new ProfileData({
      key: "Адрес электронной почты",
      value: this.props.email,
    });

    const login = new ProfileData({
      key: "Логин",
      value: this.props.login,
    });
    const firstName = new ProfileData({
      key: "Имя",
      value: this.props.first_name,
    });
    const secondName = new ProfileData({
      key: "Фамилия",
      value: this.props.second_name,
    });
    const nickName = new ProfileData({
      key: "Имя в чате",
      value: this.props.display_name,
    });
    const phone = new ProfileData({
      key: "Телефон",
      value: this.props.phone,
    });

    const header = new Header({
      text: this.props.display_name,
    });
    this.children.email = email;
    this.children.login = login;
    this.children.firstName = firstName;
    this.children.secondName = secondName;
    this.children.nickName = nickName;
    this.children.phone = phone;
    this.children.header = header;

    // const ctx = this.children;
    const temp = `
    <main>  
        <div class='container'>  
          <div class='icon-div'>
          <div class='icon-wrapper'>
            <img src=${ArrowLeft} alt="edit" style='height:22px' id='backToChats'/>
          </div>
                  <div class="profile">
                
                      <div class="avatar">
                          <img src='<% this.avatar %>' alt="avatar" class="avatarImage" />
                          <input type="file" name=" " id='input_file' style="opacity:0">
                          <div id="change_avatar" class="img__description">Поменять аватар</div>
                      </div>
                          <div style='margin: 0 auto'>
                              <% this.header %>
                          </div>
                        <% this.email %>
                          <% this.login %>
                          <% this.firstName %>
                          <% this.secondName %>
                          <% this.nickName %>
                          <% this.phone %>
                          <a href="/edit-profile">Изменить данные</a>
                          <a href="/change-password">Изменить пароль</a>
                          <a id="sign-out" href="/login" style=color:red>Выйти</a>
                    </div> 
            </div> 
         </div>
        
    </main> 
        `;
    return this.compile(temp, this.props);
  }
}
