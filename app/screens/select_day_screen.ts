import { Screen } from "./screen.ts";
import { Box, Text } from "tui/components";
import { crayon } from "crayon";
import { Computed, Signal } from "tui";
import { KeyPressEvent } from "tui/input_reader";
import { App } from "../app.ts";
import { SelectPartScreen } from "./select_part_screen.ts";
import { Day } from "../../types/domain.ts";

export type SelectDayScreenProps = {
  days: Day[];
};

class SelectDayScreenController {
  index: Signal<number>;

  constructor(
    private app: App,
    private props: SelectDayScreenProps,
  ) {
    this.index = new Signal(0);
  }

  onKeyPress = (key: KeyPressEvent) => {
    switch (key.key) {
      case "up":
        if (this.index.value === 0) return;
        this.index.value--;
        break;
      case "down":
        if (this.index.value === this.props.days.length - 1) return;
        this.index.value++;
        break;
      case "return":
        this.app.navigationContext.push(SelectPartScreen, {
          day: this.props.days[this.index.value],
        });
        break;
    }
  };
}

export class SelectDayScreen extends Screen<SelectDayScreenProps> {
  private controller: SelectDayScreenController;

  constructor(
    app: App,
    props: SelectDayScreenProps,
  ) {
    super(app, props);
    this.controller = new SelectDayScreenController(app, props);
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
        text: "Select a day to run:",
        theme: {
          base: bgColor,
        },
        rectangle: {
          column: 1,
          row: 1,
        },
        zIndex: this.app.navigationContext.depth,
      }),
    );

    this.props.days.forEach((day, index) => {
      const text = new Computed(() => {
        if (index === this.controller.index.value) {
          return `> ${day.name} <`;
        }
        return `  ${day.name}`;
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
            row: 3 + index,
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
