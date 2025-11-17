# Ranking pożyczek

Live demo: [ https://loan-ranking.vercel.app/](https://loan-ranking.vercel.app/)

---

**Opis**

`Ranking offers` to prosty, czytelny frontend (React + Vite + TypeScript + Tailwind) służący do przeglądania i porównywania ofert pożyczkowych. Aplikacja prezentuje oferty w formie rankingu, umożliwia filtrowanie oraz sortowanie ofert.

---

## Spis treści

1. [Szybki start](#szybki-start)
2. [Stack technologiczny](#stack-technologiczny)
3. [Uruchamianie i skrypty](#uruchamianie-i-skrypty)
4. [Decyzje projektowe](#decyzje-projektowe)
5. [Filtrowanie i ranking ofert](#filtrowanie-i-ranking-ofert)
6. [Sugestie dalszych ulepszeń](#sugestie-dalszych-ulepszeń)

---

## Szybki start

**Wymagania:**

- Node.js (zalecane >= 18)
- npm

**Klonowanie i instalacja:**

```bash
git clone https://github.com/p6te/loan-ranking.git
cd loan-ranking
npm install
```

**Uruchomienie w trybie deweloperskim:**

```bash
npm run dev
```

**Budowanie i podgląd produkcyjny:**

```bash
npm run build
npm run preview
```

**Testy i linter:**

```bash
npm run test:unit   # uruchamia vitest
npm run test:e2e    # uruchamia cypress (headless)
npm run test        # oba testy (unit + e2e)
npm run lint
```

---

## Stack technologiczny

- React 19 + TypeScript
- Vite
- TailwindCSS
- Vitest (unit tests)
- Cypress (e2e)
- ESLint + Prettier

---

## Decyzje projektowe

### Design

- Minimalistyczny, przejrzysty interfejs skupiony na czytelności informacji i szybkich decyzjach użytkownika. Priorytetem jest prosty layout rankingu i wyraźne CTA.

### Filtrowanie

- Dla pola „kwota” i „okres” przygotowano zarówno inputy, jak i uniwersalny komponent slidera. Slider ułatwia wybór wartości, ale w przypadku pola `kwota` nie został użyty w głównym widoku, ponieważ większość testowych ofert miała wartości w niskim przedziale — slider pogarszał UX.

- Walidacja kwoty, poza wymaganiami, została ustawiona jest na maksymalnie **1 000 000** (kwota), aby wyeliminować skrajne, nierealistyczne wartości.

- Początkowy pomysł pobierania limitów (min/max) bezpośrednio z listy ofert został porzucony, ponieważ kolidował z wymaganiami zadania (walidacja stałych limitów).

- do filtrów zostało dodane opóźnienie, by nie regaowały na każdy ruch użytkownia (szczególnie przy użyciu slidera)

### ranking ofert

- Oferty są sortowane zgodnie z wymaganiami zadania oraz wybranymi filtrami.
- Dodano przycisk **„Pokaż szczegóły”**, który rozwija kartę z dodatkowymi informacjami o ofercie.

---

## Sugestie dalszych ulepszeń

1. **Rozbudowane szczegóły oferty** — po rozwinięciu karty wyświetlać więcej metadanych (opłaty dodatkowe, harmonogram spłat, TAEG rozbite na elementy).
2. **Informacja o ostatniej aktualizacji danych** — pokazywać datę ostatniego odświeżenia oferty (przydatne z punktu widzenia zaufania użytkownika).
3. **Sekcja edukacyjna pod rankingiem** — krótkie wyjaśnienia pojęć finansowych (TAEG, prowizja, RRSO) — pomaga użytkownikowi i poprawia SEO.
4. **Porównywarka ofert** — możliwość zaznaczania kilku ofert (checkbox) i porównania ich w modalnym widoku/tablicy.
5. **Recenzje ekspertów** — krótki komentarz/ocena ekspercka w sekcji szczegółów.
6. **Lepsze zachowanie filtrów przy małej liczbie ofert** — zamiast pokazywać „0 wyników”, wyświetlić oferty, które nie spełniają wszystkich warunków oraz wyraźnie oznaczyć, których wymagań nie spełniają.
