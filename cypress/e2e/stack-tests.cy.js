describe("Тесты страницы стека", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/stack");
  });

  describe("Смена состояния кнопки", function () {
    it("Кнопка верно меняет значение атрибута disabled", function () {
      cy.contains("Добавить").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("1");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка анимации", function () {
    it("Корректно добавляет несколько элементов", function () {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("1");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        });

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("1");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border");
        });

      cy.wait(500);

      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("2");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          }
        });

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("2");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border");
          }
        });
    });

    it("Удаление нескольких элементов", function () {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(500);
      cy.get("input").type("2");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("2");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border");
          }
        });

      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("1");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        });

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("1");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border");
        });

      cy.wait(500);

      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]").should("have.length", 0);
    });

    it("Корректно работает кнопка 'очистить'", function () {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(500);
      cy.get("input").type("2");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("2");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border");
          }
        });

      cy.contains("Очистить").click();
      cy.get("[class*=circle_content]").should("have.length", 0);
    });
  });
});
