import Block from "../../core/block/Block";
import "./buttons.css";

export class Link extends Block {
  render() {
    const temp = `
        <a class="link" href='<% this.url %>'>
        <% this.text %>
       </a>
      `;
    return this.compile(temp, this.props);
  }
}
