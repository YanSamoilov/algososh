describe("Разворот строки", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  describe("Проверка состояния кнопки", function () {
    it("Кнопка верно меняет значение атрибута disabled", function () {
      cy.contains("Развернуть").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("test");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка работы анимации алгоритма", function () {
    it("Корректно разворачивает строку", function () {
      cy.get("input").type("12345");
      cy.contains("Развернуть").click();
      cy.get("[class*=circle_circle]")
        .should("have.length", 5)
        .each(($el, index) => {
          if (index === 0) expect($el).to.contain("1");
          if (index === 1) expect($el).to.contain("2");
          if (index === 2) expect($el).to.contain("3");
          if (index === 3) expect($el).to.contain("4");
          if (index === 4) expect($el).to.contain("5");

          if (index === 0 || index === 4) {
            cy.wrap($el).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
            if (index === 0) expect($el).to.contain("1");
            if (index === 4) expect($el).to.contain("5");
          }
        });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 0 || index === 4) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 0) expect($el).to.contain("5");
          if (index === 4) expect($el).to.contain("1");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 1 || index === 3) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
          if (index === 1) expect($el).to.contain("2");
          if (index === 3) expect($el).to.contain("4");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 1 || index === 3) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 1) expect($el).to.contain("4");
          if (index === 3) expect($el).to.contain("2");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
          expect($el).to.contain("3");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          expect($el).to.contain("3");
        }
      });
    });
  });
});
