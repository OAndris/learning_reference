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
