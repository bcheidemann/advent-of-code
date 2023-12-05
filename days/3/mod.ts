import { Day } from "../../types/domain.ts";
import { day3Part1 } from "./part_one.ts";
import { day3Part2 } from "./part_two.ts";

export const day3: Day = {
  name: "Day 3",
  parts: [
    {
      name: "Part 1",
      run: day3Part1,
    },
    {
      name: "Part 2",
      run: day3Part2,
    },
  ],
};
