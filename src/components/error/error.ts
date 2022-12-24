import Block from "../../core/block/Block";

type ErrorProps = {
  title: string;
  errorText: string;
  linkText: string;
};

//   type ComponentProps = ButtonProps & {
//     events: {
//       click: () => void;
//     };
//   };

export class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <h1>
            {{title}}
        </h1>
        <div>
            {{errorText}}
        </div>
        <a href="./chat">
            {{linkText}}
        </a>
      `;
  }
}
export default Error;
