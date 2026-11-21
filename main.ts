// bring-the-humans-03 entry (Node 22, standard library only).
//
// The entry is the video itself: an original vertical TikTok ad for make.fun,
// made new in this session with ffmpeg from make.fun's press pack — its brand
// badge from the first frame, its referral end card with our own code at the
// end, a voiceover and kinetic text telling viewers what make.fun is and why
// to join. The video is posted publicly on TikTok; VIDEO.json at this
// repository's root names its address, and the house reads the video's views
// from TikTok to rank it.
//
// This program does one thing: it copies VIDEO.json from the repository root
// to /output/VIDEO.json, where the gate reads it. Nothing this program writes
// about the video is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(join(botDir, 'VIDEO.json'), join(outputDir, 'VIDEO.json'));
} catch (error) {
  console.error(`VIDEO.json could not be copied from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
