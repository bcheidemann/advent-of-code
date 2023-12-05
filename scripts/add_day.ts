#!/usr/bin/env deno

/// Copies the days/__day__ folder to a new folder for the next day, replaceing all references to __day__ with the new day number.

import { ensureDir, exists, walk } from "fs";

const day = prompt("Day number (e.g. 18): ");

if (!day) {
  console.log("No day number provided.");
  Deno.exit(1);
}

const dayDir = `./days/${day}`;

if (await exists(dayDir)) {
  console.log(`${dayDir} already exists.`);
  Deno.exit(1);
}

console.log(`Creating ${dayDir}...`);
await ensureDir(dayDir);

const entries = walk("./days/__day__");
for await (const entry of entries) {
  const newPath = entry.path.replace("__day__", day);

  if (entry.isDirectory) {
    console.log(`Creating ${newPath}...`);
    await ensureDir(newPath);
    continue;
  }

  console.log(`Copying ${entry.path} to ${newPath}...`);
  const contents = await Deno.readTextFile(entry.path);
  const replaced = contents.replaceAll("__day__", day);
  await Deno.writeTextFile(newPath, replaced);
}

console.log("Patching ./days.ts...");
const daysContents = await Deno.readTextFile("./days.ts");
const newDaysContents = daysContents
  .replace(
    "// __next_day_import__",
    `import { day${day} } from "./days/${day}/mod.ts";\n// __next_day_import__`,
  )
  .replace(
    "// __next_day__",
    `day${day},\n  // __next_day__`,
  );
await Deno.writeTextFile("./days.ts", newDaysContents);

console.log("\nDone.");
