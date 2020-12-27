const googleDatabase = [
  "cats.com",
  "souprecipes.com",
  "flowers.com",
  "animals.com",
  "catpictures.com",
  "myfavouritecats.com",
  "myfavouritecats2.com",
];

const googleSearch = (searchInput, db) => {
  /*
  Note: by making "db" an input (instead of using the variable defined
  outside the function scope), we utilize "dependency injection", making
  our function easier to test (e.g. the test doesn't have to perform a
  database or API call, we can just create a dummy variable or a mock).
   */
  const matches = db.filter((website) => {
    return website.includes(searchInput);
  });
  return matches.length > 3 ? matches.slice(0, 3) : matches;
};

// console.log(googleSearch("cat", googleDatabase));

module.exports = googleSearch;
