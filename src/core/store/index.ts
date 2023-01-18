import Store from "./store";

export const store = new Store({
  currentUser: {
    avatar: "",
    first_name: "",
    second_name: "",
    email: "",
    login: "",
    phone: "",
    isLoading: true,
  },
  chatId: null,
  token: null,
  chatList: [],
  currentChat: {},
  currentChatId: null,
  messages: [],
  loginPage: {
    isLoading: false,
  },
  registerPage: {
    isLoading: false,
  },
  profileEditPage: {
    isLoading: false,
  },
  changePasswordPage: {
    isLoading: false,
  },
  createNewChat: {
    title: "",
    isOpened: false,
    isLoading: false,
  },
});
