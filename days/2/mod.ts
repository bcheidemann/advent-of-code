import { Day } from "../../types/domain.ts";
import { day2Part1 } from "./part_one.ts";
import { day2Part2 } from "./part_two.ts";

export const day2: Day = {
  name: "Day 2",
  parts: [
    {
      name: "Part 1",
      run: day2Part1,
    },
    {
      name: "Part 2",
      run: day2Part2,
    },
  ],
};
