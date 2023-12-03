import { assertEquals } from "assert";
import { describe, it } from "bdd";
import { parseLine } from "./common.ts";
import { run as runPart1 } from "./part_one.ts";
import { run as runPart2 } from "./part_two.ts";

describe("Day 2", () => {
  it("parseLine", () => {
    // Arrange
    const line =
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red";

    // Act
    const result = parseLine(line);

    // Assert
    assertEquals(result, {
      id: 3,
      rounds: [
        {
          cubes: [
            { color: "green", count: 8 },
            { color: "blue", count: 6 },
            { color: "red", count: 20 },
          ],
        },
        {
          cubes: [
            { color: "blue", count: 5 },
            { color: "red", count: 4 },
            { color: "green", count: 13 },
          ],
        },
        {
          cubes: [
            { color: "green", count: 5 },
            { color: "red", count: 1 },
          ],
        },
      ],
    });
  });

  it("Part 1", async () => {
    // Arrange
    const input = await Deno.readTextFile("./days/2/part_one_input_test.txt");

    // Act
    const result = runPart1(input);

    // Assert
    assertEquals(result, "8");
  });

  it("Part 2", async () => {
    // Arrange
    const input = await Deno.readTextFile("./days/2/part_two_input_test.txt");

    // Act
    const result = runPart2(input);

    // Assert
    assertEquals(result, "2286");
  });
});
