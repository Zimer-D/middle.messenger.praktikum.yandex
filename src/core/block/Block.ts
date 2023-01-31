import { Nullable, TProps, Values } from "../../../types/types";
import UUID from "../../utils/GenerateId";
import EventBus from "../eventBus/EventBus";
import Templator from "../templator/Templator";

export interface BlockConstructable<Props extends {}> {
  new (props: any): Block<Props>;
}
type Events = Values<typeof Block.EVENTS>;

class Block<Props extends {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  protected _element: Nullable<HTMLElement> = null;

  public id = UUID();

  public children: { [id: string]: Block<Props> } = {};

  public customEvents: any = [];

  protected eventBus: () => EventBus<Events>;

  public props: Props;

  constructor(propsAndChildren: {} = {}, customEvents: any[] = []) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    if (customEvents.length > 0) {
      this.customEvents = [...this.customEvents, ...customEvents];
    }

    const eventBus = new EventBus();
    //@ts-ignore
    this.props = this._makePropsProxy(props || ({} as Props));

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: TProps) {
    const children: { [id: string]: Block<Props> } = {};
    const props: TProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = this._createDocumentElement("div");
  }

  private _addEvents() {
    const { events = {} } = this.props as any;

    Object.keys(events).forEach((eventName) => {
      if (eventName === "blur" || eventName === "focus") {
        if (this.element!.querySelector("input")) {
          this.element!.querySelector("input")!.addEventListener(
            eventName,
            events[eventName]
          );
        }
        if (this.element!.querySelector("textarea")) {
          this.element!.querySelector("textarea")!.addEventListener(
            eventName,
            events[eventName]
          );
        }
      } else {
        this.element!.addEventListener(eventName, events[eventName]);
      }
    });

    this.customEvents.forEach((elem: any) => {
      Object.keys(elem.events).forEach((eventName) => {
        if (this.element) {
          if (this.element!.querySelectorAll(elem.selector).length > 0) {
            this.element!.querySelectorAll(elem.selector).forEach(
              (currentValue) => {
                currentValue.removeEventListener(
                  eventName,
                  elem.events[eventName],
                  true
                );
                if (!currentValue.getAttribute(`event-${eventName}`)) {
                  currentValue.addEventListener(
                    eventName,
                    elem.events[eventName]
                  );
                }
                currentValue.setAttribute(`event-${eventName}`, "true");
              }
            );
          }
        }
      });
    });
  }

  protected removeChildrenListeners() {
    Object.entries(this.children).forEach((elem) => {
      //@ts-ignore
      if (elem[1].props.events) {
        elem[1].setProps({ events: {} });
      }
    });
  }

  protected init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount() {}

  protected dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate() {
    return true;
  }

  public setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  protected compile(template: string, props: TProps) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = new Templator(template).compile(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent() as any);
      }
    });
    return fragment.content;
  }

  get element() {
    return this._element;
  }

  private _render(): any {
    const block = this.render();

    const newElement = block.firstElementChild as HTMLTemplateElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected render(): any {
    return document.createElement("div");
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: TProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    return element;
  }

  public show(force: boolean = false) {
    if (force) {
      this.getContent()!.classList.add("route-active");
    } else {
      if (this.getContent()) {
        this.getContent()!.classList.add("route-hidden");

        setTimeout(() => {
          this.getContent()!.classList.remove("route-hidden");
          this.getContent()!.classList.add("route-active");
        }, 200);
      }
    }
  }

  public hide() {
    this.getContent()!.classList.remove("route-active");
    this.getContent()!.classList.add("route-hidden");
  }

  public destroy() {
    if (this._element) {
      this._element.remove();
      this.onDestroy();
    }
  }

  public onDestroy() {}
}

export default Block;
