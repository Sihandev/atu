import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Keep the legacy .ico fallback and touch icon consistent with the SVG mark.
const source = "src/app/icon.svg";
const png = await sharp(source).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("src/app/favicon.ico", Buffer.concat([header, png]));
await sharp(source).resize(180, 180).png().toFile("src/app/apple-icon.png");
