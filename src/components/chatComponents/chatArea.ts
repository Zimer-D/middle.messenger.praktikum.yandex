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


document.addEventListener("DOMContentLoaded", () => {
  const div = document.getElementById("bottomModal");
  div?.addEventListener("click", handelClick);
});
document.addEventListener("DOMContentLoaded", () => {
  const div = document.getElementById("topModal");
  div?.addEventListener("click", handelClick2);
});

function handelClick() {
  let q = document.getElementById("fileToSend");
  q?.style.display === "none"
    ? (q.style.display = "flex")
    : (q!.style.display = "none");
}
function handelClick2() {
  let q = document.getElementById("userActions");
  q?.style.display === "none"
    ? (q.style.display = "flex")
    : (q!.style.display = "none");
}

export class ChatArea extends Block<ChatAreaProps> {
  constructor({
    messages
} : ChatAreaProps) {
    super({ messages});
}
  render() {
    const fileToSend = new FileToSend();
    const userActions = new UserActions();
    this.children.fileToSend = fileToSend;
    this.children.userActions = userActions;
    const temp = `
        <div class="chat-area">   
        <div  class="chatAreaHeader">
        <div class="chat-title">
                <div class="chat-avatar">
                <img src=${Avatar} alt="noavatar" />
                </div>
                <div>
                    ${this.props.name}
                </div>
        </div>
    <div class='icon'  id='topModal'>
            <img src=${more} alt='icon'/>
    <%this.userActions %>
    </div>
    </div>
     <div class='chatArea'>
     ${this.props.messages
       .map((item: TProps) =>
         item.user_id === 0
           ? ` <div class="outgoingMessage">
            <div class="message-text">
                ${item.text}
            </div>
    ${
      item.status === 1
        ? `<img src=${DoubleChecked} style='width:13px'/>`
        : `<img src=${Checked} style='width:13px'/>`
    }
    <div class="message-time">
        ${item.time}
    </div>   
</div>`
           : `<div class="incomingMessage">
    <div class="message-text">${item.text}</div>
    <div class="message-time">${item.time}</div>
</div>`
       )
       .join(" ")}
     <div class="chatAreaFooter">

<% this.fileToSend %>

     <div  id='bottomModal'  class='icon' >
       <img src=${PaperClip} alt='icon'/>
     </div>
     <input class="message" type="text" placeholder="??????????????????" />
     <div class='icon' >
        <img src=${ArrowRight} alt='icon'/>
     </div>
 </div>
 
     </div>
      `;
    return this.compile(temp, this.props);
  }
}
