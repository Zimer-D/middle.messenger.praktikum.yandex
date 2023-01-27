import { TProps } from "../../../types/types";
import Block from "../../core/block/Block";
import ChatApi from "../../core/controllers/ChatApi";
import { getFormData } from "../../utils/GetData";
import { Input } from "../input/input";
import { Button } from "../buttons/button";
// @ts-ignore
import Xmark from "../../../static/assets/xmark.png";
import "./modal.css";

export default class NewChatModal extends Block<TProps> {
  constructor(props: TProps) {
    const defaultValues = {
      isLoading: false,
      title: "",
    };

    const customEvents = [
      {
        selector: "#newChat",
        events: {
          submit: (e: any) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const formData = getFormData([...target]);
            this.removeChildrenListeners();
            this.handleSubmit(formData);
          },
        },
      },
      {
        selector: ".btn-close",
        events: {
          click: () => {
            this.setProps({ isOpened: false });
          },
        },
      },
    ];

    const propsAndChildren = { ...props, ...defaultValues };

    super(propsAndChildren, customEvents);
  }

  handleSubmit(formData:any) {
    this.setProps({ isLoading: true });
    ChatApi.newChat(formData).then(() => {
      this.setProps({ isLoading: false, isOpened: false, title: "" });
    });
  }

  render() {
    this.children.newChatInput = new Input({
      label: "Название",
      name: "title",
      type: "text",
      value: this.props.title,
    });

    this.children.button = new Button({
      text: "Создать",
      type: "submit",
    });

    let isOpenedClass;

    if (this.props.isOpened) {
      isOpenedClass = "modal-opened";
    } else {
      isOpenedClass = "";
    }

    const temp = `<div class="modal-wrapper ${isOpenedClass}">
                         <div class="modal">
                              <div class="modal__header">
                                  <h3>Создать новый чат</h3>
                                  <a class="btn btn-nav btn-close">
                                      <img src="${Xmark}" />
                                  </a>
                              </div>
                              <div class="modal__body">
                                  <form id="newChat" >
                                  
                                    <% this.newChatInput %>
                                    
                                    <div class="text-right">
                                        <% this.button %>
                                    </div>
                                  </form>
                              </div>
                         </div>
                    </div>`;
    return this.compile(temp, this.props);
  }
}
