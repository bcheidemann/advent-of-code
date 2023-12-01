import { Text } from "tui/components";
import { Computed, Signal, TextRectangle } from "tui";
import { crayon } from "crayon";
import { App } from "./app.ts";

type LogLine = string;

export class Logger {
  private debugLines = new Signal(Array<LogLine>(15).fill(""));
  private cancelClearAll: () => void = () => {};

  constructor(
    private app: App,
  ) {
    for (let i = 0; i < this.debugLines.peek().length; i++) {
      const text = new Computed<string>(() => {
        const text = this.debugLines.value.at(-i) || "";
        if (text == "") {
          return text;
        }
        return text.padEnd(this.app.tui.rectangle.value.width, " ");
      });
      const rectangle = new Computed<TextRectangle>(() => ({
        column: 0,
        row: this.app.tui.rectangle.value.height - 1 - i,
      }));
      new Text({
        parent: this.app.tui,
        text: text,
        theme: {
          base: crayon.bgRgb(20, 0, 100),
        },
        rectangle,
        zIndex: Number.MAX_SAFE_INTEGER,
      });
    }
  }

  public log(line: string) {
    this.cancelClearAll();
    const newDebugLines = Array.from(this.debugLines.peek());
    newDebugLines.push(line);
    this.debugLines.value = newDebugLines;
    this.scheduleClearAll();
  }

  private scheduleClearAll() {
    const timeout = setTimeout(() => {
      this.debugLines.value = Array<LogLine>(15).fill("");
    }, 5000);
    this.cancelClearAll = () => clearTimeout(timeout);
  }
}
