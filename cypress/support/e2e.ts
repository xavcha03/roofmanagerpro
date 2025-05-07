/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress-axe" />

// Import des commandes personnalisées
import './commands';

// Import des commandes de Testing Library
import '@testing-library/cypress/add-commands';

// Import des commandes d'accessibilité
import 'cypress-axe';

// Configuration des assertions d'accessibilité
beforeEach(() => {
  cy.injectAxe();
});

// Déclaration des types pour TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
} 