import { LinkProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./buttons.css";

export class Link extends Block {
  constructor({
    text,
    url
} : LinkProps) {
    super({ text, url});
}
  render() {
    const temp = `
        <a class="link" href='<% this.url %>'>
        <% this.text %>
       </a>
      `;
    return this.compile(temp, this.props);
  }
}
