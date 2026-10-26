# Project Outcomes — Acceptance Criteria

These items preserve the acceptance clauses from the supplied specification. An item remains open until its complete outcome is present in the application.

## [x] Project foundation, theme, shell, routing, and accessibility
- Framework: React 18 + Vite + TypeScript.
- Styling: Tailwind CSS (v3) + custom CSS variables. Routing: React Router v6. State Management: Zustand. Charts: Recharts (line, area, bar, pie). Icons: Lucide React. Animations: Framer Motion. Date Handling: date-fns. CSV Export: PapaParse or manual Blob generation. Notifications: React Hot Toast. Dark Mode: Tailwind dark: classes + Zustand store toggle. HTTP Simulation: Custom api.ts with setTimeout Promises.
- Define light/dark variables: --bg-primary #FFFFFF/#0A192F; --bg-secondary #F5F5F5/#112240; --text-primary #0A192F/#E6F1FF; --text-secondary #4B5563/#8892B0; --accent-gold #D4AF37/#D4AF37; --signal-green #10B981/#10B981; --signal-red #EF4444/#EF4444; --warning-amber #F59E0B/#F59E0B; --border #E5E7EB/#233554.
- Use Inter or Montserrat. Headings: font-bold, sizes text-2xl to text-4xl. Body: text-sm to text-base, font-normal. Monospace: font-mono for numbers in tables.
- Sidebar: Fixed left, width w-64 on desktop, w-16 on mobile (icons only). Collapsible via a hamburger button.
- Header: Top bar with page title, dark/light toggle, user avatar, and a “Refresh Data” button.
- Main Content: ml-64 on desktop, ml-16 on mobile. Padding p-6. Max width max-w-7xl mx-auto.
- Cards: bg-white dark:bg-gray-800, rounded-lg, shadow-md, border border-gray-200 dark:border-gray-700, padding p-4 or p-6.
- Buttons: Primary bg-[#D4AF37] text-[#0A192F] font-semibold rounded-md px-4 py-2 hover:bg-[#c19b2e]; Secondary border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A192F]; Danger bg-red-500 text-white hover:bg-red-600; Ghost text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700.
- Inputs & Sliders: Styled with Tailwind forms plugin. Sliders use accent-[#D4AF37]. Tables: min-w-full divide-y divide-gray-200 dark:divide-gray-700; header bg-gray-50 dark:bg-gray-700; rows hover bg-gray-50 dark:hover:bg-gray-700; sortable headers with arrow icons.
- Modals: centered, overlay bg-black/50, card with close button, Framer Motion fade+scale animation. Toasts positioned top-right.
- Avoid perfect symmetry: vary card heights slightly, use natural spacing. Add subtle imperfections: slightly different border radii, occasional gold accent lines. Use realistic labels and numbers (e.g., ₹72,345.50, not ₹1000).
- Sidebar navigation: click any link → route changes, active link highlighted with gold accent. All routes render inside shared Layout. Routes: / Dashboard; /market-data Market Data; /relative-value Relative Value Signals; /backtest Walk-Forward Backtest; /lifecycle Contract Lifecycle; /alerts Alerts & Settings; /about About / Help.
- Dark/Light toggle switches theme using Tailwind dark: classes and persists in localStorage.
- Responsiveness: Desktop sidebar expanded w-64 and content ml-64. Tablet sidebar collapsed w-16 and content ml-16. Mobile sidebar hidden by default; hamburger opens overlay drawer. Tables horizontally scroll; cards stack vertically. Use Tailwind breakpoints sm, md, lg, xl.
- Use dark: variant on all components. Store theme preference in Zustand and localStorage. Toggle button in header uses sun/moon icon. Ensure charts adapt colors using CSS variables or conditional props.
- Accessibility: all buttons have aria-label. Keyboard navigation has logical Tab order; modals trap focus. Color contrast meets WCAG AA. Tables have proper <thead>, <tbody>, <th scope="col">.
- Professional fintech dashboard, not a generic AI template. No decorative imagery is required for this internal dashboard.

## [x] Mock domain data, calculations, Zustand store, and simulated API
- Create realistic data for the last 180 days.
- ContractData fields: date YYYY-MM-DD; symbol GOLDM | GOLDTEN | GOLDGUINEA | GOLDPETAL; expiry YYYY-MM-DD; open, high, low, close, volume, openInterest.
- GOLDM: price ~₹72,000 per 10g, purity 995, unit 100g. GOLDTEN: price ~₹7,200 per 10g, purity 999, unit 10g. GOLDGUINEA: price ~₹5,760 per 8g, purity 999, unit 8g. GOLDPETAL: price ~₹720 per 1g, purity 999, unit 1g.
- Add random noise (±2%) and occasional volume spikes. Generate for multiple expiries (e.g., current month, next month, far month).
- Compute normalisedPrice = close / quoteBase * (999 / purity). For GOLDM: close / 10 * (999/995). For others: close / quoteBase.
- Precompute all pair spreads: GOLDM-GOLDTEN, GOLDM-GOLDGUINEA, GOLDM-GOLDPETAL, GOLDTEN-GOLDGUINEA, GOLDTEN-GOLDPETAL, GOLDGUINEA-GOLDPETAL. Spread % = (P_a - P_b) / P_b * 100. Z-score = rolling 60-day z-score.
- Generate mock trades for backtest: entry date, exit date, direction, entry Z, exit Z, net P&L after costs.
- Mock alert history with timestamp, pair, Z-score, message, severity.
- API functions return Promises with setTimeout (500–1500ms). Simulate occasional errors (10% chance) to test error handling. Implement fetchMarketData(filters): Promise<ContractData[]>; fetchSpreads(pair, window): Promise<SpreadData[]>; runBacktest(params): Promise<BacktestResult>; fetchLifecycle(): Promise<LifecycleData[]>; fetchAlerts(): Promise<Alert[]>; saveSettings(settings): Promise<void>.
- Use Zustand. State includes darkMode/toggleDarkMode; sidebarCollapsed/toggleSidebar; quietMode/setQuietMode; zEntry/setZEntry; zExit/setZExit; windowSize/setWindowSize; selectedPair/setSelectedPair; and other relevant global settings/data.

## [x] Dashboard
- 4 summary cards: Active Signals, Best Pair Spread, Avg Z-Score, Portfolio Alpha.
- Active Signals table columns: Pair, Direction, Z-Score, Entry Date, Status. Click row → SignalDetailsModal.
- Quick Actions: Refresh Data button (spinner + toast), Export Signals (CSV download).
- Mini sparkline: GOLDM vs GOLDTEN spread last 30 days (Recharts LineChart).
- Refresh calls fetchMarketData, updates store, shows toast “Data refreshed”.
- Export generates CSV from signals and downloads it.
- Click row opens modal with detailed chart and trade info.

## [x] Market Data
- Filters: Contract dropdown, Date range picker (two date inputs), Min Volume slider.
- Buttons: Apply Filters, Reset Filters, Export CSV, Refresh.
- Table: Contract, Expiry, Open, High, Low, Close, Volume, OI, Normalised ₹/g. Sortable columns. Pagination (10 rows).
- Apply filters data client-side and updates table.
- Reset clears filters and reloads full data.
- Export downloads filtered table as CSV.
- Sort click on header toggles asc/desc.
- Pagination next/prev buttons update page.
- Loading spinner when fetching.

## [x] Relative Value Signals
- Pair Selector dropdown.
- Charts: Spread % line chart, Z-Score line chart with ±1.5 and ±2.0 bands, entry/exit markers on spread chart.
- Controls: Z-Entry slider (1.0–3.0), Z-Exit slider (0.0–1.0), Window slider (20–120).
- Buttons: Run Signal (recalculates, spinner), Reset, Export Chart as PNG.
- Signal Table: Date, Z-Score, Action, Net P&L.
- Change pair updates charts.
- Sliders update state and re-run signal automatically (debounced 300ms).
- Run Signal calls fetchSpreads and updates charts and table.
- Export PNG uses html2canvas or Recharts' built-in export.

## [x] Walk-Forward Backtest
- Parameter Panel: Z-Entry, Z-Exit, Window, Transaction Cost %, Max Hold Days.
- Run Backtest button → spinner → results.
- Results: Equity curve (line chart); Drawdown chart (area chart); Metrics cards: Sharpe, Win Rate, Max Drawdown, Annualised Return, Number of Trades; Trade log table: Entry/Exit dates, Direction, Net P&L, Hold Days.
- Attribution toggle: “Show Gold-Beta Adjusted P&L” switches equity curve.
- Export trade log CSV.
- Run Backtest calls runBacktest and updates all charts and metrics.
- Toggle attribution recomputes equity curve (mock: subtract gold beta component).
- Export downloads trade log.

## [x] Contract Lifecycle
- Timeline view: horizontal timeline for each contract showing listing, liquidity ramp, tender, expiry.
- Filters: Contract type, Expiry month.
- Table: Contract, Listing Date, Expiry Date, Tender Period, Avg Volume, Status.
- Button “Plan Trade” opens PlanTradeModal.
- Plan Trade modal has entry/exit date pickers, validates against contract calendar, and shows warning if outside.

## [x] Alerts & Settings and About / Help
- Alerts & Settings: Quiet Mode toggle; Threshold sliders Z-Entry, Z-Exit; notification preferences Email, SMS, In-App (toggles); Save Settings button calls saveSettings(settings), updates store, and shows toast “Settings saved”; Alert History table Timestamp, Pair, Z-Score, Message.
- Toggle quiet mode: if ON, only show alerts with |Z| > 2.0.
- About / Help: Problem statement summary; Data sources: MCX Bhavcopy link, contract specs; Disclaimer: settlement ≠ executable, thin liquidity risk; Team credits; “Back to Dashboard” button.

## [x] Shared interactions, charts, and error/empty states
- Refresh Data simulates an API call (1.5s), updates last-refreshed timestamp, and shows a toast.
- Apply Filters / Reset Filters filter table data client-side.
- Export CSV generates Blob and triggers download.
- Run Signal / Run Backtest recalculates using mock API, shows loading spinner, updates charts/tables.
- Sliders update state and re-render charts in real time (debounced 300ms).
- Toggle Quiet Mode changes alert visibility.
- Modal open/close: click row opens modal; close button works; ESC key closes.
- Sort table columns: click header toggles asc/desc; arrow icon changes.
- Pagination: next/previous buttons update page and disable at extremes.
- Plan Trade modal includes date pickers and warns if dates are outside contract window.
- Use Recharts. All charts responsive (ResponsiveContainer).
- Spread Chart: LineChart with XAxis (date), YAxis (spread %), Tooltip, Line #D4AF37. Add ReferenceLine at 0.
- Z-Score Chart: LineChart with Z-Score line, ReferenceLine at ±1.5 and ±2.0 (dashed, gray). Entry markers as Scatter points (green/red).
- Equity Curve: LineChart or AreaChart with gradient fill #D4AF37.
- Drawdown Chart: AreaChart with negative values, fill red.
- Market Segment Chart: PieChart or BarChart for target users.
- Sparkline: Mini LineChart without axes, just trend.
- All charts have tooltips, legends where appropriate, and are styled with theme colors.
- API calls are wrapped in try/catch. On error, show toast “Failed to load data. Please retry.”
- Loading states: spinners or skeleton loaders for tables and charts. Empty states: “No data available” messages.

## [x] Documentation and runnable project delivery
- Include README.md with project description, `npm install` and `npm run dev` instructions, tech stack list, folder structure, and note that data is mocked.
- Generate all files with complete code; do not use placeholders like `// TODO`.
- Ensure the app runs without errors.
- Include app files under an organized project structure with components for layout, reusable UI, charts and modals; route pages; mock API; store; data; types; and utilities, as described in the attached specification.
- Deliver a downloadable project archive alongside the managed Preview, without publishing publicly unless requested.
