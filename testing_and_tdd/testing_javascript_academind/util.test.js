const { generateText } = require("./util");

test("should output name and age", () => {
  expect(generateText("Max", 29)).toBe("Max (29 years old)");
  expect(generateText("Anna", 28)).toBe("Anna (28 years old)");
});

test("should output data-less text", () => {
  expect(generateText("", null)).toBe(" (null years old)");
  expect(generateText()).toBe("undefined (undefined years old)");
});
