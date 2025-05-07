/// <reference types="cypress" />

export {}; // Transforme ce fichier en module

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
}); 