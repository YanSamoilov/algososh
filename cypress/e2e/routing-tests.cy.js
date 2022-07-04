describe('Корректный роутинг в приложении', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('Открытие стартовой страницы', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Открытие строки', function() {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
  });

  it('Открытие Фибоначчи', function() {
    cy.get('button').contains('К оглавлению').click();
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('Открытие сортировки', function() {
    cy.get('button').contains('К оглавлению').click();
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('Открытие стека', function() {
    cy.get('button').contains('К оглавлению').click();
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
  });

  it('Открытие очереди', function() {
    cy.get('button').contains('К оглавлению').click();
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
  });

  it('Открытие списка', function() {
    cy.get('button').contains('К оглавлению').click();
    cy.get('a[href*="/list"]').click();
    cy.contains('Связный список');
  });

  it('Главная страница', function() {
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });
});
