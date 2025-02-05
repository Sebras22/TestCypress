const taskName = "Nouvelle tâche de test";
const urlexo2 =
    "https://crm.akov-formation.fr/datas/upload/jz/qg/fv/hfZrwBlu7J.html";
const urlexo3 =
    "https://crm.akov-formation.fr/datas/upload/fj/cv/r8/vsdkBRCemP.html";

describe("Gestion des tâches - Scénario Exo 2", () => {
    beforeEach(() => {
        cy.visit(urlexo2);
    });

    it("Doit contenir tout les éléments de la page", () => {
        cy.get("h1").should("have.text", "Gestion de tâches");
        cy.get("input").should("have.attr", "placeholder", "Ajouter une tâche");
        cy.get("button").should("have.text", "Ajouter");
    });

    it("Ajout d'une nouvelle tâche, et suppression de cette dernière", () => {
        cy.get("#taskInput").type(taskName);
        cy.get("button").should("contain", "Ajouter").click();

        cy.get(".task-item")
            .should("be.visible")
            .contains(taskName, { timeout: 10000 });
        cy.get("button").eq(1).click();
    });
});

describe("Gestion des tâches - Scénario Exo 3", () => {
    beforeEach(() => {
        cy.visit(urlexo3);
    });

    it("Doit contenir tout les éléments de la page", () => {
        cy.get("h1").should("have.text", "Gestion de tâches");
        cy.get("input").should("have.attr", "placeholder", "Ajouter une tâche");
        cy.get("button").should("have.text", "Ajouter");
    });

    it("Ajout d'une nouvelle tâche, et suppression de cette dernière", () => {
        cy.get("#taskInput").type(taskName);
        cy.get("button").should("contain", "Ajouter").click();

        cy.get(".task-item")
            .should("be.visible")
            .contains(taskName, { timeout: 10000 });
        cy.reload();
        cy.get(".task-item")
            .should("be.visible")
            .contains(taskName, { timeout: 10000 });

        cy.get("button").eq(1).click();
    });
});
