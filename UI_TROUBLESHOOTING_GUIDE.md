# UI Troubleshooting Guide

## 🚨 Common UI Issues & Solutions

This document provides step-by-step solutions for common UI and development issues encountered with the AI Health Monitor dashboard.

---

## 📋 Table of Contents

1. [Critical Configuration Files](#critical-configuration-files)
2. [TypeScript Errors](#typescript-errors)
3. [Dependency Issues](#dependency-issues)
4. [Caching Problems](#caching-problems)
5. [Development Server Issues](#development-server-issues)
6. [Build & Compilation Errors](#build--compilation-errors)
7. [Quick Diagnostic Commands](#quick-diagnostic-commands)
8. [Emergency Recovery Steps](#emergency-recovery-steps)

---

## 🔧 Critical Configuration Files

### Missing Configuration Files Checklist

Always verify these files exist and are properly configured:

#### 1. **Tailwind CSS Configuration** (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-purple': '0 0 20px rgba(147, 51, 234, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
```

#### 2. **ESLint Configuration** (`eslint.config.mjs`)
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn", 
      "prefer-const": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
];

export default eslintConfig;
```

#### 3. **Global CSS File** (`src/app/globals.css`)
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

---

## 🐛 TypeScript Errors

### Common TypeScript Issues & Fixes

#### 1. **React Window Missing Width Property**
**Error**: `Property 'width' is missing in type 'FixedSizeListProps'`

**Solution**:
```typescript
// ❌ Incorrect
<List
  ref={listRef}
  height={384}
  itemCount={filteredLogs.length}
  itemSize={80}
  className="bg-gray-50"
>

// ✅ Correct
<List
  ref={listRef}
  height={384}
  width="100%"  // Add this property
  itemCount={filteredLogs.length}
  itemSize={80}
  className="bg-gray-50"
>
```

#### 2. **Faker.js Precision Property Deprecated**
**Error**: `'precision' does not exist in type`

**Solution**:
```typescript
// ❌ Incorrect
faker.number.float({ min: 95, max: 99.99, precision: 0.01 })

// ✅ Correct
faker.number.float({ min: 95, max: 99.99, fractionDigits: 2 })
```

#### 3. **useRef Missing Initial Value**
**Error**: `Expected 1 arguments, but got 0`

**Solution**:
```typescript
// ❌ Incorrect
const intervalRef = useRef<NodeJS.Timeout>();

// ✅ Correct
const intervalRef = useRef<NodeJS.Timeout | null>(null);
```

#### 4. **Interface Property Mismatches**
**Error**: `Type 'X' is missing the following properties from type 'Y'`

**Solution**: Always check interface definitions and add missing properties:
```typescript
// Example: Adding missing properties to PerformanceMetric
return {
  id: faker.string.uuid(),
  serviceId,
  serviceName: service.name,    // Add missing property
  timestamp: new Date(),
  responseTime: service.responseTime + faker.number.int({ min: -50, max: 50 }),
  errorRate: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
  throughput: faker.number.int({ min: 100, max: 1000 }),
  cpuUsage: faker.number.float({ min: 20, max: 80, fractionDigits: 1 }),
  memoryUsage: faker.number.float({ min: 30, max: 70, fractionDigits: 1 }),
  activeConnections: faker.number.int({ min: 10, max: 500 }),
  cacheHitRate: faker.number.float({ min: 70, max: 99, fractionDigits: 1 })  // Add missing property
};
```

---

## 📦 Dependency Issues

### Checking Dependencies
```bash
# 1. Verify package.json dependencies
cat package.json | grep -A 20 '"dependencies"'

# 2. Check for missing dependencies
npm list --depth=0

# 3. Verify specific packages
npm list react react-dom next tailwindcss
```

### Critical Dependencies List
```json
{
  "dependencies": {
    "@faker-js/faker": "^9.9.0",
    "@tanstack/react-query": "^5.83.0",
    "@types/react-window": "^1.8.8",
    "axios": "^1.11.0",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.11",
    "lucide-react": "^0.532.0",
    "next": "15.4.4",
    "react": "19.1.0",
    "react-circular-progressbar": "^2.2.0",
    "react-dom": "19.1.0",
    "react-window": "^1.8.11",
    "reactflow": "^11.11.4",
    "recharts": "^3.1.0",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.4.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 🗂️ Caching Problems

### Cache Clearing Process

#### 1. **Full Cache Clear** (Nuclear Option)
```bash
# Kill all Next.js processes
pkill -f next

# Clear all caches
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.next

# Optional: Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm ci

# Restart development server
npm run dev
```

#### 2. **Partial Cache Clear** (Gentle Option)
```bash
# Kill development server
pkill -f next

# Clear Next.js cache only
rm -rf .next

# Restart development server
npm run dev
```

#### 3. **Cache Issues Symptoms**
- ✅ Server returns HTTP 500 errors
- ✅ Build manifest files not found
- ✅ Compilation errors that don't match your code
- ✅ Hot reload not working
- ✅ Changes not reflected in browser
- ✅ Dependency resolution errors

---

## 🖥️ Development Server Issues

### Port Conflicts

#### Problem: Port Already in Use
```
⚠ Port 3000 is in use by process 3681
```

#### Solutions:
```bash
# Option 1: Kill the process using the port
lsof -ti:3000 | xargs kill -9

# Option 2: Find and kill specific Next.js processes
ps aux | grep next
pkill -f next

# Option 3: Use a different port
npm run dev -- -p 3001

# Option 4: Kill all Node.js processes (nuclear option)
pkill node
```

### Server Health Check
```bash
# Check if server is responding
curl -s -w "HTTP Status: %{http_code}\n" http://localhost:3000 -o /dev/null

# Check server response content
curl -s http://localhost:3000 | head -10

# Monitor server logs in real-time
tail -f .next/trace
```

---

## 🏗️ Build & Compilation Errors

### TypeScript Check Before Build
```bash
# Run TypeScript check without emitting files
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/components/dashboard/SpecificComponent.tsx
```

### Build Process Debugging
```bash
# Clean build
npm run build

# Build with debug information
npm run build -- --debug

# Development build check
npm run dev
```

### Common Build Errors & Solutions

#### 1. **ESLint Blocking Build**
```bash
# Temporarily disable ESLint for build
npm run build -- --no-lint

# Or update ESLint config to be less strict (see ESLint config above)
```

#### 2. **TypeScript Strict Mode Issues**
- Update `tsconfig.json` to be less strict temporarily
- Fix TypeScript errors systematically
- Use type assertions where appropriate

---

## 🔍 Quick Diagnostic Commands

### Health Check Script
```bash
#!/bin/bash
echo "=== AI Health Monitor Diagnostics ==="

echo "1. Checking critical files..."
ls -la tailwind.config.ts eslint.config.mjs src/app/globals.css

echo "2. Checking package.json..."
node -e "console.log('Node version:', process.version)"
npm --version

echo "3. Checking TypeScript..."
npx tsc --version

echo "4. Checking for running processes..."
ps aux | grep -E "(next|node)" | grep -v grep

echo "5. Checking port availability..."
lsof -ti:3000,3001 || echo "Ports 3000,3001 are available"

echo "6. Testing server response..."
curl -s -w "HTTP Status: %{http_code}\n" http://localhost:3000 -o /dev/null 2>/dev/null || echo "Server not responding"

echo "=== Diagnostics Complete ==="
```

### Dependencies Check Script
```bash
#!/bin/bash
echo "=== Dependency Check ==="

echo "Critical packages status:"
npm list react react-dom next tailwindcss framer-motion zustand recharts lucide-react

echo "TypeScript definitions:"
npm list @types/react @types/react-dom @types/node

echo "Dev dependencies:"
npm list eslint typescript

echo "=== Dependency Check Complete ==="
```

---

## 🚑 Emergency Recovery Steps

### Step 1: Quick Recovery (5 minutes)
```bash
# 1. Kill all processes
pkill -f next

# 2. Clear Next.js cache
rm -rf .next

# 3. Restart
npm run dev
```

### Step 2: Medium Recovery (10 minutes)
```bash
# 1. Kill all processes
pkill -f next

# 2. Clear all caches
rm -rf .next node_modules/.cache

# 3. Reinstall dependencies
npm ci

# 4. Check critical files exist
ls -la tailwind.config.ts eslint.config.mjs

# 5. Restart
npm run dev
```

### Step 3: Full Recovery (20 minutes)
```bash
# 1. Full Git status check
git status
git log --oneline -5

# 2. Nuclear cache clear
pkill -f next
rm -rf .next node_modules/.cache node_modules
npm cache clean --force

# 3. Reinstall everything
npm install

# 4. Check/recreate critical files
# (Use the configuration files from this guide)

# 5. TypeScript check
npx tsc --noEmit

# 6. Build test
npm run build

# 7. Start development
npm run dev
```

### Step 4: Git Recovery (Last Resort)
```bash
# 1. Check Git history
git log --oneline -10

# 2. Reset to last known working commit
git reset --hard <commit-hash>

# 3. Follow Step 3 (Full Recovery)

# 4. Verify everything works
curl -s http://localhost:3000
```

---

## 📊 Success Indicators

### ✅ Everything Working Checklist

1. **Configuration Files**
   - [ ] `tailwind.config.ts` exists and has proper content
   - [ ] `eslint.config.mjs` exists and configured
   - [ ] `src/app/globals.css` exists with Tailwind imports

2. **Dependencies**
   - [ ] `npm list` shows no missing dependencies
   - [ ] All critical packages installed (React, Next.js, Tailwind, etc.)

3. **Development Server**
   - [ ] `npm run dev` starts without errors
   - [ ] Server responds with HTTP 200 on localhost:3000
   - [ ] Hot reload working

4. **TypeScript**
   - [ ] `npx tsc --noEmit` runs without errors
   - [ ] IDE showing no TypeScript errors

5. **Build Process**
   - [ ] `npm run build` completes successfully
   - [ ] No ESLint blocking errors

---

## 📝 Maintenance Best Practices

### Daily Development
1. **Before Starting Work**
   ```bash
   git status
   npm run dev
   curl -s http://localhost:3000 > /dev/null && echo "✅ Server OK" || echo "❌ Server Issue"
   ```

2. **After Major Changes**
   ```bash
   npx tsc --noEmit
   npm run build
   ```

3. **Weekly Maintenance**
   ```bash
   npm audit
   npm outdated
   rm -rf .next
   npm ci
   ```

### Git Workflow
1. **Always commit working states**
   ```bash
   git add .
   git commit -m "fix: Working state after resolving UI issues"
   ```

2. **Create recovery points**
   ```bash
   git tag v1.0-stable
   git push origin v1.0-stable
   ```

---

## 🔗 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)

---

**📅 Last Updated**: $(date)
**🔧 Tested On**: Next.js 15.4.4, React 19.1.0, Node.js 18+

---

*Save this guide for quick reference during development issues!* 