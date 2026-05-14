describe('Cypress Tests', () => {
  it('test', () => {
      cy.fixture('cypressTests').then(data => {
      cy.visit(data.main_url);
      cy.get('body').should('be.visible');
      })
  });

  it('Регистрация', () => {
    cy.fixture('cypressTests').then(data => {
    cy.visit(data.main_url);
    cy.get('[href="/registration"] > .button').click();
    cy.get(':nth-child(1) > :nth-child(1) > .form-control--medium > .form-input--text').type('seven');
    cy.get('.form-input--email').type('teplotom79@gmail.com');
    cy.get(':nth-child(3) > .form-control--medium > .form-input--password').type('Password1');
    cy.get(':nth-child(4) > .form-control--medium > .form-input--password').type('Password1');
    cy.get(':nth-child(4) > .button', {timeout: 20000}).click();
    cy.get('[style=""] > :nth-child(1) > .form-control--medium > .form-input--text').type('Иван');
    cy.get(':nth-child(2) > .form-control--medium > .form-input--text').type('Иванович');
    cy.get(':nth-child(3) > .form-control--medium > .form-input--text').type('Иванов');
    cy.get('.form__buttons > :nth-child(3) > .button', {timeout: 6000}).click();
    cy.get('.page-nav__text-message > .button', {timeout: 6000}).click();
    cy.get('[data-v-7ff322b7=""][data-v-f5840952=""] > .button', {timeout: 20000}).click();
    }) 
  });

  it('Авторизация для потверждения', () => {
    cy.fixture('cypressTests').then(data => {
    cy.visit(data.main_url);
    cy.get(':nth-child(1) > .header__nav > [href="/vacancies"] > .header__label', {timeout: 80000}).click();
    cy.get('[href="/login"] > .button', {timeout: 100000}).click();
    cy.get('.form-input--text', {timeout: 80000}).type('seven');
    cy.get('.form-input--password', {timeout: 80000}).type('Password1');
    cy.get(':nth-child(3) > .button', {timeout: 1000000}).click();
    cy.get('.page-nav__role-block > .button').click();
    cy.get('.select-role-form > :nth-child(3)').click();
    cy.get('[data-v-7ff322b7=""][data-v-f5840952=""] > .button', {timeout: 6000}).click();
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