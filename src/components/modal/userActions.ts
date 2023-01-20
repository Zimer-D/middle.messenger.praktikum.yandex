import Block from "../../core/block/Block";
import "./modal.css";
// @ts-expect-error
import Add from "../../../static/assets/add.png";
// @ts-expect-error
import XMark from "../../../static/assets/xmark.png";
import { TProps } from "../../../types/types";
export class UserActions extends Block<TProps> {
  render() {
    const temp = `
        <div  id='userActions'class="user-actions">
            <div class="itemToSend">
                <div class='icon'>
                <img alt='icon' src=${Add}/>
                </div>
                <div>
                    Добавить пользователя
                </div>
            </div>
            <div class="itemToSend">
                <div class='icon'>
                <img alt='icon' src=${XMark}/>
                </div>
            <div>
                Удалить пользователя
            </div>
    </div>
           `;
    return this.compile(temp, {});
  }
}
