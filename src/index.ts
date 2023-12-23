import {launch, Protocol} from "puppeteer"
import { readFile } from "fs/promises";

import untypedConfig from "../config/config.json" assert { type: "json" };
import type { Config } from "./types/Config.js";

const config = untypedConfig as Config;

const browser = await launch({
    headless: config.Headless
});

export const page = await browser.newPage();

const cookies = JSON.parse(await readFile("config/chegg.cookies.json", "utf-8")) as Protocol.Network.CookieParam[]

await page.setUserAgent(config.UserAgent);
await page.setCookie(...cookies)
await page.setViewport({width:1920,height:1080})
await page.setExtraHTTPHeaders(config.HeaderOverrides)
await page.goto(
    `https://www.chegg.com/books/ereader/${config.BookID}`,
);

await page.goto(`https://ereader.chegg.com/reader/books/${config.BookID}/pageid/0`)

await page.waitForSelector(`img[src="https://jigsaw.chegg.com/books/9780357501887/images/553246736447566b58312f754944624f7141314f52316559744647445979684e323059314464425a316c303d0a/encrypted/1600"]`)


const html = await page.evaluate(()=>document.querySelector('*')?.outerHTML)
console.log(html)

await browser.close();