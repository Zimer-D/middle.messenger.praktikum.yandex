import Client from "../api/Api"
import URLS from "../api/URLS";
import router from "../router";
import { store } from "../store";

interface INewChatData {
    title?: string
}



class ChatApi {
    public newChat(data: INewChatData) {
      return Client
        .post(`${URLS.API_URL}/chats`, {
          data: JSON.stringify(data),
  
        })
        .then((response: any) => {
          if (response!.id) {
            router.go(`/chats/${response!.id}`, true);
            return response!.id;
          }
        })
        .catch((e) => {
            console.log(e);
        });
    }
  
    public getChats() {
      console.log('ПОЛУЧАЕМ ЧАТЫ');
      return Client
        .get(`${URLS.API_URL}/chats`)
        .then((chatList: any) => {
          store.setState({
            chatList,
          });
        })
        .catch((e) => {
            console.log(e);
        });
    }
    deleteChat(chatId) {
      console.log('УДАЛЯЕМ ЧАТ');
      const data = {
        "chatId": Object.keys(chatId).map(function(key){return chatId[key]})[0]
      }
      return Client
        .delete(`${URLS.API_URL}/chats`, {data:JSON.stringify(data)})
        .then(() => {
          alert('Чат удален')
        })
        .catch((e) => {
            console.log(e);
        });
    }

    getChatUsers(id) {
      console.log('ПОЛУЧАЕМ ЮЗЕРОВ');
      return Client
        .get(`${URLS.API_URL}/chats/${id}/users`)
        .then((chatUsers: any) => {
          store.setState({
            chatUsers,
          });
        })
        .catch((e) => {
            console.log(e);
        });
    }
    deleteChatUser(chatId, userId) {
      console.log('УДАЛЯЕМ ЮЗЕРОВ');
      const data = {
        "users": [
          Object.keys(userId).map(function(key){return userId[key]})[0]
        ],
        "chatId": Object.keys(chatId).map(function(key){return chatId[key]})[0]
      }
      return Client
        .delete(`${URLS.API_URL}/chats/users`, {data:JSON.stringify(data)})
        .then(() => {
          alert('Пользователь удален из чата')
        })
        .catch((e) => {
            console.log(e);
        });
    }
    addChatUser(chatId, userId) {
      console.log('ДОБАВЛЯЕМ ЮЗЕРОВ');
      const data = {
        "users": [
          Object.keys(userId).map(function(key){return userId[key]})[0]
        ],
        "chatId": Object.keys(chatId).map(function(key){return chatId[key]})[0]
      }
      console.log(32323, JSON.stringify(data))
      return Client
        .put(`${URLS.API_URL}/chats/users`, {data: JSON.stringify(data)})
        .then(() => {
          alert('Пользователь добавлен в чат')
        })
        .catch((e) => {
            console.log(e);
        });
    }
    searchUsers(userLogin) {
      console.log('ИЩЕМ ЮЗЕРОВ');
      const data = {
        "login": userLogin
      }
      return Client
        .post(`${URLS.API_URL}/user/search`, JSON.stringify(data))
        .then(() => {
          alert('Пользователь удален из чата')
        })
        .catch((e) => {
            console.log(e);
        });
    }
    getToken(chatId: number) {
      console.log(`ПОЛУЧАЕМ ТОКЕН ДЛЯ ЧАТА ${chatId}`);
      return Client
        .post(`${URLS.API_URL}/chats/token/${chatId}`)
        .then((response: any) => {
          console.log(`ТОКЕН ПОЛУЧЕН  : ${response!.token}`);
          return response!.token;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    public updateAvatar(chatId, data: FormData) {
      const form = {
        chatId: chatId,
        data: data
      }
      return Client
        .put(`${URLS.API_URL}/chats/avatar`, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
          data:form
  
        })
        .then((user: any) => {
          alert('Аватар обновлен');
          store.setState({
            currentUser: user,
          });
        })
        .catch(()=>alert('Что-то пошло не так, попробуйте позднее...'));
    }
  }
  
  export default new ChatApi();