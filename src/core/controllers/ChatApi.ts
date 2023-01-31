import Client from "../api/Api";
import { API_URL } from "../api/URLS";

import router from "../router";
import { store } from "../store";

interface INewChatData {
  title?: string;
}

class ChatApi {
  public newChat(data: INewChatData) {
    return Client.post(`${API_URL}/chats`, {
      data: JSON.stringify(data),
    })
      .then((response: any) => {
        if (response!.id) {
          router.go(`/chats/${response!.id}`);
          return response!.id;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public getChats() {
    console.log("ПОЛУЧАЕМ ЧАТЫ");
    return Client.get(`${API_URL}/chats`)
      .then((chatList: any) => {
        store.setState({
          chatList,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  deleteChat(chatId: any) {
    console.log("УДАЛЯЕМ ЧАТ");
    const data = {
      chatId: Object.keys(chatId).map(function (key) {
        return chatId[key];
      })[0],
    };
    return Client.delete(`${API_URL}/chats`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        router.go("/chats");
        alert("Чат удален");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getChatUsers(id: any) {
    console.log("ПОЛУЧАЕМ ЮЗЕРОВ");
    return Client.get(`${API_URL}/chats/${id}/users`)
      .then((chatUsers: any) => {
        store.setState({
          chatUsers,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  deleteChatUser(chatId: any, userId: any) {
    console.log("УДАЛЯЕМ ЮЗЕРОВ");
    const data = {
      users: [
        Object.keys(userId).map(function (key) {
          return userId[key];
        })[0],
      ],
      chatId: Object.keys(chatId).map(function (key) {
        return chatId[key];
      })[0],
    };
    return Client.delete(`${API_URL}/chats/users`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        alert("Пользователь удален из чата");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  addChatUser(chatId: any, userId: any) {
    console.log("ДОБАВЛЯЕМ ЮЗЕРОВ");
    const data = {
      users: [
        Object.keys(userId).map(function (key) {
          return userId[key];
        })[0],
      ],
      chatId: Object.keys(chatId).map(function (key) {
        return chatId[key];
      })[0],
    };
    return Client.put(`${API_URL}/chats/users`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        alert("Пользователь добавлен в чат");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  searchUsers(userLogin: any) {
    console.log("ИЩЕМ ЮЗЕРОВ");
    const data = {
      login: userLogin,
    };
    return Client.post(`${API_URL}/user/search`, JSON.stringify(data))
      .then(() => {
        alert("Пользователь удален из чата");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  getToken(chatId: any) {
    console.log(`ПОЛУЧАЕМ ТОКЕН ДЛЯ ЧАТА ${chatId}`);
    return Client.post(`${API_URL}/chats/token/${chatId}`)
      .then((response: any) => {
        console.log(`ТОКЕН ПОЛУЧЕН  : ${response!.token}`);
        return response!.token;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  public updateAvatar(data: FormData) {
    return Client.put(`${API_URL}/chats/avatar`, {
      data: data,
    })
      .then((avatar: any) => {
        alert("Аватар обновлен");
        store.setState({
          currentChat: avatar,
        });
      })
      .catch(() => alert("Что-то пошло не так, попробуйте позднее..."));
  }
}

export default new ChatApi();
