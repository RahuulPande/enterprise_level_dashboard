# AI Health Monitor Dashboard - Auto Setup Instructions for Cursor

## FOR CURSOR AI: Read these instructions and execute all steps automatically

I have the following TypeScript files in `/Users/rahuulpande/Desktop/AI_ML_Dashboard`:
- generator.ts (mock data generator)
- index.ts (TypeScript types)
- dashboard.ts (Zustand store)
- useRealTimeData.ts (React hook)
- scenarios.ts (demo scenarios)
- cursorrules.ts (cursor rules)

## STEP 1: Initialize Next.js Project
Create a Next.js project in the current directory with TypeScript, Tailwind CSS, App Router, and src directory.

## STEP 2: Install Dependencies
Install these packages:
- @tanstack/react-query
- axios
- recharts
- lucide-react
- framer-motion
- @faker-js/faker
- date-fns
- zustand

## STEP 3: Create Folder Structure
Create these folders:
- src/lib/mock-data
- src/lib/types
- src/lib/hooks
- src/store
- src/components/dashboard
- src/components/charts
- src/components/ui
- src/app

## STEP 4: Move Files
Move the existing TypeScript files to their correct locations:
- generator.ts → src/lib/mock-data/generator.ts
- index.ts → src/lib/types/index.ts
- dashboard.ts → src/store/dashboard.ts
- useRealTimeData.ts → src/lib/hooks/useRealTimeData.ts
- scenarios.ts → src/lib/mock-data/scenarios.ts
- cursorrules.ts → .cursorrules (rename and move to root)

## STEP 5: Fix All Imports
In each moved file, update all import paths to use the `@/` alias:
- Change `../types` to `@/lib/types`
- Change `../lib/mock-data/generator` to `@/lib/mock-data/generator`
- Change `../store/dashboard` to `@/store/dashboard`

## STEP 6: Create Layout and Homepage
Create src/app/layout.tsx with:
- Basic Next.js layout
- Import globals.css
- Set metadata for "Health Monitor AI"

Create src/app/page.tsx with:
- Import and use the dashboard store
- Display service health summary cards
- Show a grid of services with real-time status
- Use the useRealTimeData hook

## STEP 7: Update tsconfig.json
Add path mapping for "@/*": ["./src/*"] in compilerOptions.paths

## STEP 8: Create a Working Dashboard
Build a complete dashboard page that:
- Shows total services, healthy, degraded, and down counts
- Displays services in a grid with color coding
- Updates in real-time using the mock data generator
- Includes proper Tailwind styling

## STEP 9: Add Demo Mode
Create keyboard shortcuts (Ctrl+1, Ctrl+2, etc.) to trigger demo scenarios from the scenarios.ts file.

## STEP 10: Make It Run
Ensure the project runs without errors when executing `npm run dev`

---

## Expected Result
A fully functional health monitoring dashboard showing:
- 150+ services with real-time status updates
- Color-coded health indicators (green/yellow/red)
- Service counts and metrics
- Smooth animations and transitions
- Demo mode for presentations

The dashboard should work immediately when running `npm run dev` at http://localhost:3000