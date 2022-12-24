import Block from "../../core/block/Block";
import "./input.css";

type FileInputProps = {
  type: string;
  value: string;
};

//   type ComponentProps = ButtonProps & {
//     events: {
//       click: () => void;
//     };
//   };

export class FileInput extends Block {
  constructor(props: FileInputProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <input class="fileInput" 
            type={{type}} 
            value={{value}} 
        >
      `;
  }
}

export default FileInput;
