import Block from "../block/Block";
import Router from "./Router"

describe('тест роутинга', () => {
    const router = new Router('#app');
  

    class Login<TProps extends {}> extends Block<TProps> {
    }
  
    class Chats<TProps extends {}> extends Block<TProps> {
    }
  
    class Error404<TProps extends {}> extends Block<TProps> {
    }
  
    let callbackCounter = 0;
  
    router
      .onRoute(() => {
        callbackCounter += 1;
      })
      .use('/login', Login)
      .use('/chats/:id', Chats)
      .use('*', Error404)
      .start();
  
    it('NAVIGATION', () => {
      router.go('/');
      router.go('/about');
      router.go('/messages/12');
      router.go('/efeverv');
      expect(router.history.length).toEqual(5);
  
      expect(callbackCounter).toEqual(5);
    });
  
    it('URL PARSER', () => {
      router.go('/chats/12');
      const { pathname } = router.getCurrentRoute() || {};
      expect(pathname).toEqual('/chats/:id');
    });
  });