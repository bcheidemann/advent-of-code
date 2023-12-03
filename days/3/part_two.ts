import { NumberEntity, Parser, SymbolEntity } from "./parser.ts";

export function run(input: string): string {
  const entities = new Parser(input).parse();

  const symbols = entities.filter((e) => e.type === "symbol") as SymbolEntity[];
  const numbers = entities.filter((e) => e.type === "number") as NumberEntity[];

  return symbols
    .map((symbol) =>
      numbers.filter((number) => symbol.rect.intersects(number.rect))
    )
    .filter((numbers) => numbers.length === 2)
    .map((numbers) => numbers[0].value * numbers[1].value)
    .reduce((acc, curr) => acc + curr, 0)
    .toString();
}

export function day3Part2(): string {
  const input = Deno.readTextFileSync("./days/3/part_two_input.txt");
  return run(input);
}
