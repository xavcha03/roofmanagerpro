describe('Map Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
    cy.getByTestId('map').should('be.visible');
    // Attendre que la carte soit chargée
    cy.get('.map-loaded', { timeout: 10000 }).should('exist');
  });

  it('should load map correctly', () => {
    // Vérifier que la carte MapLibre est chargée
    cy.get('.maplibregl-canvas').should('be.visible');
    cy.get('.maplibregl-ctrl-zoom-in').should('be.visible');
    cy.get('.maplibregl-ctrl-zoom-out').should('be.visible');
  });

  it('should show marker on click', () => {
    // Attendre que la carte soit interactive
    cy.wait(1000);
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300, { force: true });
    
    // Vérifier que le marqueur apparaît
    cy.get('.maplibregl-marker', { timeout: 10000 }).should('be.visible');
  });

  it('should remove marker when canceling', () => {
    // Attendre que la carte soit interactive
    cy.wait(1000);
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300, { force: true });
    
    // Vérifier que le marqueur est présent
    cy.get('.maplibregl-marker').should('be.visible');
    
    // Annuler la sélection
    cy.get('button[aria-label="Cancel HQ selection"]').click();
    
    // Vérifier que le marqueur a disparu
    cy.get('.maplibregl-marker').should('not.exist');
  });

  it('should keep marker after confirming location', () => {
    // Attendre que la carte soit interactive
    cy.wait(1000);
    // Cliquer sur la carte
    cy.getByTestId('map').click(400, 300, { force: true });
    
    // Confirmer la location
    cy.get('button[aria-label="Rent this location as HQ"]').click();
    
    // Vérifier que le marqueur est toujours présent
    cy.get('.maplibregl-marker').should('be.visible');
  });

  it('should handle multiple clicks correctly', () => {
    // Attendre que la carte soit interactive
    cy.wait(1000);
    // Premier click
    cy.getByTestId('map').click(400, 300, { force: true });
    cy.get('.maplibregl-marker').should('be.visible');
    
    // Fermer le dialog avant le deuxième click
    cy.get('button[aria-label="Cancel HQ selection"]').click();
    
    // Deuxième click à un endroit différent
    cy.getByTestId('map').click(200, 200, { force: true });
    
    // Vérifier qu'il n'y a qu'un seul marqueur
    cy.get('.maplibregl-marker').should('have.length', 1);
  });

  it('should zoom in and out', () => {
    // Attendre que les contrôles soient visibles
    cy.get('.maplibregl-ctrl-zoom-in').should('be.visible').click();
    cy.get('.maplibregl-ctrl-zoom-out').should('be.visible').click();
  });

  it('should be accessible', () => {
    // Vérifier l'accessibilité de la carte
    cy.checkA11y(undefined, {
      includedImpacts: ['critical', 'serious'],
      rules: {
        'color-contrast': { enabled: false },
        'region': { enabled: false } // Désactiver la règle region pour la carte
      }
    });
  });
}); 