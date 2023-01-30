import { TProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./chat.css";
// @ts-ignore
import Avatar from "../../../static/assets/avatar.png";
import { store } from "../../core/store";
import ChatApi from "../../core/controllers/ChatApi";
import NewChatModal from "../modal/newChat";
import router from "../../core/router";
import { Button } from "../buttons/button";
// @ts-ignore
import Trash from "../../../static/assets/trash.png";
import { RESOURCES_URL } from "../../core/api/URLS";

export class ChatList extends Block<TProps> {
  constructor(props: TProps = {}) {
    const defaultValues = {
      chatList: store.getState().chatList,
    };

    const customEvents = [
      {
        selector: ".button",
        events: {
          click: () => {
            this.children.newChatModal.setProps({ isOpened: true });
          },
        },
      },
      {
        selector: ".chatListItem",
        events: {
          click: (e: { target: { id: string|number } }) => {
            router.go(`/chats/${e.target.id}`);
          },
        },
      },
      {
        selector: ".delChat",
        events: {
          click: (e: { target: { id: string|number } }) => {
            router.go("/chats");
            this.setProps({
              chatList: this.props.chatList.filter(
                (q: { id: string|number }) => q.id != e.target.id
              ),
            });
            store.setState({ currentChat: null });
            ChatApi.deleteChat({ chatId: e.target.id });
          },
        },
      },
      {
        selector: "#chatSearch",
        events: {
          click: () => {
            const searchInput = document.getElementById("cSearch");
            searchInput?.addEventListener("input", (event) => {
              //@ts-ignore
              let value = event.target?.value;
              setTimeout(() => {
                this.setProps({ chatSearchValue: value });
              }, 1500);
            });
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
        chatList: state.chatList,
      });
    });
    ChatApi.getChats().then(() => {
      this._setChatInfo(this.props.currentChatId);
    });
  }

  private _setChatInfo(chatId: number) {
    const chats = store.getState().chatList;
    chats.forEach((item: any) => {
      if (item.id == chatId) {
        store.setState({
          currentChat: item,
        });
      }
    });
  }
  render() {
    this.children.button = new Button({
      text: "Создать чат",
      type: "button",
    });
    this.children.newChatModal = new NewChatModal({});
    const temp = `
        <div class="contactList">
        
            <div class="chatListHeader">
                <a href="/profile">
                    Профиль >
                </a>
                <form id='chatSearch'>
                  <input id='cSearch' class="chatSearch" type="search" placeholder="Поиск по чатам"/>
                </form>
            </div>
            <div class="contact-list">
            <% this.newChatModal %>
            <% this.button %>
            
               ${
                 !!this.props.chatList
                   ? this.props.chatList
                       .map(
                         (item: TProps) =>
                           ` 
               <div id=${item.id} class="chatListItem">
                    <div class="chat-avatar">
                    <img src=${
                      !!item.avatar ? RESOURCES_URL + item.avatar : Avatar
                    } alt="noavatar" />
                    </div>
                    <div class="chat-1">
                        <div class="chat-name">${item.title}</div>
                        <div class="last-message">${
                          item.last_message?.content ?? ""
                        }</div>
                    </div>
                    <div class="chat-2">
                        <div class="chat-time">${
                          !!item.last_message
                            ? new Date(
                                item.last_message?.time
                              ).toLocaleTimeString()
                            : ""
                        }</div>
                        ${
                          item.unread_count !== 0
                            ? `<div class="chat-unread">${item.unread_count}</div>`
                            : '<div class="chat-unread__0"></div>'
                        }
                    </div>
                    <div class='icon'>
                    <img alt='icon' id=${
                      item.id
                    } class='delChat' src=${Trash} />
                    </div>

           </div>
            `
                       )
                       .join(" ")
                   : ""
               }
            </div>
        </div>
      `;
    return this.compile(temp, this.props);
  }
}
