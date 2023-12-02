type CubeColorWithCount = {
  color: string;
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
              color,
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

export function run(input: string): string {
  const maxByColor: Record<string, number> = {
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
