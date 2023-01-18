import Block from "../../core/block/Block";
import "./input.css";

export class Textarea extends Block {

  render() {
    const temp = `
                        <textarea
                        type="<% this.type %>" 
                        class="<% this.class %>" 
                        value="<% this.value ? this.value : '' %>"
                        name="<% this.name %>"
                        >
                            `;

    return this.compile(temp, this.props);
  }
}
