import { TProps } from "../../../types/types";
import Block from "../../core/block/Block";

export default class Error500 extends Block<TProps> {
  render() {
    const temp = `
    <main>
    <div class='container'>
        <div class="errors">
          <h1>
                500
          </h1>
          <div>
            Уже фиксим...
          </div>
          <a href="./chats">
                Назад к чатам
          </a>
        </div>
      </div>
      </main> 
       `;
    return this.compile(temp, {});
  }
}
