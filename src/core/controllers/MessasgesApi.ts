
import { API_WS_URL } from "../api/URLS";
import { store } from "../store";


class MessageApi {
  private _ws: WebSocket;

  private _userId: number;

  private _chatId: number;

  private _token: string;

  private _ping: any;

  constructor() {
    this._onOpen = this._onOpen.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._onError = this._onError.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  private _addEvents() {
    this._ws.addEventListener("open", this._onOpen);
    this._ws.addEventListener("message", this._onMessage);
    this._ws.addEventListener("error", this._onError);
    this._ws.addEventListener("close", this._onClose);
  }

  private _removeEvents() {
    this._ws.removeEventListener("open", this._onOpen);
    this._ws.removeEventListener("message", this._onMessage);
    this._ws.removeEventListener("error", this._onError);
    this._ws.removeEventListener("close", this._onClose);
  }

  private _onOpen() {
    this.getMessages({ offset: 0 });
    this._ping = setInterval(() => {
      this._ws.send("");
    }, 15000);
  }

  private _onMessage(response: MessageEvent) {
    let data ;
    if(response) {
      try {
         data = JSON.parse(response.data);
      } catch(e) {
          alert('Что-nо пошло не так');
          console.log(e) 
      }
    }
    if (Array.isArray(data)) {
      if (!data.length) {
        store.setState({ messages: [] });
      } else {
        store.setState({
          messages: data.reverse(),
        });
      }
    } else if (typeof data === "object" && data.type === "message") {
      const messages = [...store.getState().messages, data];
      store.setState({ messages });
    }
  }

  private _onError(event: any) {
    console.log("ОШИБКА", event.message);
  }

  private _onClose(event: CloseEventInit) {
    this._removeEvents();
    if (event.wasClean) {
      alert("Соединение прервано");
    } else {
      alert("Соединение прервано");
    }

    if (event.code === 1006) {
      this._reconnect();
    }
  }

  private _reconnect() {
    this.connect({
      userId: this._userId,
      chatId: this._chatId,
      token: this._token,
    });
  }

  public connect(options: any) {
    console.log("ПОДКЛЮЧАЕМ WS");
    this._userId = options.userId;
    this._chatId = options.chatId;
    this._token = options.token;
    this._ws = new WebSocket(
      `${API_WS_URL}/chats/${options.userId}/${options.chatId}/${options.token}`
    );
    this._addEvents();
  }

  public getMessages(options: any) {
    this._ws.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: "get old",
      })
    );
  }

  public closeConnection() {
    clearInterval(this._ping);
    if (this._ws) {
      this._ws.close();
      this._removeEvents();
    }
  }

  public sendMessage(data: any) {
    if (data.message) {
      this._ws.send(
        JSON.stringify({
          content: data.message,
          type: "message",
        })
      );
    }
  }
}

export default new MessageApi();
