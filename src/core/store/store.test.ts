import Store  from './Store';

describe('score/Store', () => {
    it('установка состояния', () => {
      const store = new Store({});
  
      store.setState({ userId: 123 });
  
      expect(store.getState()).toEqual({ userId: 123 });
    });
  });