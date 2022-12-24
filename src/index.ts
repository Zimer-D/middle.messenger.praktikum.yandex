// import Messages from './pages/messages/Messages';
// import MessagesEmpty from './pages/messages-empty/MessagesEmpty';
// import Login from './pages/login/Login';
// import Registration from './pages/registration/Registration';
// import Account from './pages/account/Account';
// import AccountEdit from './pages/account-edit/AccountEdit';
// import PasswordEdit from './pages/password-edit/PasswordEdit';
// import Error404 from './pages/404/Error404';
// import Error500 from './pages/500/Error500';
import render from './core/renderDOM/RenderDOM';
import Error404 from './pages/404/404';
import Error500 from './pages/500/500';
import Chat from './pages/chat/chat';
import Login from './pages/login/login';
import ChangePassword from './pages/profile/changePassword';
import Profile from './pages/profile/profile';
import EditProfile from './pages/profile/profileEdit';
import Register from './pages/register/register';

// DATA
import { data } from './mockData';

// STYLES
import './styles/style.css';
import MainPage from './pages/mainPage';

// ROUTER
const path: string = document.location.pathname;
let app: any = {};

switch (path) {
  case '/login':
    app = new Login(data);
    break;
  case '/register':
    app = new Register(data);
    break;
  case '/profile':
    app = new Profile(data);
    break;
  case '/edit-profile':
    app = new EditProfile(data);
    break;
  case '/change-password':
    app = new ChangePassword(data);
    break;
  case '/chat':
    app = new Chat(data);
    break;
  case '/':
    app = new MainPage(data);
    break;
  case '/500':
    app = new Error500(data);
    break;
case '/404':
    app = new Error404(data);
        break;
  default:
    app = new Error404(data);;
}

render(app);