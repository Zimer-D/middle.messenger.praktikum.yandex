import Block from "../../core/block/Block";
import "./modal.css";
// @ts-ignore
import Image from "../../../static/assets/image.png";
// @ts-ignore
import Document from "../../../static/assets/document.png";
// @ts-ignore
import Location from "../../../static/assets/location.png";
import { TProps } from "../../../types/types";

export class FileToSend extends Block<TProps> {
  render() {
    const temp = `
        <div id='fileToSend' class="fileToSend">
            <div class="itemToSend">
                    <div class='icon'>
                    <img alt='icon'  src=${Image}/>
                    </div>
                    <div>
                        Фото или видео
                    </div>
                </div>
                <div class="itemToSend">
                    <div class='icon'>
                        <img alt='icon' src=${Document}/>
                    </div>
                    <div>
                        Файл
                    </div>
                </div>
                <div class="itemToSend">
                    <div class='icon'>
                    <img alt='icon'  src=${Location}/>
                    </div>
                    <div>
                        Локация
                    </div>
                </div>
            </div>
           `;
    return this.compile(temp, {});
  }
}
