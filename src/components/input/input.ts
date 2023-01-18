import { InputProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./input.css";

export class Input extends Block {
  render() {
    const temp = `<div class="input-group">
                        <input 
                        type="<% this.type %>" 
                        class="text-input"
                        value="<% this.value ? this.value : '' %>"
                        name="<% this.name %>"
                        >
                        <span class="highlight"></span>
                        <span class="bar" ></span>
                        <label class="input-label">
                            <% this.label %>
                        </label>
                            </div>
                            `;

    return this.compile(temp, this.props);
  }
}
