import { parseLine } from "./common.ts";

export function run(input: string): string {
  return input
    .split("\n")
    .map(parseLine)
    .map(
      (game) =>
        game.rounds.reduce((acc, round) => {
          round.cubes.forEach((cube) => {
            acc[cube.color] = Math.max(acc[cube.color], cube.count);
          });
          return acc;
        }, {
          red: 0,
          green: 0,
          blue: 0,
        }),
    )
    .map(
      ({
        red,
        green,
        blue,
      }) => red * green * blue,
    )
    .reduce((acc, power) => acc + power, 0)
    .toString();
}

export function day2Part2(): string {
  const input = Deno.readTextFileSync("./days/2/part_two_input.txt");
  return run(input);
}
