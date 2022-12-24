import Block from "../../core/block/Block";
import "./header.css";

export class Header extends Block {
  render() {
    const temp = `
        <a class="header <% this.className %>">
        <% this.text %>
       </a>
      `;
    return this.compile(temp, this.props);
  }
}
