const googleSearch = require("./script_sync");

dbMock = ["dog.com", "cheesepuff.com", "disney.com", "dogpictures.com"];

describe("googleSearch", () => {
  // Synchronous functions are (should be) trivial to (unit) test. Just create the test cases and perform the assertions.
  it("is searching google", () => {
    expect(googleSearch("test", dbMock)).toEqual([]);
    expect(googleSearch("dog", dbMock)).toEqual(["dog.com", "dogpictures.com"]);
  });

  it("works with undefined and null input", () => {
    expect(googleSearch(undefined, dbMock)).toEqual([]);
    expect(googleSearch(null, dbMock)).toEqual([]);
  });

  it("does not return more than 3 matches", () => {
    expect(googleSearch(".com", dbMock).length).toBe(3);
  });
});
