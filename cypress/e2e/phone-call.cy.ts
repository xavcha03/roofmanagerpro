/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Phone Call Feature', () => {
  beforeEach(() => {
    // Intercepte et mock l'appel Audio
    cy.window().then((win) => {
      cy.stub(win.Audio.prototype, 'play').as('audioPlay');
      cy.stub(win.Audio.prototype, 'pause').as('audioPause');
    });
    
    cy.visit('/');
    
    // Force l'état incoming à true pour simuler un appel
    cy.window().then((win) => {
      // @ts-ignore - On ignore l'erreur car on sait que le store est disponible
      win.__GAME_STORE__.setState({ incoming: true });
    });
  });

  it('shows phone icon and opens quote dialog when clicked', () => {
    // Vérifie que l'icône est visible
    cy.findByRole('button', { name: /incoming call/i }).should('be.visible');

    // Clique sur l'icône
    cy.findByRole('button', { name: /incoming call/i }).click();

    // Vérifie que l'icône disparaît
    cy.findByRole('button', { name: /incoming call/i }).should('not.exist');

    // Vérifie que le dialogue s'ouvre
    cy.findByRole('dialog').should('be.visible');
    cy.findByLabelText(/surface/i).should('be.visible');
  });
}); 