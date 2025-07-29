#!/bin/bash

# AI Health Monitor - Automated Diagnostics Script
# Usage: ./health-check.sh [--fix]

set -e

echo "🏥 AI Health Monitor - System Diagnostics"
echo "========================================"

FIX_MODE=false
if [[ "$1" == "--fix" ]]; then
    FIX_MODE=true
    echo "🔧 Fix mode enabled - will attempt to resolve issues"
fi

echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check functions
check_passed() {
    echo -e "${GREEN}✅ $1${NC}"
}

check_failed() {
    echo -e "${RED}❌ $1${NC}"
}

check_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

check_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Check Node.js and npm versions
echo "1. Checking Node.js environment..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    check_passed "Node.js version: $NODE_VERSION"
else
    check_failed "Node.js not found"
    exit 1
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    check_passed "npm version: $NPM_VERSION"
else
    check_failed "npm not found"
    exit 1
fi

echo ""

# 2. Check critical configuration files
echo "2. Checking critical configuration files..."

CRITICAL_FILES=(
    "package.json"
    "tsconfig.json"
    "tailwind.config.ts"
    "eslint.config.mjs"
    "src/app/globals.css"
    "src/app/layout.tsx"
    "src/app/page.tsx"
)

MISSING_FILES=()

for file in "${CRITICAL_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        check_passed "$file exists"
    else
        check_failed "$file missing"
        MISSING_FILES+=("$file")
    fi
done

echo ""

# 3. Check dependencies
echo "3. Checking dependencies..."

if [[ -f "package.json" ]]; then
    # Check if node_modules exists
    if [[ -d "node_modules" ]]; then
        check_passed "node_modules directory exists"
        
        # Check critical packages
        CRITICAL_PACKAGES=(
            "react"
            "react-dom" 
            "next"
            "tailwindcss"
            "typescript"
            "framer-motion"
            "zustand"
            "recharts"
            "lucide-react"
        )
        
        MISSING_PACKAGES=()
        
        for package in "${CRITICAL_PACKAGES[@]}"; do
            if npm list "$package" &> /dev/null; then
                check_passed "$package installed"
            else
                check_failed "$package missing or incorrect version"
                MISSING_PACKAGES+=("$package")
            fi
        done
    else
        check_failed "node_modules directory missing"
        if [[ "$FIX_MODE" == true ]]; then
            check_info "Running npm install..."
            npm install
            check_passed "Dependencies installed"
        fi
    fi
else
    check_failed "package.json not found"
fi

echo ""

# 4. Check for running processes
echo "4. Checking for running processes..."

NEXT_PROCESSES=$(pgrep -f "next" 2>/dev/null || true)
if [[ -n "$NEXT_PROCESSES" ]]; then
    check_info "Found running Next.js processes: $NEXT_PROCESSES"
    
    # Check which ports are in use
    for port in 3000 3001; do
        if lsof -ti:$port &> /dev/null; then
            PID=$(lsof -ti:$port)
            check_warning "Port $port is in use by process $PID"
        else
            check_passed "Port $port is available"
        fi
    done
else
    check_passed "No Next.js processes running"
fi

echo ""

# 5. Check TypeScript
echo "5. Checking TypeScript..."

if command -v npx &> /dev/null && [[ -f "tsconfig.json" ]]; then
    if npx tsc --noEmit --skipLibCheck &> /dev/null; then
        check_passed "TypeScript compilation successful"
    else
        check_failed "TypeScript compilation errors found"
        if [[ "$FIX_MODE" == true ]]; then
            check_info "TypeScript errors (showing first 10):"
            npx tsc --noEmit --skipLibCheck 2>&1 | head -20
        fi
    fi
else
    check_warning "TypeScript check skipped (npx or tsconfig.json not available)"
fi

echo ""

# 6. Test server response (if running)
echo "6. Testing server response..."

for port in 3000 3001; do
    if lsof -ti:$port &> /dev/null; then
        HTTP_STATUS=$(curl -s -w "%{http_code}" -o /dev/null "http://localhost:$port" 2>/dev/null || echo "000")
        if [[ "$HTTP_STATUS" == "200" ]]; then
            check_passed "Server responding on port $port (HTTP $HTTP_STATUS)"
        else
            check_failed "Server not responding properly on port $port (HTTP $HTTP_STATUS)"
        fi
        break
    fi
done

if ! lsof -ti:3000 &> /dev/null && ! lsof -ti:3001 &> /dev/null; then
    check_info "No server currently running"
fi

echo ""

# 7. Check cache status
echo "7. Checking cache status..."

CACHE_DIRS=(
    ".next"
    "node_modules/.cache"
)

for cache_dir in "${CACHE_DIRS[@]}"; do
    if [[ -d "$cache_dir" ]]; then
        SIZE=$(du -sh "$cache_dir" 2>/dev/null | cut -f1)
        check_info "$cache_dir exists (size: $SIZE)"
    else
        check_passed "$cache_dir not present (clean state)"
    fi
done

echo ""

# Summary and recommendations
echo "🎯 SUMMARY & RECOMMENDATIONS"
echo "============================="

ERROR_COUNT=0

if [[ ${#MISSING_FILES[@]} -gt 0 ]]; then
    echo -e "${RED}❌ Missing critical files: ${MISSING_FILES[*]}${NC}"
    ((ERROR_COUNT++))
fi

if [[ ${#MISSING_PACKAGES[@]} -gt 0 ]]; then
    echo -e "${RED}❌ Missing packages: ${MISSING_PACKAGES[*]}${NC}"
    ((ERROR_COUNT++))
fi

if [[ $ERROR_COUNT -eq 0 ]]; then
    check_passed "All checks passed! System appears healthy."
    echo ""
    echo "✨ Ready to start development:"
    echo "   npm run dev"
else
    echo -e "${RED}⚠️  Found $ERROR_COUNT issue(s) that need attention${NC}"
    echo ""
    echo "🔧 Quick fixes to try:"
    echo "   1. Clear cache: rm -rf .next node_modules/.cache"
    echo "   2. Reinstall deps: npm ci"
    echo "   3. Restart server: pkill -f next && npm run dev"
    echo ""
    echo "📖 For detailed help, see: UI_TROUBLESHOOTING_GUIDE.md"
fi

echo ""

# Auto-fix mode suggestions
if [[ "$FIX_MODE" == true ]]; then
    echo "🔧 Auto-fix attempted where possible"
    echo "   Re-run without --fix flag to verify fixes"
elif [[ $ERROR_COUNT -gt 0 ]]; then
    echo "💡 Run with --fix flag to attempt automatic fixes:"
    echo "   ./health-check.sh --fix"
fi

echo ""
echo "🏥 Diagnostics complete!"

# Exit with error code if issues found
exit $ERROR_COUNT 