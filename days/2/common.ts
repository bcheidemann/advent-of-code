export type Color = "red" | "green" | "blue";

type CubeColorWithCount = {
  color: Color;
  count: number;
};

type Round = {
  cubes: CubeColorWithCount[];
};

type Game = {
  id: number;
  rounds: Round[];
};

export function parseLine(line: string): Game {
  const id = parseInt(line.substring("Game ".length, line.indexOf(":")));
  const rounds = line
    .substring(line.indexOf(":") + 1)
    .split(";")
    .map((round) => {
      return {
        cubes: round
          .split(",")
          .map((cube) => cube.trim())
          .map((cube) => {
            const [count, color] = cube.trim().split(" ");
            return {
              color: color as Color,
              count: parseInt(count),
            };
          }),
      };
    });
  return {
    id,
    rounds,
  };
}
