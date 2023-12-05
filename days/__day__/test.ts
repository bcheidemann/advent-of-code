import { assertEquals } from "assert";
import { describe, it } from "bdd";
import { run as runPart1 } from "./part_one.ts";
import { run as runPart2 } from "./part_two.ts";

describe("Day __day__", () => {
  it("Part 1", async () => {
    // Arrange
    const input = await Deno.readTextFile(
      "./days/__day__/part_one_input_test.txt",
    );

    // Act
    const result = runPart1(input);

    // Assert
    assertEquals(result, "NOT IMPLEMENTED");
  });

  it("Part 2", async () => {
    // Arrange
    const input = await Deno.readTextFile(
      "./days/__day__/part_two_input_test.txt",
    );

    // Act
    const result = runPart2(input);

    // Assert
    assertEquals(result, "NOT IMPLEMENTED");
  });
});
