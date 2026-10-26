# Commodity Derivatives Intelligence

A trader-facing, single-page research dashboard for comparing relative pricing across the MCX GOLDM, GOLDTEN, GOLDGUINEA, and GOLDPETAL futures contracts. The prototype provides normalized market history, pair spreads and rolling z-scores, paper signals, an illustrative backtest, a contract lifecycle calendar, alert preferences, and CSV/PNG exports.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal. To create a production bundle, run `npm run build`; the generated static files are in `dist/`.

## Technology

React 18, Vite 6, TypeScript, Tailwind CSS 3, React Router 6, Zustand, Recharts, Lucide React, Framer Motion, date-fns, React Hot Toast, html-to-image, and the Tailwind forms plugin.

## Project map

```text
public/                  SVG/ICO favicons and application route manifest
src/api/                 Simulated asynchronous API calls
src/components/layout/   Shared sidebar, header, and page shell
src/components/ui/       Reusable controls, cards, tables, and modal primitives
src/components/charts/   Responsive Recharts visualizations
src/components/modals/   Signal details and trade planning dialogs
src/data/                Mock market, spread, lifecycle, signal, and alert fixtures
src/pages/               Dashboard, market data, relative value, backtest, lifecycle, alerts, about
src/store/               Persisted Zustand preferences
src/types/               Domain and API types
src/utils/               Financial/date formatting, calculations, and CSV helpers
```

## Mock-data notice and source reference

All prices, OHLCV/open interest observations, expiries, signals, alerts, lifecycle dates, trades, and backtest results are generated locally for interface demonstration. The “API” only simulates network delay and occasional errors; it does not call MCX or another service. Figures are illustrative and are not live, executable market quotes, investment advice, or a forecast of future performance. Confirm contract terms and current exchange circulars before using any external market data.

The app links to the official [MCX Bhavcopy](https://www.mcxindia.com/market-data/bhavcopy), verified as the exchange's daily market-data page (prices shown in INR; available data dates back to November 2003). No MCX data is ingested by this mock prototype.

## Dependency audit note

On 8 October 2026, `npm audit` reported 9 findings (5 high, 4 moderate) across the full dependency tree; `npm audit --omit=dev` reported 2 moderate findings in the explicitly requested React Router v6 line. Vite was updated to patched 6.4.4. The audit's available fixes for the Tailwind findings require Tailwind 4.3.3, and fixes for React Router require v7.18.4, which would change the requested major versions. This prototype retains Tailwind 3 and React Router 6; review and upgrade those dependencies before expanding this code into a production service.
