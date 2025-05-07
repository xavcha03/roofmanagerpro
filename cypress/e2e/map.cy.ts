describe('Map Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getByTestId('map').should('be.visible');
  });

  it('should load map correctly', () => {
    // Vérifier que la carte MapLibre est chargée
    cy.get('.maplibregl-canvas').should('be.visible');
    cy.get('.maplibregl-ctrl-zoom-in').should('be.visible');
    cy.get('.maplibregl-ctrl-zoom-out').should('be.visible');
  });

  it('should show marker on click', () => {
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300);
    
    // Vérifier que le marqueur apparaît
    cy.get('.maplibregl-marker').should('be.visible');
  });

  it('should remove marker when canceling', () => {
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300);
    
    // Vérifier que le marqueur est présent
    cy.get('.maplibregl-marker').should('be.visible');
    
    // Annuler la sélection
    cy.get('button[aria-label="Cancel HQ selection"]').click();
    
    // Vérifier que le marqueur a disparu
    cy.get('.maplibregl-marker').should('not.exist');
  });

  it('should keep marker after confirming location', () => {
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300);
    
    // Confirmer la location
    cy.get('button[aria-label="Rent this location as HQ"]').click();
    
    // Vérifier que le marqueur est toujours présent
    cy.get('.maplibregl-marker').should('be.visible');
  });

  it('should handle multiple clicks correctly', () => {
    // Premier click
    cy.getByTestId('map').click(400, 300);
    cy.get('.maplibregl-marker').should('be.visible');
    
    // Deuxième click à un endroit différent
    cy.getByTestId('map').click(200, 200);
    
    // Vérifier qu'il n'y a qu'un seul marqueur
    cy.get('.maplibregl-marker').should('have.length', 1);
  });

  it('should zoom in and out', () => {
    cy.get('.maplibregl-ctrl-zoom-in').click();
    cy.get('.maplibregl-ctrl-zoom-out').click();
  });

  it('should be accessible', () => {
    // Vérifier l'accessibilité de la carte
    cy.checkA11y(undefined, {
      includedImpacts: ['critical', 'serious'],
      rules: {
        'color-contrast': { enabled: false }
      }
    });
  });
}); 