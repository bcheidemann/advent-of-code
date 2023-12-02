import { Color, parseLine } from "./common.ts";

export function run(input: string): string {
  const maxByColor: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return input
    .split("\n")
    .map(parseLine)
    .filter((game) => {
      return game.rounds.every((round) => {
        return round.cubes.every((cube) => {
          return cube.count <= maxByColor[cube.color];
        });
      });
    })
    .map((game) => game.id)
    .reduce((acc, id) => acc + id, 0)
    .toString();
}

export function day2Part1(): string {
  const input = Deno.readTextFileSync("./days/2/part_one_input.txt");
  return run(input);
}
