import URLS from "../api/URLS";
import router from "../router";
import { store } from "../store";
import Client from "../api/Api";
import { PasswordUpdate, UserData } from "../../../types/types";

class ProfileApi {
  public updateInfo(data: UserData) {
    return Client.put(`${URLS.API_URL}/user/profile`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        alert("Данные обновлены");
        router.go("/profile");
      })
      .catch(() => alert("Что-то пошло не так, попробуйте позднее..."));
  }

  public updatePassword(data: PasswordUpdate) {
    return Client.put(`${URLS.API_URL}/user/password`, {
      data: JSON.stringify(data),
    })
      .then(() => {
        alert("Пароль обновлен");
        router.go("/profile");
      })
      .catch(() => alert("Что-то пошло не так, попробуйте позднее..."));
  }

  public updateAvatar(data: FormData) {
    return Client.put(`${URLS.API_URL}/user/profile/avatar`, {
      data,
    })
      .then((user: any) => {
        alert("Аватар обновлен");
        store.setState({
          currentUser: user,
        });
      })
      .catch(() => alert("Что-то пошло не так, попробуйте позднее..."));
  }
}

export default new ProfileApi();
