import { TProps } from '../../../types/types';
import Block from '../../core/block/Block';
import './chat.css';
// @ts-expect-error
import Avatar from "../../../static/assets/avatar.png";

export class ChatList extends Block {

    render() {
        const temp =`
        <div class="contactList">
        
            <div class="chatListHeader">
                <a href="./profile">
                    Профиль >
                </a>
                <input class="chatSearch" type="search" placeholder="Поиск..."/>
            </div>
            <div class="contact-list">
               ${this.props.items.map((item:TProps)=>(
               ` 
               <div class="chatListItem">
                    <div class="chat-avatar">
                        <img alt="avatar" src=${Avatar}/>
                    </div>
                    <div class="chat-1">
                        <div class="chat-name">${item.name}</div>
                        <div class="last-message">${item.message}</div>
                    </div>
                    <div class="chat-2">
                        <div class="chat-time">${item.timeLastMessage}</div>
                        ${item.unread !==0 ?`<div class="chat-unread">${item.unread}</div>`:'<div class="chat-unread__0"></div>'}
                    </div>
           </div>
            `
                )).join(' ')
               }
            </div>
        </div>
      `;
      return this.compile(temp, this.props);}}