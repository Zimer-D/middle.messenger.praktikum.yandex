import { TProps } from "../../../types/types";
import Block from "../block/Block";

export default function renderDOM(block: Block<TProps>) {
  const app = document.querySelector("#app");

  app!.innerHTML = "";
  app!.appendChild(block.getContent()!);
}
