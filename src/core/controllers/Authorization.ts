import { RecordItem } from "../../../types/types";
import URLS from "../api/URLS";
import router from "../router";
import Client from "../api/Api";
import { store } from "../store";

interface ILoginData {
  login: string;
  password: string;
}

declare interface IRegistrationData {
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  password?: string;
}

class AuthController {
  public signIn(data: ILoginData) {
    return Client.post(`${URLS.API_URL}/auth/signin`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        router.go("/chats");
      })
      .catch((e) =>
        alert("Что-то пошло не так, возможно неверный логин или пароль")
      );
  }

  public signUp(data: IRegistrationData) {
    return Client.post(`${URLS.API_URL}/auth/signup`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        router.go("/chats");
      })
      .catch(() => alert("Что-то поло не так, попробуйте позднее..."));
  }

  public signOut() {
    Client.post(`${URLS.API_URL}/auth/logout`)
      .then(() => {
        router.go("/login");
      })
      .catch(() => alert("Что-то поло не так, попробуйте позднее..."));
  }

  public checkAuth() {
    return Client.get(`${URLS.API_URL}/auth/user`)
      .then((response: any) => {
        const user = response;
        user.isLoading = false;
        store.setState({
          currentUser: user,
        });
        localStorage.setItem("userId", user.id);

        return true;
      })
      .catch(() => {
        localStorage.removeItem("userId");
        return false;
      });
  }
}

export default new AuthController();
