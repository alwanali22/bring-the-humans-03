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
// This program does one thing: it validates VIDEO.json at the repository root
// and copies it to /output/VIDEO.json, where the gate reads it. Nothing this
// program writes about the video is scored — but a placeholder or malformed
// URL fails fast here instead of silently reaching the gate.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The house reads views from a public TikTok video page, so the URL must name
// a real video: https://www.tiktok.com/@<handle>/video/<digits>. A starter
// placeholder (<handle> / <id>) or anything else is a broken entry.
const VIDEO_URL = /^https:\/\/www\.tiktok\.com\/@[A-Za-z0-9._-]+\/video\/\d+\/?$/;

function fail(message: string): never {
  console.error(`VIDEO.json invalid: ${message}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

let raw: string;
try {
  raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
} catch (error) {
  fail(`could not be read from ${botDir}: ${(error as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (error) {
  fail(`is not valid JSON: ${(error as Error).message}`);
}

const url = (parsed as { url?: unknown } | null)?.url;
if (typeof url !== 'string' || !VIDEO_URL.test(url)) {
  fail(`url must be a TikTok video URL like https://www.tiktok.com/@handle/video/123, got: ${JSON.stringify(url)}`);
}

// Validated: pass the file through byte-for-byte, so the gate sees exactly
// what the repository names.
writeFileSync(join(outputDir, 'VIDEO.json'), raw);
console.log(`VIDEO.json OK: ${url}`);
