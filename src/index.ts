import { routes } from "./utils/Router";


const app = <HTMLElement>document.getElementById('app');
const content = routes[document.location.pathname]
  ? routes[document.location.pathname]
  : routes['/404'];

app.append(content().render());
window.onload = () => (app.ariaBusy = 'false');