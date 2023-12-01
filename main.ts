import { App } from "./app/app.ts";
import { AppControls } from "./app/app_controls.ts";
import { Logger } from "./app/logger.ts";
import { SelectDayScreen } from "./app/screens/select_day_screen.ts";
import { day1Part1 } from "./days/1/part_one.ts";
import { day1Part2 } from "./days/1/part_two.ts";

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
              run: day1Part1,
            },
            {
              name: "Part 2",
              run: day1Part2,
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
