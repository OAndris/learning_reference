describe("Text box with max characters", () => {
  beforeEach(() => {
    cy.visit("/example-3");
    cy.get("[data-cy='last-name-chars-left-count']").as("charsLeftSpan"); // Selectors can be referenced as Cypress 'aliases' (other options would be to use them directly or reference the string as JS variables)
    cy.get("[data-cy='input-last-name']").as("charInput");
  });

  it("displays the appropriate remaining characters count", () => {
    cy.get("@charsLeftSpan").invoke("text").should("equal", "15");
    cy.get("@charInput").type("hello");
    cy.get("@charsLeftSpan").invoke("text").should("equal", "10");
    cy.get("@charInput").type(" my friend");
    cy.get("@charsLeftSpan").invoke("text").should("equal", "0");
  });

  it("prevents the user from typing more characters once max is exceeded", () => {
    const longInput = "abcdefghijklmnopqrstuvwxyz";

    cy.get("@charInput").type(longInput);
    cy.get("@charsLeftSpan").invoke("text").should("equal", "0");
    cy.get("@charInput").should(
      "have.attr",
      "value",
      longInput.substring(0, 15)
    );
  });
});
