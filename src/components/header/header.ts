import { HeaderProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./header.css";

export class Header extends Block {
  constructor({
    text, 
    className, 
} : HeaderProps) {
    super({
        text, className,
    });
}
  render() {
    const temp = `
        <a class="header <% this.className %>">
        <% this.text %>
       </a>
      `;
    return this.compile(temp, this.props);
  }
}
