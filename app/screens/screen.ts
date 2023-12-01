import { NavigationContext } from "../navigator.ts";
import { App } from "../app.ts";
import { Component } from "tui";

export type ScreenProps<T> = {
  navigationContext: NavigationContext;
} & T;

export abstract class Screen<Props> {
  private components = new Array<Component>();

  constructor(
    protected app: App<unknown>,
    protected props: Props,
  ) {}

  abstract render(): void;
  abstract focus(): void;
  abstract blur(): void;

  protected addComponent(component: Component) {
    this.components.push(component);
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
    this.components = [];
  }
}
