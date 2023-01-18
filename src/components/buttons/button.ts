import { ButtonProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./buttons.css";

export class Button extends Block {
  constructor({
    text, 
    type,
    id, 
    onClick = () => {},
} : ButtonProps) {
    super({
        text, type, id, events: { click: onClick },
    });
}
  render() {
    const temp = `
    <div class="buttonWrapper">
        <button 
        type='<% this.type %>' 
        class="button"
        disable='false'
        id=<% this.id %>
        >
        <% this.text %>
        </button>
     </div>
      `;
    return this.compile(temp, this.props);
  }
}
