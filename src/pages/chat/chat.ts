import { PageType } from "../../../types/types";
import { ChatArea } from "../../components/chatComponents/chatArea";
import { ChatList } from "../../components/chatComponents/chatList";
import Block from "../../core/block/Block";


export default class Chat extends Block<PageType> {

  render() {
    const chatList = new ChatList(this.props.chats);

    const chatArea = new ChatArea(this.props.messages);

    this.children.chatList = chatList;
    this.children.chatArea = chatArea;
    const ctx = this.children;
    const temp = `
    <main> 
        <div class="chatt">
            <% this.chatList %>
            <% this.chatArea %>
         </div>
    </main>       
        `;
    return this.compile(temp, ctx);
  }
}
