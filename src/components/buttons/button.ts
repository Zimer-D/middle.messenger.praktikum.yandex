import Block from "../../core/block/Block";
import "./buttons.css";

export class Button extends Block {
  render() {
    const temp = `
    <div class="buttonWrapper">
        <button 
        type='<% this.type %>' 
        class="button"
        disable='false'
        >
        <% this.text %>
        </button>
     </div>
      `;
    return this.compile(temp, this.props);
  }
}
