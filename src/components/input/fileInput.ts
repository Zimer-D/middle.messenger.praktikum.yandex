import { FileInputProps } from "../../../types/types";
import Block from "../../core/block/Block";
import "./input.css";

export class FileInput extends Block<FileInputProps> {
  constructor({
    type, 
    value,
} : FileInputProps) {
    super({ type, value});
}

  render() {
    const temp =`
        <input class="fileInput" 
            type='<% this.type %>'
            value=<% this.value %> 
        >
      `;
      return this.compile(temp, this.props);
  }
}

export default FileInput;
