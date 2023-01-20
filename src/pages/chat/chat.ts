import { PageType, TProps } from "../../../types/types";
import { ChatArea } from "../../components/chatComponents/chatArea";
import { ChatList } from "../../components/chatComponents/chatList";
import Block from "../../core/block/Block";
import ChatApi from "../../core/controllers/ChatApi";
import MessasgesApi from "../../core/controllers/MessasgesApi";
import router from "../../core/router";
import { store } from "../../core/store";

export default class Chat extends Block {
  protected currentChatId: number | null | string;

  constructor(props: TProps) {
    const { id = null } = router.getParams();
    const propsAndChildren = { ...props, currentChatId: id };

    super(propsAndChildren);
    this.requestChat(id);
  }

  requestMessages(token: string, chatId: number) {
    const userId =
      store.getState().currentUser.id ?? localStorage.getItem("userId");

    MessasgesApi.connect({
      userId,
      chatId,
      token,
    });
  }

  requestChat(chatId: number | null) {
    if (!chatId) {
      return;
    }

    ChatApi.getToken(chatId).then((token) => {
      if (token) {
        this.requestMessages(token, chatId);
      }
    });
  }
  render() {
    const chatList = new ChatList({ currentChatId: this.props.currentChatId });

    const chatArea = new ChatArea({ currentChatId: this.props.currentChatId });

    this.children.chatList = chatList;
    this.children.chatArea = chatArea;
    const temp = `
    <main> 
        <div class="chatt">
            <% this.chatList %>
            <% this.chatArea %>
         </div>
    </main>       
        `;
    return this.compile(temp, this.props);
  }
}
