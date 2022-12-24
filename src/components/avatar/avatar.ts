import Block from "../../core/block/Block";
import "./avatar.css";

type AvatarProps = {
  url: string;
};

//   type ComponentProps = ButtonProps & {
//     events: {
//       click: () => void;
//     };
//   };

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class="avatar">
            <img alt="avatar" class="avatarImage" src="../assets/avatar.png"/>
            <a href="{{url}}" class="img__description">Поменять аватар</a>
        </div>
      `;
  }
}
export default Avatar;
