describe("Тесты страницы очереди", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/queue");
  });

  describe("Проверка состояния кнопки", function () {
    it("Кнопка верно меняет значение атрибута disabled", function () {
      cy.contains("Добавить").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("123");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка анимации", function () {
    it("Добавить несколько элементов", function () {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.wait(500);

      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("2");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

      cy.wait(500);

      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("2");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });
    });

    it("Удалить несколько элементов", function () {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(1500);
      cy.get("input").type("2");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("2");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.contains("Удалить").click();
      cy.wait(1500);
      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.not.contain("1");
          expect($el).to.not.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        } if (index === 1) {
          expect($el).to.contain("2");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border");
        }
      });

      cy.wait(500);

      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.not.contain("1");
          expect($el).to.not.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("2");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.contains("Удалить").click();
      cy.wait(1500);
      cy.get("[class*=list-elem]").each(($el) => {
        expect($el).to.not.contain("2");
        expect($el).to.not.contain("1");
        expect($el).to.not.contain("head");
        expect($el).to.not.contain("tail");
        cy.wrap($el)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });

    it("Корректно работает кнопка 'очистить'", function () {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(1500);
      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.wait(1500);
      cy.get("input").type("3");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=list-elem]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("2");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          expect($el).to.contain("3");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.contains("Очистить").click();
      cy.get("[class*=circle_content]").each(($el) => {
        expect($el).to.not.contain("3");
        expect($el).to.not.contain("2");
        expect($el).to.not.contain("1");
        expect($el).to.not.contain("head");
        expect($el).to.not.contain("tail");
        cy.wrap($el)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });
  });
});

