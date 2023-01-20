import { RecordItem } from "../../../types/types";
import deepClone from "../../utils/Clone";
import isEqual from "../../utils/Equal";
import merge from "../../utils/Merge";
import EventBus from "../eventBus/EventBus";

class Store {
  private _state: RecordItem;

  private _oldState: RecordItem;

  private _subscribers: Function[];

  private eventBus: () => EventBus;

  static EVENTS = {
    INIT: "@@init",
    STORE_DM: "@@store-did-mount",
    STORE_DU: "@@store-did-update",
    USE: "@@use",
  };

  constructor(initialState: RecordItem = {}) {
    const eventBus = new EventBus();
    this._state = this._makeStateProxy(initialState);
    this._oldState = { ...this._state };
    this._subscribers = [];
    this.eventBus = () => eventBus;

    eventBus.on(Store.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Store.EVENTS.STORE_DM, this._storeDidMount.bind(this));
    eventBus.on(Store.EVENTS.STORE_DU, this._storeDidUpdate.bind(this));
    eventBus.on(Store.EVENTS.USE, this._use.bind(this));

    eventBus.emit(Store.EVENTS.INIT);
  }

  private _init() {
    this.eventBus().emit(Store.EVENTS.STORE_DM);
  }

  private _storeDidMount() {
    this.storeDidMount();
  }

  public storeDidMount() {}

  private _storeDidUpdate(oldState: RecordItem, newState: RecordItem) {
    const response = this.storeDidUpdate(oldState, newState);
    if (response) {
      this.eventBus().emit(Store.EVENTS.USE);
    }
  }

  public storeDidUpdate(oldState: RecordItem = {}, newState: RecordItem = {}) {
    return !isEqual(oldState, newState);
  }

  private _use() {
    this._subscribers.forEach((subscriber) => {
      subscriber(this._state);
    });
  }

  public subscribe(subscriber: (state: RecordItem) => void) {
    this._subscribers.push(subscriber);
    subscriber(this._state);
  }

  public setState(newState: RecordItem) {
    if (!newState) {
      return;
    }
    const merged = merge(deepClone(this._state), newState);
    Object.assign(this._state, merged);
  }

  public getState() {
    return this._state;
  }

  private _makeStateProxy(state: RecordItem) {
    const self = this;
    return new Proxy(state, {
      set: (target: RecordItem, item: string, value: unknown) => {
        const t = target;
        t[item] = value;
        this.eventBus().emit(Store.EVENTS.STORE_DU, self._oldState, t);
        self._oldState = { ...t };
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }
}

export default Store;
