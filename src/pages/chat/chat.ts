import { ChatArea } from "../../components/chatComponents/chatArea";
import { ChatList } from "../../components/chatComponents/chatList";
import Block from "../../core/block/Block";

export default class Chat extends Block {
  
    render() {
      const chatList = new ChatList(this.props.chats);
  
      const chatArea = new ChatArea(this.props.messages);

      this.children.chatList = chatList;
      this.children.chatArea = chatArea;
      const ctx = this.children;
      const temp = `
        <div class="chatt">
            <% this.chatList %>
            <% this.chatArea %>
         </div>  
        `;
      return this.compile(temp, ctx);
    }
  }