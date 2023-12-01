import { Computed, TextRectangle } from "tui";
import { App } from "./app.ts";
import { Text } from "tui/components";
import { crayon } from "crayon";

export class AppControls {
  constructor(
    private app: App,
  ) {
    const rectangleLeft = new Computed<TextRectangle>(() => ({
      column: 0,
      row: this.app.tui.rectangle.value.height - 1,
    }));

    const leftText = new Computed<string>(() => {
      const text = "q - quit, enter - select, up/down - navigate, esc - back ";
      return text.padStart(this.app.tui.rectangle.value.width, " ");
    });

    new Text({
      parent: this.app.tui,
      text: leftText,
      theme: {
        base: crayon.bgRgb(100, 0, 0).italic,
      },
      rectangle: rectangleLeft,
      zIndex: Number.MAX_SAFE_INTEGER,
    });

    app.tui.on("keyPress", (key) => {
      switch (true) {
        case key.key === "q":
          app.tui.destroy();
          Deno.exit(0);
          break;
        case key.key === "escape":
          if (app.navigationContext.depth > 1) {
            app.navigationContext.pop();
          }
          break;
      }
    });
  }
}
