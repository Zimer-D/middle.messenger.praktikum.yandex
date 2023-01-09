import Block from "../core/block/Block";

export default class MainPage extends Block {
  render() {
    const temp = `
    <main>
    <ul>
        <li>
            <a href="./login">Login page</a>
        </li>
        <li>
            <a href="./register">Register page</a>
        </li>
    <li> Error pages
        <ul>
            <li><a href="./404">404</a></li>
            <li><a href="./500">500</a></li>
        </ul>
    </li>
    <li>Profile
        <ul>
            <li>
                <a href="./profile">Profile page</a>
            </li>
            <li>
                <a href="./edit-profile">Edit profile</a>
            </li>
            <li>
                <a href="./change-password">Change password</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="./chat">Chat</a>
    </li>
</ul>
</main>
       `;
    return this.compile(temp, {});
  }
}
