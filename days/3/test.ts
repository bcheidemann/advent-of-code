import { assertEquals } from "assert";
import { describe, it } from "bdd";
import { Parser, run as runPart1 } from "./part_one.ts";
import { Rectangle } from "./rectangle.ts";

describe("Day 3", () => {
  describe("Rectangle", () => {
    type Case = {
      rect1: Rectangle;
      rect2: Rectangle;
      expected: boolean;
    };

    const testCases: Case[] = [
      {
        rect1: new Rectangle(0, 0, 1, 1),
        rect2: new Rectangle(1, 1, 1, 1),
        expected: false,
      },
      {
        rect1: new Rectangle(0, 0, 1, 1),
        rect2: new Rectangle(1, 0, 1, 1),
        expected: false,
      },
      {
        rect1: new Rectangle(0, 0, 1, 1),
        rect2: new Rectangle(0, 1, 1, 1),
        expected: false,
      },
      {
        rect1: new Rectangle(0, 0, 1, 1),
        rect2: new Rectangle(0, 0, 1, 1),
        expected: true,
      },
      {
        rect1: new Rectangle(0, 0, 1, 1),
        rect2: new Rectangle(0, 0, 2, 2),
        expected: true,
      },
      {
        rect1: new Rectangle(0, 0, 2, 2),
        rect2: new Rectangle(0, 0, 1, 1),
        expected: true,
      },
      {
        rect1: new Rectangle(0, 0, 2, 2),
        rect2: new Rectangle(1, 1, 1, 1),
        expected: true,
      },
      {
        rect1: new Rectangle(1, 1, 2, 2),
        rect2: new Rectangle(0, 0, 1, 1),
        expected: false,
      },
      {
        rect1: new Rectangle(1, 1, 2, 2),
        rect2: new Rectangle(0, 0, 2, 2),
        expected: true,
      },
      {
        rect1: new Rectangle(1, 1, 3, 3),
        rect2: new Rectangle(0, 0, 2, 2),
        expected: true,
      },
      {
        rect1: new Rectangle(1, 1, 4, 4),
        rect2: new Rectangle(2, 2, 1, 1),
        expected: true,
      },
      {
        rect1: new Rectangle(1, 1, 4, 4),
        rect2: new Rectangle(3, 3, 2, 2),
        expected: true,
      },
    ];

    for (const testCase of testCases) {
      it(`intersects: ${JSON.stringify(testCase)}`, () => {
        // Arrange
        const rect1 = testCase.rect1;
        const rect2 = testCase.rect2;

        // Act
        const result = rect1.intersects(rect2);

        // Assert
        assertEquals(result, testCase.expected);
      });
    }
  });

  describe("Parser", () => {
    it("Test Input", async () => {
      // Arrange
      const input = await Deno.readTextFile("./days/3/part_one_input_test.txt");
      const parser = new Parser(input);

      // Act
      const entities = parser.parse();

      // Assert
      assertEquals(entities.length, 16);
      assertEquals(entities, [
        {
          rect: new Rectangle(0, 0, 3, 1),
          type: "number",
          value: 467,
        },
        {
          rect: new Rectangle(5, 0, 3, 1),
          type: "number",
          value: 114,
        },
        {
          rect: new Rectangle(2, 0, 3, 3),
          type: "symbol",
          value: "*",
        },
        {
          rect: new Rectangle(2, 2, 2, 1),
          type: "number",
          value: 35,
        },
        {
          rect: new Rectangle(6, 2, 3, 1),
          type: "number",
          value: 633,
        },
        {
          rect: new Rectangle(5, 2, 3, 3),
          type: "symbol",
          value: "#",
        },
        {
          rect: new Rectangle(0, 4, 3, 1),
          type: "number",
          value: 617,
        },
        {
          rect: new Rectangle(2, 3, 3, 3),
          type: "symbol",
          value: "*",
        },
        {
          rect: new Rectangle(4, 4, 3, 3),
          type: "symbol",
          value: "+",
        },
        {
          rect: new Rectangle(7, 5, 2, 1),
          type: "number",
          value: 58,
        },
        {
          rect: new Rectangle(2, 6, 3, 1),
          type: "number",
          value: 592,
        },
        {
          rect: new Rectangle(6, 7, 3, 1),
          type: "number",
          value: 755,
        },
        {
          rect: new Rectangle(2, 7, 3, 3),
          type: "symbol",
          value: "$",
        },
        {
          rect: new Rectangle(4, 7, 3, 3),
          type: "symbol",
          value: "*",
        },
        {
          rect: new Rectangle(1, 9, 3, 1),
          type: "number",
          value: 664,
        },
        {
          rect: new Rectangle(5, 9, 3, 1),
          type: "number",
          value: 598,
        },
      ]);
    });

    it("Regression 1", () => {
      // Arrange
      const input = ".388\n....";
      const parser = new Parser(input);

      // Act
      const entities = parser.parse();

      // Assert
      assertEquals(entities.length, 1);
      assertEquals(entities, [
        {
          rect: new Rectangle(1, 0, 3, 1),
          type: "number",
          value: 388,
        },
      ]);
    });
  });

  it("Part 1", async () => {
    // Arrange
    const input = await Deno.readTextFile("./days/3/part_one_input_test.txt");

    // Act
    const result = runPart1(input);

    // Assert
    assertEquals(result, "4361");
  });
});
