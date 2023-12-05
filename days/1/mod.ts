import { Day } from "../../types/domain.ts";
import { day1Part1 } from "./part_one.ts";
import { day1Part2 } from "./part_two.ts";

export const day1: Day = {
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
};
