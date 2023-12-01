import { Screen } from "./screen.ts";
import { Box, Text } from "tui/components";
import { crayon } from "crayon";
import { Signal } from "tui";
import { KeyPressEvent } from "tui/input_reader";
import { App } from "../app.ts";

export type TestScreenProps = {
  initialText: string;
};

class TestScreenController {
  text: Signal<string>;

  constructor(
    private app: App,
    props: TestScreenProps,
  ) {
    this.text = new Signal(props.initialText);
  }

  onKeyPress = (key: KeyPressEvent) => {
    if (key.key === "q") {
      this.app.navigationContext.pop();
    } else if (key.key === "n") {
      this.app.navigationContext.push(TestScreen, {
        initialText: `Depth: ${this.app.navigationContext.depth + 1}`,
      });
    }
  };
}

export class TestScreen extends Screen<TestScreenProps> {
  private controller: TestScreenController;

  constructor(
    app: App,
    props: TestScreenProps,
  ) {
    super(app, props);
    this.controller = new TestScreenController(app, props);
  }

  render(): void {
    this.addComponent(
      new Box({
        parent: this.app.tui,
        theme: {
          base: crayon.bgCyan,
        },
        rectangle: this.app.tui.rectangle,
        zIndex: this.app.navigationContext.depth,
      }),
    );

    this.addComponent(
      new Text({
        parent: this.app.tui,
        text: this.controller.text,
        theme: {
          base: crayon.magenta,
        },
        rectangle: {
          column: 1,
          row: 1,
        },
        zIndex: this.app.navigationContext.depth,
      }),
    );
  }

  focus(): void {
    this.app.tui.on("keyPress", this.controller.onKeyPress);
  }

  blur(): void {
    this.app.tui.off("keyPress", this.controller.onKeyPress);
  }
}
