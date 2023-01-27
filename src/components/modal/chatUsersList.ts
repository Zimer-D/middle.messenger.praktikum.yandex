import { TProps } from "../../../types/types";
import Block from "../../core/block/Block";
import ChatApi from "../../core/controllers/ChatApi";
import { Button } from "../buttons/button";
// @ts-ignore
import Xmark from "../../../static/assets/xmark.png";
import "./modal.css";
import router from "../../core/router";
import { store } from "../../core/store";
// @ts-ignore
import Trash from "../../../static/assets/trash.png";
// @ts-ignore
import Checked from "../../../static/assets/checked.png";
import Client from "../../core/api/Api";
import { API_URL } from "../../core/api/URLS";

export default class ChatUsersList extends Block<TProps> {
  constructor(props: TProps) {
    const { id = null } = router.getParams();

    const customEvents = [
      {
        selector: ".btn-close",
        events: {
          click: () => {
            this.setProps({ isOpened: false });
          },
        },
      },
      {
        selector: ".delUser",
        events: {
          click: (e: { target: { id: any; }; }) => {
            ChatApi.deleteChatUser({ chatId: id }, { userId: e.target.id });
          },
        },
      },
      {
        selector: ".addUser",
        events: {
          click: (e: { target: { id: any; }; }) => {
            ChatApi.addChatUser({ chatId: id }, { userId: e.target.id });
          },
        },
      },
      {
        selector: "#loginSearch",
        events: {
          click: () => {
            const searchInput = document.getElementById("searchInput");
            searchInput?.addEventListener("input", (event) => {
              //@ts-ignore
              let value = event.target?.value;

              if (value && value.trim().length > 3) {
                value = value.trim().toLowerCase();
                this.searchForUsers(value);
              }
            });
          },
        },
      },
    ];

    const propsAndChildren = { ...props, currentChatId: id };

    super(propsAndChildren, customEvents);
    // if(!!this.props.currentChat&&Object.keys(this.props.currentChat).length!==0){return}else{
    this.getUsers(id)
  // };
  }
  getUsers(chatId: number | null) {
    if (!chatId) {
      return;
    }
    ChatApi.getChatUsers(chatId * 1).then((res) => {
      this.setProps({ chatUsers: res! });
    });
  }
  // debounce(func, timeout = 300) {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //     }, timeout);
  //   };
  // }
  searchForUsers(value: any) {
    const data = {
      login: value,
    };
    Client.post(`${API_URL}/user/search`, { data: JSON.stringify(data) })
      .then((res: any) => {
        this.setProps({ searchedUsers: res });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let ownerId = !!this.props.currentChat&&Object.keys(this.props.currentChat).length!==0?store.getState().currentChat?.created_by:'';
    let userId = !!this.props.currentChat&&Object.keys(this.props.currentChat).length!==0?store.getState().currentUser.id:'';
    let usersList = !!this.props.currentChat&&Object.keys(this.props.currentChat).length!==0?store.getState().chatUsers?.filter((q: { id: any; }) => q.id != userId):'';

    this.children.button = new Button({
      text: "Поиск",
      type: "button",
    });

    let isOpenedClass;

    if (this.props.isOpened) {
      isOpenedClass = "modal-opened";
    } else {
      isOpenedClass = "";
    }

    const temp = `<div class="modal-wrapper ${isOpenedClass}">
                         <div class="modal">
                              <div class="modal__header">
                                 
                                  <a class="btn btn-nav btn-close">
                                      <img src="${Xmark}" />
                                  </a>
                              </div>
                              <div class="modal__body">
                              <div>
                              <h3>Список пользоватей</h3>
                               ${
                                 !!usersList
                                   ? usersList
                                       .map(
                                         (user: { display_name: string; id: number; }) =>
                                           `<div class='usersList'>
                                ${user.display_name}
                                    ${
                                      user.id !== ownerId
                                        ? ` <div  class='icon'>
                                         <img alt='icon' id=${user.id} class='delUser' src=${Trash} />
                                    </div>`
                                        : "(создатель)"
                                    }
                                    </div>`
                                       )
                                       .join(" ")
                                   : "Нет приглашенных пользоватей"
                               }
                                     <div>
                                     <div>
                                        <h3>Добавить пользоватей</h3>
                                        <form id='loginSearch'>
                                            <input type='text'  id='searchInput' class='listSearch'  placeholder='Введите логин пользователя'>
                                        </form>
                                        ${
                                          !!this.props.searchedUsers &&
                                          !!this.props.searchedUsers.length
                                            ? this.props.searchedUsers.map(
                                                (q: { display_name: string; id: number; }) =>
                                                  `<div class='usersList' id='searchResult'>
                                                ${q.display_name}
                                                ${
                                                  q.id !== ownerId
                                                    ? ` <div class='icon' style='margin-left:10px'>
                                                                     <img alt='icon' id=${q.id} class='addUser' src=${Checked} />
                                                                </div>`
                                                    : ""
                                                }
                                            </div>`
                                              )
                                            : "Нет пользователей  с таким ником"
                                        }
                                    </div>
                              </div>
                         </div>
                    </div>`;
    return this.compile(temp, this.props);
  }
}
