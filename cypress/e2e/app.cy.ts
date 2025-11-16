describe("Mini ranking - e2e", () => {
  const EVENTS_KEY = "mini_ranking_events_v1";

  type EventLog = {
    name: string;
    [k: string]: unknown;
  };

  beforeEach(() => {
    cy.fixture("offers.json").then((offers) => {
      cy.clearLocalStorage();

      cy.visit("/", {
        onBeforeLoad(win) {
          try {
            (win as any).Math.random = () => 0.5;
          } catch (e) {}

          const origSetTimeout = win.setTimeout.bind(win);

          (win as any).setTimeout = (cb: any, ms?: number, ...args: any[]) => {
            if (typeof ms === "number" && ms >= 600) {
              return origSetTimeout(() => cb(...args), 0);
            }
            return origSetTimeout(() => cb(...args), ms);
          };

          const offersJson = JSON.stringify(offers);
          const origFetch = win.fetch.bind(win);

          (win as any).fetch = (input: RequestInfo, init?: RequestInit) => {
            const url = typeof input === "string" ? input : input.url;
            if (url.endsWith("/offers.json") || url.includes("offers.json")) {
              const resp = new Response(offersJson, {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });
              return Promise.resolve(resp);
            }
            return origFetch(input, init);
          };

          try {
            win.localStorage.removeItem(EVENTS_KEY);
          } catch (e) {}
        },
      });

      cy.contains("Ranking pożyczek").should("be.visible");
      cy.contains("Liczba znalezionych ofert:").should("be.visible");
    });
  });

  it("loads app and shows title", () => {
    cy.get('[data-testid="title"]').should("contain.text", "Ranking pożyczek");
  });

  it("clicking CTA triggers alert and logs cta_click to localStorage (no sinon)", () => {
    let alertSeen = false;

    cy.on("window:alert", (text) => {
      alertSeen = true;
      expect(text).to.match(/Przekierowano do partnera:/);
    });

    cy.contains("Sprawdź ofertę").should("be.visible").first().click();

    cy.window().then((win) => {
      const raw = win.localStorage.getItem(EVENTS_KEY) ?? "[]";
      const arr = JSON.parse(raw) as EventLog[];
      const found = arr.some((ev) => ev.name === "cta_click");
      expect(found).to.equal(true);
    });

    cy.then(() => {
      expect(alertSeen).to.equal(true);
    });
  });

  it("clicking 'Pokaż szczegóły' toggles and logs expand_offer", () => {
    cy.contains("Pokaż szczegóły").should("be.visible").first().click();

    cy.window().then((win) => {
      const raw = win.localStorage.getItem(EVENTS_KEY) ?? "[]";
      const arr = JSON.parse(raw) as EventLog[];
      const found = arr.some((ev) => ev.name === "expand_offer");
      expect(found).to.equal(true);
    });

    cy.contains("Zwiń szczegóły").should("be.visible").first().click();

    cy.window().then((win) => {
      const raw = win.localStorage.getItem(EVENTS_KEY) ?? "[]";
      const arr = JSON.parse(raw) as EventLog[];
      const count = arr.filter((ev) => ev.name === "expand_offer").length;
      expect(count).to.be.greaterThan(0);
    });
  });
});

describe("Mini ranking – error state (fetch fails)", () => {
  it("shows Retry button when fetchOffers fails", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        (win as any).Math.random = () => 0.05;

        (win as any).fetch = () =>
          Promise.reject(new Error("SIMULATED_FETCH_FAILURE"));
      },
    });

    cy.contains("Retry").should("be.visible");
  });
});
