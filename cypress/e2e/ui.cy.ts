describe('UI Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByTestId('map').should('be.visible');
  });

  it('should have correct layout structure', () => {
    cy.getByTestId('ui').should('exist');
    cy.getByTestId('map').should('exist');
  });

  it('should show confirmation dialog on map click', () => {
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300);

    // Vérifier que le dialog apparaît
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Confirm HQ Location').should('be.visible');
  });

  it('should show coordinates in dialog', () => {
    cy.getByTestId('map').click(400, 300);
    cy.get('[role="dialog"]').within(() => {
      cy.contains('Coordinates:').should('be.visible');
    });
  });

  it('should have accessible buttons', () => {
    cy.getByTestId('map').click(400, 300);
    
    cy.get('button[aria-label="Rent this location as HQ"]')
      .should('be.visible')
      .and('have.text', 'Rent');

    cy.get('button[aria-label="Buy this location as HQ"]')
      .should('be.visible')
      .and('have.text', 'Buy');

    cy.get('button[aria-label="Cancel HQ selection"]')
      .should('be.visible')
      .and('have.text', 'Cancel');
  });

  it('should close dialog on cancel', () => {
    cy.getByTestId('map').click(400, 300);
    cy.get('[role="dialog"]').should('be.visible');
    
    cy.get('button[aria-label="Cancel HQ selection"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('should handle rent action correctly', () => {
    cy.getByTestId('map').click(400, 300);
    cy.get('button[aria-label="Rent this location as HQ"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('should handle buy action correctly', () => {
    cy.getByTestId('map').click(400, 300);
    cy.get('button[aria-label="Buy this location as HQ"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('should be accessible', () => {
    // Test d'accessibilité initial
    cy.checkA11y();

    // Test d'accessibilité avec le dialog ouvert
    cy.getByTestId('map').click(400, 300);
    cy.checkA11y();
  });

  it('should handle keyboard navigation', () => {
    cy.getByTestId('map').click(400, 300);
    
    // Vérifier que le focus est géré correctement
    cy.get('button[aria-label="Rent this location as HQ"]').focus();
    cy.focused().should('have.attr', 'aria-label', 'Rent this location as HQ');
    
    // Tester la navigation au clavier
    cy.focused().type('{enter}');
    cy.get('[role="dialog"]').should('not.exist');
  });
}); 