const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

// Unit test example:
test("should output name and age", () => {
  expect(generateText("Max", 29)).toBe("Max (29 years old)");
  expect(generateText("Anna", 28)).toBe("Anna (28 years old)");
});

// Unit test example:
test("should output data-less text", () => {
  expect(generateText("", null)).toBe(" (null years old)");
  expect(generateText()).toBe("undefined (undefined years old)");
});

// Integration test example (relies on the units being properly tested, and helps ensure that the combination of units is also working well):
test("should generate a valid text output", () => {
  expect(checkAndGenerate("Max", 29)).toBe("Max (29 years old)");
});

// End-to-End test (user interface test) example:
test("should create an element with text and correct class", async () => {
  const headless = false; // NOTE: choose between normal and headless running

  const browser = await puppeteer.launch(
    headless
      ? { headless: true }
      : {
          headless: false,
          slowMo: 80,
          args: ["--start-maximized"],
          // args: ["--window-size=1920,1080"],
        }
  );
  const page = await browser.newPage();
  await page.goto(
    "http://127.0.0.1:5500/testing_and_tdd/testing_javascript_academind/index.html"
  );

  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", "28");
  await page.click("#btnAddUser");

  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Anna (28 years old)");
}, 10000); // NOTE: increase timeout milliseconds if needed
