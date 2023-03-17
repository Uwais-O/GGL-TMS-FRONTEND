describe('Tms', () => {
  it('renders a form and adds a new team member', () => {
    cy.visit('http://localhost:3000');

    // Fill in the member form
    cy.get('#name').type('John Doe');
    cy.get('#role').select('Developer');
    cy.get('#tech-stack').select('C#');
    cy.get('#course').type('None');
    cy.get('#Register').click();

    // Check that the new member was added
    cy.contains('John Doe').should('exist');
    cy.contains('Developer').should('exist');
    cy.contains('C#').should('exist');
    cy.contains('None').should('exist');
  });



  it('edits an existing team member', () => {
    cy.visit('http://localhost:3000'); 

    // Click the edit button on the first member in the list
    cy.get('#Edit').first().click();

    // Update the member form
    cy.get('#name').clear().type('Jane Doe');
    cy.get('#role').select('Designer');
    cy.get('#tech-stack').select('React.js');
    cy.get('#course').type('Some comments');
    cy.get('#Update').click();

    // Check that the member was updated
    cy.contains('Jane Doe').should('exist');
    cy.contains('Designer').should('exist');
    cy.contains('React.js').should('exist');
    cy.contains('Some comments').should('exist');
  });

  it('deletes an existing team member', () => {
    cy.visit('http://localhost:3000'); 

    // Click the delete button on the first member in the list
    cy.get('#Delete').click();;

    // Check that the member was deleted
    cy.contains('#n4me').should('not.exist');
  });
});
