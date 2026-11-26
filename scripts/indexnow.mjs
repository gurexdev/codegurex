// Notifies IndexNow-compatible search engines (Bing, Yandex, Seznam, Naver…) about every URL
// in the sitemap after a deploy. Bing's index also feeds Copilot, DuckDuckGo and ChatGPT search.
// The key is public by design: search engines verify it at https://codegurex.com/<key>.txt
// Usage: node scripts/indexnow.mjs   (run after the site is live)
import { readFile } from "node:fs/promises";

export const INDEXNOW_KEY = "2f5a6ab8cf7b03575845904871dab26e";
const HOST = "codegurex.com";

if (import.meta.url === `file://${process.argv[1]}`) {
  const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: ${urlList.length} URLs submitted → HTTP ${res.status}`);
  if (res.status >= 400) process.exitCode = 1;
}
