import Block from "../../core/block/Block";
import "./modal.css";
// @ts-expect-error
import Image from "../../../static/assets/image.png";
// @ts-expect-error
import Document from "../../../static/assets/document.png";
// @ts-expect-error
import Location from "../../../static/assets/location.png";

export class FileToSend extends Block {
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
