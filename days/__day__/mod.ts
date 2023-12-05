import { Day } from "../../types/domain.ts";
import { day__day__Part1 } from "./part_one.ts";
import { day__day__Part2 } from "./part_two.ts";

export const day__day__: Day = {
  name: "Day __day__",
  parts: [
    {
      name: "Part 1",
      run: day__day__Part1,
    },
    {
      name: "Part 2",
      run: day__day__Part2,
    },
  ],
};
