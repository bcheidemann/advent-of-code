import { NumberEntity, Parser, SymbolEntity } from "./parser.ts";

export function run(input: string): string {
  const entities = new Parser(input).parse();

  const symbols = entities.filter((e) => e.type === "symbol") as SymbolEntity[];
  const numbers = entities.filter((e) => e.type === "number") as NumberEntity[];

  return numbers
    .filter((number) =>
      symbols.some((symbol) => symbol.rect.intersects(number.rect))
    )
    .map((number) => {
      return number.value;
    })
    .reduce((acc, curr) => acc + curr, 0)
    .toString();
}

export function day3Part1(): string {
  const input = Deno.readTextFileSync("./days/3/part_one_input.txt");
  return run(input);
}
