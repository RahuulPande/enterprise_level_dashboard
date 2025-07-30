# 🚀 Quick Fix Reference Card

## 🚨 #1 MOST COMMON ISSUE: Tailwind CSS v4

### UI Not Styled? Check This FIRST!
```bash
# 1. Check version
npm list tailwindcss

# 2. If v4.x.x, fix globals.css:
# Replace @tailwind directives with:
echo '@import "tailwindcss";' > src/app/globals.css.new
# (then copy your custom CSS below the import)

# 3. Restart
pkill -f next && npm run dev
```

## ⚡ Emergency Commands (Copy & Paste)

### 🔥 Nuclear Reset (When Everything is Broken)
```bash
pkill -f next && rm -rf .next node_modules/.cache && npm ci && npm run dev
```

### 🛠️ Quick Cache Clear
```bash
pkill -f next && rm -rf .next && npm run dev
```

### 🔍 Health Check
```bash
curl -s -w "HTTP Status: %{http_code}\n" http://localhost:3000 -o /dev/null
```

### 🐛 TypeScript Check
```bash
npx tsc --noEmit
```

---

## 🔧 Most Common Fixes

| Problem | Quick Solution |
|---------|---------------|
| **Port 3000 in use** | `pkill -f next` |
| **HTTP 500 errors** | `rm -rf .next && npm run dev` |
| **Tailwind not working** | Check `tailwind.config.ts` exists |
| **TypeScript errors** | `npx tsc --noEmit` to check |
| **Build failing** | Update `eslint.config.mjs` rules to "warn" |
| **Changes not showing** | Clear cache: `rm -rf .next` |

---

## 📁 Critical Files Checklist

- [ ] `tailwind.config.ts`
- [ ] `eslint.config.mjs` 
- [ ] `src/app/globals.css`
- [ ] `package.json`
- [ ] `tsconfig.json`

---

## 🎯 Success Indicators

✅ `npm run dev` starts cleanly  
✅ Server responds HTTP 200  
✅ No TypeScript errors  
✅ Hot reload working  

---

## 📞 Emergency Protocol

1. **Nuclear Reset** (above command)
2. Check critical files exist
3. Run `npx tsc --noEmit`
4. Test with `curl -s http://localhost:3000`
5. If still broken → Check `UI_TROUBLESHOOTING_GUIDE.md`

---

*Keep this card handy during development!* 