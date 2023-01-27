import { TProps } from "../../../types/types";
import { Button } from "../../components/buttons/button";
import { Header } from "../../components/header/header";
import Block from "../../core/block/Block";
import "./modal.css";

export class Modal extends Block<TProps> {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }

  render() {
    const header = new Header({
      text: this.props.text,
    });
    const button = new Button({
      text: this.props.buttonText,
      type: "submit",
    });
    this.children.button = button;
    this.children.header = header;
    const ctx = this.children;
    const temp = `
    <main> 
        <div class="modal-wrapper">
            <div class="modal">
                <% this.header %>
                <form id='upload'>
                    <input type='<% this.type %>' class="fileInput" name='upload'>
                    <% this.button %>
                </form>
            </div>
        </div>
    </main> 
           `;
    return this.compile(temp, ctx);
  }
}
