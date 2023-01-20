import Block from "../../core/block/Block";
import "./chat.css";
import { ChatAreaProps, TProps } from "../../../types/types";
import { FileToSend } from "../modal/fileToSend";
import { UserActions } from "../modal/userActions";
// @ts-expect-error
import PaperClip from "../../../static/assets/paperclip.png";
// @ts-expect-error
import more from "../../../static/assets/more.png";
// @ts-expect-error
import Checked from "../../../static/assets/checked.png";
// @ts-expect-error
import DoubleChecked from "../../../static/assets/doublechecked.png";
// @ts-expect-error
import ArrowRight from "../../../static/assets/arrowright.png";
// @ts-expect-error
import Avatar from "../../../static/assets/avatar.png";
// @ts-expect-error
import Edit from "../../../static/assets/edit.png";
import { store } from "../../core/store";
import ChatApi from "../../core/controllers/ChatApi";
import MessasgesApi from "../../core/controllers/MessasgesApi";
import { getFormData } from "../../utils/GetData";
import { Input } from "../input/input";
import { Textarea } from "../input/textarea";
import ChatUsersList from "../modal/chatUsersList";
import { RESOURCES_URL } from "../../core/api/URLS";
import router from "../../core/router";

function handelClick() {
  //@ts-ignore
  document.getElementById("input_avatar").click();
}
document.addEventListener('DOMContentLoaded', function() {
  const element = document.getElementById('messages');
  // element!.scrollTop = element!.scrollHeight;
  // let scroll_to_bottom = document.getElementById('scroll-to-bottom');
		element!.scrollIntoView(false)
}, false);
export class ChatArea extends Block<TProps> {
  constructor(props: TProps = {}) {
    const { pageId = null } = router.getParams();
    const defaultValues = {
      messageValue: "",
      currentUserId: localStorage.getItem("userId"),
      currentChat: store.getState().currentChat,
      isLoading: true,
    };

    const customEvents = [
      {
        selector: "#send_message",
        events: {
          submit: (e: Event) => {
            e.preventDefault();

            const target = e.target as HTMLFormElement;
            const formData = getFormData([...target]);
            this.removeChildrenListeners();
            this.handleSubmit(formData);
          },
        },
      },
      {
        selector: "#bottomModal",
        events: {
          click: () => {
            let q = document.getElementById("fileToSend");
            q?.style.display === "none"
              ? (q.style.display = "flex")
              : (q!.style.display = "none");
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
        selector: "#input_avatar",
        events: {
          change: (e: Event) => {
            const formData = new FormData();
            const { files } = <HTMLInputElement>e.target;
            if (!files?.length) {
              return;
            }
            const [file] = files;
            formData.append("avatar", file);
             formData.append("chatId", this.props.currentChat.id);
            ChatApi.updateAvatar( formData);
          },
        },
      },
      {
        selector: "#chatUsers",
        events: {
          click: () => {
            this.children.usersList.setProps({ isOpened: true });
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
        messages: state.messages,
        currentChat: state.currentChat,
      });
    });
  //   const updateScroll = () =>{
  //     const element = document.getElementById("messages");
  //     element!.scrollTop = element!.scrollHeight;
  // }
  }

  handleSubmit(formData: any) {
    MessasgesApi.sendMessage(formData);
    this.setProps({ messageValue: formData });
    ChatApi.getChats();
  }
  public scrollDown() {
    const dialogBody = document.getElementById('.chatArea');
        dialogBody!.scrollTop = dialogBody!.scrollHeight;
  }
  render() {
// console.log(33, this.props.currentChat)
// console.log(44, Object.keys(this.props.currentChat).length)
    const currentUser = this.props.currentUserId;
    this.children.messageInput = new Textarea({
      class: "message",
      placeholder: "Сообщение",
      name: "message",
      type: "text",
      errors: this.props.errors,
      value: this.props.messageValue,
      events: {
        blur: (e: any) => {
          this.setProps({ messageValue: e.target.value });
        },
      },
    });
    const fileToSend = new FileToSend();
    const userActions = new UserActions();
    this.children.fileToSend = fileToSend;
    this.children.userActions = userActions;
    !!this.props.currentChat&&Object.keys(this.props.currentChat).length!==0 ?
    this.children.usersList = new ChatUsersList(this.props.currentChat?.id):'';
    const temp = `
        <div class="chat-area">   
        <div  class="chatAreaHeader">
        
                <div class="chat-title">
                ${!!this.props.currentChat&&Object.keys(this.props.currentChat).length!==0?
                  `  <div class="chat-avatar">
                        <img src=${
                              !!this.props.currentChat.avatar
                                ? RESOURCES_URL + this.props.currentChat?.avatar
                                : Avatar
                            } alt="noavatar" />
                        <input type="file" name=" " id='input_avatar' style="opacity:0">
                        <div id="change_avatar" class="upload">
                        <img src=${Edit} alt="edit" style='height:22px' />
                        </div>
                        </div>`:''}
                        <% this.usersList %>
                        <div id='chatUsers' class='chatMainTitle'>
                            ${this.props.currentChat?.title || ""}
                        </div>
                </div>
          </div>
     <div id='messages' class='chatArea'>
          ${
            !!this.props.messages && !!this.props.messages.length
              ? this.props.messages
                  .map((item: TProps) =>
                    item.user_id == currentUser
                      ? ` <div class="outgoingMessage">
                        <div class="message-text">
                            ${item.content}
                        </div>
                          <div class="message-time">
                              ${new Date(item.time).toLocaleTimeString()}
                          </div>   
                    </div>`
                      : `<div class="incomingMessage">
                      <div class="message-text">${item.content}</div>
                      <div class="message-time">${new Date(
                        item.time
                      ).toLocaleTimeString()}</div>
                    </div>`
                  )
                  .join(" ")
              : '<div class="chooseChat">Выберите или создайте чат</div>'
          }
                </div>
            <div class="chatAreaFooter">
                <% this.fileToSend %>
                <div  id='bottomModal'  class='icon' >
                  <img src=${PaperClip} alt='icon'/>
                </div>
                  <form id='send_message' class='messageForm'>
                    <% this.messageInput %>
                      <button type='submit' class='icon' >
                          <img src=${ArrowRight} alt='icon'/>
                      </button>
                  </form>
            </div>
     </div>
      `;
    return this.compile(temp, this.props);
  }
}
