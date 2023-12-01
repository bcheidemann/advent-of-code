import { App } from "./app/app.ts";
import { AppControls } from "./app/app_controls.ts";
import { Logger } from "./app/logger.ts";
import { SelectDayScreen } from "./app/screens/select_day_screen.ts";

if (import.meta.main) {
  new App(
    SelectDayScreen,
    {
      days: [
        {
          name: "Day 1",
          parts: [
            {
              name: "Part 1",
              run: () => "Hello, world!",
            },
            {
              name: "Part 2",
              run: () => "Hello, world!",
            },
          ],
        },
      ],
    },
    (app) => [
      new AppControls(app),
      new Logger(app),
    ],
  );
}
