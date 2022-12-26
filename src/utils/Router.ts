import Error404 from "../pages/404/404";
import Error500 from "../pages/500/500";
import Login from "../pages/login/login";
import MainPage from "../pages/mainPage";
import Profile from "../pages/profile/profile";
import Register from "../pages/register/register";
import Chat from "../pages/chat/chat";
import ChangePassword from "../pages/profile/changePassword";
import { data } from "../mockData";
import EditProfile from "../pages/profile/profileEdit";
type Routes = {
    [key: string]: Function;
  };
  
  const routes: Routes = {
    '/': () => new MainPage(),
    '/login': () => new Login(data),
    '/registration': () => new Register(data),
    '/404': () => new Error404(data),
    '/500': () => new Error500(data),
    '/chat': () => new Chat(data),
    '/profile': () => new Profile(data),
    '/change-password':() => new ChangePassword(data),
    '/profile-edit':() => new EditProfile(data)
  };
  
  export { routes };
