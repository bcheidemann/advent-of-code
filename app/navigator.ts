import { App } from "./app.ts";
import { Screen } from "./screens/screen.ts";
import { ExtendsAbstract } from "../types/utility.ts";

export class NavigationContext {
  private stack = new Array<Screen<unknown>>();
  public get depth(): number {
    return this.stack.length;
  }

  constructor(private app: App<unknown>) {}

  public push<Props>(
    screen: ExtendsAbstract<typeof Screen<Props>>,
    props: Props,
  ): void {
    const currentScreen = this.stack.at(-1);
    if (currentScreen) {
      currentScreen.blur();
    }
    const screenInstance = new screen(this.app, props);
    this.stack.push(screenInstance);
    screenInstance.render();
    setTimeout(() => screenInstance.focus());
  }

  public pop(): void {
    const screen = this.stack.pop();
    if (screen) {
      screen.blur();
      screen.destroy();
    }
    setTimeout(() => this.stack.at(-1)?.focus());
  }
}
