const fetch = require("node-fetch");
const swapi = require("./script_async");

it("calls SWAPI to get people", () => {
  /*
  When testing async functions, use "expect.assertions(n)" to ensure that the expected number of assertions were indeed run.
  Also, return the Promise so that Jest knows it has to wait for the async function to complete.
  */
  expect.assertions(1);
  return swapi.getPeople(fetch).then((data) => {
    expect(data.count).toEqual(82);
  });
});

it("calls SWAPI to get people with a Promise", () => {
  expect.assertions(2);
  return swapi.getPeoplePromise(fetch).then((data) => {
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

it("getPeople returns count and results", () => {
  /*
  Jest also allows us to create mocks to fake a function and pretend to have it running.
  This makes our tests much faster, while it still allows us to spy on its behavior and use assertions.
  */
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 82,
          results: [0, 1, 2, 3, 4, 5],
        }),
    })
  );
  expect.assertions(4);
  return swapi.getPeoplePromise(mockFetch).then((data) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith("https://swapi.dev/api/people");
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});
