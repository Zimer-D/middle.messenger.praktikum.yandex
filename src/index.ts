import Error404 from "./pages/404/404";
import Error500 from "./pages/500/500";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
import ChangePassword from "./pages/profile/changePassword";
import Profile from "./pages/profile/profile";
import EditProfile from "./pages/profile/profileEdit";
import Register from "./pages/register/register";
import "./styles/style.css";
import router from "./core/router";
import Authorization from "./core/controllers/Authorization";


router
  .setPublicRedirect("/chats")
  .setProtectedRedirect("/login")
  .onRoute(Authorization.checkAuth)
  .use("/", Login, "public")
  .use("/login", Login, "public")
  .use("/register", Register, "public")
  .use("/chats", Chat, "protected")
  .use("/chats/:id", Chat, "protected")
  .use("/profile", Profile, "protected")
  .use("/edit-profile", EditProfile, "protected")
  .use("/change-password", ChangePassword, "protected")
  .use("/500", Error500)
  .use("*", Error404)
  .start();
