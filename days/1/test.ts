import { assertEquals } from "assert";
import { describe, it } from "bdd";
import { run as runPart1 } from "./part_one.ts";
import { run as runPart2 } from "./part_two.ts";

describe("Day 1", () => {
  it("Part 1", async () => {
    // Arrange
    const input = await Deno.readTextFile("./days/1/part_one_input_test.txt");

    // Act
    const result = runPart1(input);

    // Assert
    assertEquals(result, "142");
  });

  it("Part 2", async () => {
    // Arrange
    const input = await Deno.readTextFile("./days/1/part_two_input_test.txt");

    // Act
    const result = runPart2(input);

    // Assert
    assertEquals(result, "281");
  });
});
