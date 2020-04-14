import puppeteer from "puppeteer";
import { publishTestCase } from "../confluence";

const width = 1366;
const height = 768;
const screenshotsFolder = "src/__tests__/screenshots";
const url = "http://localhost:3000";

describe("User Interface Tests", () => {
    it("Проверить, что после нажатия на кнопку грузится список новостей", async () => {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 80,
            args: [`--window-size=${width},${height}`]
        });
        const page = await browser.newPage();
        await page.setViewport({ width, height });

        page.goto(url);

        console.log("Ждем, пока отрисуется кнопка");
        await page.waitForSelector("[data-load-news-button]");

        console.log(`Делаем скриншот начального состояния страницы`);
        await page.screenshot({ path: `${screenshotsFolder}/1.jpg` });

        console.log("Нажимаем на кнопку");
        await page.click("[data-load-news-button]");

        console.log("Ждем, пока грузится список новостей");
        await page.waitForSelector("[data-news-list]");

        console.log(`Делаем скриншот страницы с новостями`);
        await page.screenshot({ path: `${screenshotsFolder}/2.jpg` });
       
        console.log("Проверяем, что после клика на кнопку загрузилось больше 0 новостей")
        const newsAmount = await page.$$eval("[data-news-list] [data-news-card]", el => el.length);
        expect(newsAmount).toBeGreaterThan(0);

        browser.close();

        // Публикуем тест-кейс в confluence
        publishTestCase([
            {
                desc: "Начальный вид страницы",
                image: `${screenshotsFolder}/1.jpg`
            },
            {
                desc: "Страница после нажатия кнопки",
                image: `${screenshotsFolder}/2.jpg`
            }
        ]);
    }, 16000);
})