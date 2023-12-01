import { Screen } from "./screen.ts";
import { Box, Text } from "tui/components";
import { crayon } from "crayon";
import { Computed, Signal } from "tui";
import { KeyPressEvent } from "tui/input_reader";
import { App } from "../app.ts";
import { Day } from "../../types/domain.ts";
import { Logger } from "../logger.ts";

export type SelectPartScreenProps = {
  day: Day;
};

class SelectPartScreenController {
  index: Signal<number>;

  constructor(
    private app: App,
    private props: SelectPartScreenProps,
  ) {
    this.index = new Signal(0);
  }

  onKeyPress = (key: KeyPressEvent) => {
    if (this.props.day.parts.length === 0) return;

    switch (key.key) {
      case "up":
        if (this.index.value === 0) return;
        this.index.value--;
        break;
      case "down":
        if (this.index.value === this.props.day.parts.length - 1) return;
        this.index.value++;
        break;
      case "return":
        this.runSelectedPart();
        break;
    }
  };

  runSelectedPart() {
    const part = this.props.day.parts[this.index.peek()];
    this.app.get(Logger)!.log(
      `Running ${this.props.day.name} / ${part.name}...`,
    );
    this.app.get(Logger)!.log(
      `RESULT: ${part.run()}`,
    );
  }
}

export class SelectPartScreen extends Screen<SelectPartScreenProps> {
  private controller: SelectPartScreenController;

  constructor(
    app: App,
    props: SelectPartScreenProps,
  ) {
    super(app, props);
    this.controller = new SelectPartScreenController(app, props);
  }

  render(): void {
    const bgColor = crayon.bgHex("#002010");

    this.addComponent(
      new Box({
        parent: this.app.tui,
        theme: {
          base: bgColor,
        },
        rectangle: this.app.tui.rectangle,
        zIndex: this.app.navigationContext.depth,
      }),
    );

    this.addComponent(
      new Text({
        parent: this.app.tui,
        text: this.props.day.name,
        theme: {
          base: bgColor.bold.underline,
        },
        rectangle: {
          column: 1,
          row: 1,
        },
        zIndex: this.app.navigationContext.depth,
      }),
    );

    this.addComponent(
      new Text({
        parent: this.app.tui,
        text: "Select a part to run:",
        theme: {
          base: bgColor,
        },
        rectangle: {
          column: 1,
          row: 3,
        },
        zIndex: this.app.navigationContext.depth,
      }),
    );

    if (this.props.day.parts.length === 0) {
      this.addComponent(
        new Text({
          parent: this.app.tui,
          text: "No parts available (press escape to go back)",
          theme: {
            base: bgColor,
          },
          rectangle: {
            column: 1,
            row: 5,
          },
          zIndex: this.app.navigationContext.depth,
        }),
      );
      return;
    }

    this.props.day.parts.forEach((part, index) => {
      const text = new Computed(() => {
        if (index === this.controller.index.value) {
          return `> ${part.name} <`;
        }
        return `  ${part.name}`;
      });
      this.addComponent(
        new Text({
          parent: this.app.tui,
          text,
          theme: {
            base: bgColor,
          },
          rectangle: {
            column: 1,
            row: 5 + index,
          },
          zIndex: this.app.navigationContext.depth,
        }),
      );
    });
  }

  focus(): void {
    this.app.tui.on("keyPress", this.controller.onKeyPress);
  }

  blur(): void {
    this.app.tui.off("keyPress", this.controller.onKeyPress);
  }
}
