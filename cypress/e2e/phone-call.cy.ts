/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Phone Call Feature', () => {
  beforeEach(() => {
    // Intercepte et mock l'appel Audio
    cy.window().then((win) => {
      cy.stub(win.Audio.prototype, 'play').resolves();
      cy.stub(win.Audio.prototype, 'pause').resolves();
    });
    
    cy.visit('/');

    // Force un délai court pour le test
    cy.window().then((win: any) => {
      win.useGameStore.getState().scheduleNextCall(100);
    });
  });

  it('shows phone icon and opens quote dialog when clicked', () => {
    // Attend que l'icône apparaisse
    cy.findByRole('button', { name: /incoming call/i }).should('be.visible');

    // Clique sur l'icône
    cy.findByRole('button', { name: /incoming call/i }).click();

    // Vérifie que le dialogue s'ouvre
    cy.findByRole('dialog').should('be.visible');
    cy.findByLabelText(/surface/i).should('be.visible');

    // Vérifie que l'icône a disparu
    cy.findByRole('button', { name: /incoming call/i }).should('not.exist');
  });
}); 