const digits = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function parseDigitAt(str: string, index: number): string | null {
  if (/\d/.test(str[index])) {
    return str[index];
  }
  const substr = str.substring(index);
  for (const digit of digits) {
    if (substr.startsWith(digit)) {
      return digits.indexOf(digit).toString();
    }
  }
  return null;
}

function firstDigit(str: string): string | null {
  for (let i = 0; i < str.length; i++) {
    const digit = parseDigitAt(str, i);
    if (digit !== null) {
      return digit;
    }
  }
  return null;
}

function lastDigit(str: string): string | null {
  for (let i = str.length - 1; i >= 0; i--) {
    const digit = parseDigitAt(str, i);
    if (digit !== null) {
      return digit;
    }
  }
  return null;
}

export function run(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const digitOne = firstDigit(line);
      const digitTwo = lastDigit(line);

      if (digitOne === null || digitTwo === null) {
        throw new Error("Could not find one or both digits in line: " + line);
      }

      return parseInt(digitOne! + digitTwo!);
    })
    .reduce((acc, curr) => acc + curr, 0)
    .toString();
}

export function day1Part2(): string {
  const input = Deno.readTextFileSync("./days/1/part_two_input.txt");
  return run(input);
}
