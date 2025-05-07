/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress-axe" />

import '@testing-library/cypress/add-commands';
import 'cypress-axe';

// Configuration des assertions d'accessibilité
beforeEach(() => {
  cy.injectAxe();
});

// Types pour les commandes personnalisées
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
} 