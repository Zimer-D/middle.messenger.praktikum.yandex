import Block from "../../core/block/Block";
import "./icons.css";

type IconProps = {
  style: string;
  name: string;
};

//   type ComponentProps = ButtonProps & {
//     events: {
//       click: () => void;
//     };
//   };

export class Icon extends Block {
  constructor(props: IconProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class="iconWrapper">
            <a class="icon" href="/">
                <img alt="arrow" style={{style}} src={{ name }} />
            </a>
        </div>
      `;
  }
}
export default Icon;
