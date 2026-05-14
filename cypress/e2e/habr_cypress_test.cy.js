describe('Cypress Tests', () => {
  it('test', () => {
      cy.fixture('cypressTests').then(data => {
      cy.visit(data.main_url);
      cy.get('body').should('be.visible');

      
      })
  });

  it('Авторизация', () => {
    cy.fixture('cypressTests').then(data => {
    cy.visit(data.main_url);
    cy.get('[href="/login"] > .button').click();
    cy.get('.form-input--text').type('testerAdmin');
    cy.get('.form-input--password').type('Password1');
    cy.get(':nth-child(3) > .button', {timeout: 3000}).click();
    cy.get('[data-v-7ff322b7=""][data-v-f5840952=""] > .button').click();


  })
});

it('Уведомления', () => {
  cy.fixture('cypressTests').then(data => {
  cy.visit(data.main_url);
  cy.get('[href="/login"] > .button').click();
  cy.get('.form-input--text').type('testerAdmin');
  cy.get('.form-input--password').type('Password1');
  cy.get(':nth-child(3) > .button', {timeout: 3000}).click();
  cy.get('[href="/notification"] > .header__label').click();
  cy.get('.notification-title > .link', {timeout: 6000}).click();
  cy.get('[data-v-7ff322b7=""][data-v-f5840952=""] > .button', {timeout: 3000}).click();
  


})
});

});