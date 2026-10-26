# Implementation Plan — Commodity Derivatives Intelligence

## Product and implementation approach

Build a complete client-only single-page application using React 18, Vite, TypeScript, Tailwind CSS v3, React Router v6, Zustand, Recharts, Lucide React, Framer Motion, date-fns, and React Hot Toast. No backend, database, live exchange feed, or paid API is needed: all market data, signals, trades, lifecycle events, alerts, and settings operations are local mock data and simulated asynchronous promises. The project must be self-contained and runnable with `npm install` and `npm run dev`; pin the npm toolchain in `package.json` and commit a lockfile.

Run Vite on the project's configured port 3000 and bind the development server to `0.0.0.0` for the managed Preview. Use browser-history client routing with a shared application shell. Keep financial calculations and mock data generation separate from UI code, and persist user-facing settings (especially theme and alert preferences) through Zustand persistence in `localStorage`.

### Data and behavior architecture

- Model GOLDM, GOLDTEN, GOLDGUINEA, and GOLDPETAL with the supplied purity, quote-base, unit, and representative prices. Generate realistic 180-day OHLCV/open-interest history and current, next, and far expiries, with controlled ±2% variation and occasional volume spikes.
- Normalize comparable quotes per gram using the specified `close / quoteBase * (999 / purity)` formula; GOLDM uses `close / 10 * (999 / 995)` and the other products use their quote bases.
- Derive all six requested pair spreads, percentage spreads, rolling 60-day z-scores, signal entries/exits, mock trade logs, and alert history from the generated data. Centralize financial/date formatting and calculation helpers.
- Implement mock API functions with 500–1500 ms delays and a 10% simulated failure chance. Components show loading, retryable errors, and empty states; successful actions produce the specified toast messages.
- Use reusable accessible UI primitives for buttons, cards, badges, tables, inputs/sliders, toggles, spinners, and animated modals. Sort, filter, paginate, export CSV, calculate results, save settings, and validate proposed trade dates in client code so each control has an observable useful effect.

### Routes and feature composition

- `/` — dashboard summary metrics, active signals table and detail modal, GOLDM/GOLDTEN 30-day sparkline, refresh, and signal CSV export.
- `/market-data` — contract/date/volume filters, sortable market table, 10-row pagination, reset, refresh, and filtered CSV export.
- `/relative-value` — pair selector, spread and z-score charts with reference bands/markers, debounced entry/exit/window controls, run/reset, PNG chart export, and signal-action table.
- `/backtest` — configurable walk-forward parameters, simulated backtest, equity/drawdown charts, performance metrics, attribution toggle, trade log, and CSV export.
- `/lifecycle` — contract lifecycle timeline and filters, lifecycle table, and a trade-planning modal with calendar-window validation/warning.
- `/alerts` — quiet mode, z thresholds, Email/SMS/In-App preferences, save action, and alert history; quiet mode displays only alerts whose absolute z-score is greater than 2.0.
- `/about` — problem statement, MCX Bhavcopy reference, contract specifications, settlement/liquidity disclaimer, team credits, and return-to-dashboard action.

A shared responsive shell provides active-route navigation and a header with page title, theme control, user avatar, refresh action, and last-refreshed time. A static `/manus-routes.json` manifest will list all seven application routes before the first development-server start.

### Project structure

```text
commodity-derivatives-intelligence/
├── public/
│   ├── favicon.svg
│   └── manus-routes.json
├── src/
│   ├── api/mockApi.ts                 # Delayed, fallible mock API methods
│   ├── components/
│   │   ├── layout/                    # Sidebar, header, shared shell
│   │   ├── ui/                        # Reusable accessible UI primitives
│   │   ├── charts/                    # Shared themed Recharts visualizations
│   │   └── modals/                    # Signal details and plan-trade dialogs
│   ├── data/mockData.ts               # Contract histories and derived fixtures
│   ├── pages/                         # Seven route-level page components
│   ├── store/useStore.ts              # Persisted Zustand application settings
│   ├── types/index.ts                 # Domain and API interfaces
│   ├── utils/                         # Formatting, calculations, and CSV/PNG export
│   ├── App.tsx                        # Router and route composition
│   ├── main.tsx                       # React entry point and toast provider
│   └── index.css                      # Theme variables, Tailwind layers, global styles
├── index.html
├── package.json / package-lock.json
├── tailwind.config.js / postcss.config.js
├── tsconfig.json / vite.config.ts
├── app.config.ts                      # Project branding metadata
├── plan.md / TODO.md
└── README.md
```

### Design direction

- **Design movement:** Contemporary institutional trading terminal, borrowing the discipline of Swiss information design and editorial market-report typography.
- **Core principles:** Dense but legible financial information; clear hierarchy between market facts and signals; consistent, keyboard-accessible controls; restrained motion that confirms state rather than distracting.
- **Color philosophy:** Preserve the requested deep-navy/white foundations and muted secondary text for trust and long-session readability. Use bullion gold as the distinctive analytical accent, while green, red, and amber remain reserved for signal meaning and caution. Keep borders low-contrast and ensure text contrast in both themes.
- **Layout paradigm:** A persistent navigation rail and asymmetric, intentionally varied-height dashboard panels create a working terminal rather than a centered marketing page. Tables occupy the full usable width and scroll horizontally on narrow screens; metrics and charts reflow into a single column on mobile.
- **Signature elements:** A fine gold edge on active navigation and selected analytical panels; compact monospace numerals for prices and z-scores; chart reference bands and signal markers that make spread context visible at a glance.
- **Interaction philosophy:** Controls immediately explain their effect; data actions show clear loading/success/error feedback; sliders update analysis with a 300 ms debounce; modals support keyboard close and visible focus.
- **Animation:** Short Framer Motion fade/scale transitions for route content and dialogs, plus subtle hover/focus transitions; honor reduced-motion preferences and avoid animated chart movement that impairs reading.
- **Typography system:** Inter for interface copy and headings, with a clear bold 24–36 px title scale and regular 14–16 px body copy; system monospace for financial values, dates, and compact table figures.
- **Brand essence:** “A disciplined relative-value workbench for MCX gold traders, making cross-contract dislocations legible.” Personality: precise, composed, analytical.
- **Brand voice:** Direct, market-oriented labels; communicate state and action rather than marketing claims. Examples: “Spread has reverted inside the exit band.” “Refresh market history.”
- **Wordmark & logo:** A compact, custom geometric “CDI” monogram in a circular assay-mark-inspired frame, paired with the full product name in the sidebar; use a gold diagonal/price-line motif to distinguish the mark.
- **Signature brand color:** MCX bullion gold `#D4AF37`.

### Delivery

Deliver the working project source, README, and a downloadable source archive, plus the managed Preview URL. The app is a mock-data prototype and must clearly state that its figures are illustrative, not executable market quotes. Do not publish it publicly unless requested; the current project configuration has auto-publish disabled.
