import { App } from "./app/app.ts";
import { AppControls } from "./app/app_controls.ts";
import { Logger } from "./app/logger.ts";
import { SelectDayScreen } from "./app/screens/select_day_screen.ts";
import { days } from "./days.ts";

if (import.meta.main) {
  new App(
    SelectDayScreen,
    { days },
    (app) => [
      new AppControls(app),
      new Logger(app),
    ],
  );
}
