import { crayon } from "crayon";
import {
  handleInput,
  handleKeyboardControls,
  handleMouseControls,
  Tui,
} from "tui";
import { NavigationContext } from "./navigator.ts";
import { Screen } from "./screens/screen.ts";
import { Constructor, ExtendsAbstract } from "../types/utility.ts";

export class App<Props = unknown> {
  public tui: Tui;
  public navigationContext: NavigationContext;
  // deno-lint-ignore no-explicit-any
  private services: Map<Constructor, any>;

  public get<T>(service: Constructor<T>): T {
    return this.services.get(service);
  }

  public set<T>(instance: T): void {
    // deno-lint-ignore no-explicit-any
    this.services.set((instance as any).constructor, instance);
  }

  constructor(
    initialScreen: ExtendsAbstract<typeof Screen<Props>>,
    initialScreenProps: Props,
    getServices?: (app: App) => unknown[],
  ) {
    this.tui = new Tui({
      style: crayon.bgBlack, // Make background black
      refreshRate: 1000 / 60, // Run in 60FPS
    });

    handleInput(this.tui);
    handleMouseControls(this.tui);
    handleKeyboardControls(this.tui);

    this.tui.dispatch(); // Close Tui on CTRL+C
    this.tui.run();

    this.services = new Map((getServices?.(this) ?? []).map((service) => [
      // deno-lint-ignore no-explicit-any
      (service as any).constructor as Constructor,
      service,
    ]));

    this.navigationContext = new NavigationContext(this);
    this.navigationContext.push(initialScreen, initialScreenProps);
  }
}
