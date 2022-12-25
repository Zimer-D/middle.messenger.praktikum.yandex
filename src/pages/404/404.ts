import Block from "../../core/block/Block";

export default class Error404 extends Block {
  render() {
    const temp = `
    <main> 
    <div class='container'>
      <div class="errors">
          <h1>
              404
          </h1>
          <div>
          Не туда попали
          </div>
          <a href="./chat">
              Назад к чатам
          </a>
          </div>
      </div>
    </main> 
       `;
    return this.compile(temp, {});
  }
}
