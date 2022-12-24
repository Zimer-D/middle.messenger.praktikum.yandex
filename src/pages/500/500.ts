import Block from "../../core/block/Block";

export default class Error500 extends Block {
  render() {
    const temp = `
    <div class='container'>
        <div class="errors">
          <h1>
                500
          </h1>
          <div>
            Уже фиксим...
          </div>
          <a href="./chat">
                Назад к чатам
          </a>
        </div>
      </div>
       `;
    return this.compile(temp, {});
  }
}
