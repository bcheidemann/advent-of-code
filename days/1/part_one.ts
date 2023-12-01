export function run(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const digitOne = line.split("").find((char) => /\d/.test(char));
      const digitTwo = line.split("").reverse().find((char) => /\d/.test(char));
      return parseInt(digitOne! + digitTwo!);
    })
    .reduce((acc, curr) => acc + curr, 0)
    .toString();
}

export function day1Part1(): string {
  const input = Deno.readTextFileSync("./days/1/part_one_input.txt");
  return run(input);
}
