import Block from "../block/Block";

export default function renderDOM(block: Block) {
  const app = document.querySelector("#app");

  app!.innerHTML = "";
  app!.appendChild(block.getContent()!);
}
