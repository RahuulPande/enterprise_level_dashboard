#!/bin/bash

# IntelliOps AI - Deployment ZIP Creation Script
# Creates a clean ZIP file for hackathon submission

echo "🚀 Creating deployment-ready ZIP file for IntelliOps AI..."

# Set variables
PROJECT_NAME="intelliops-ai"
ZIP_NAME="${PROJECT_NAME}-deployment-$(date +%Y%m%d).zip"
TEMP_DIR="temp-deployment"

# Clean up any existing temp directory
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

echo "📁 Creating clean project structure..."

# Copy essential files and directories
cp -r src/ "$TEMP_DIR/"
cp -r public/ "$TEMP_DIR/"
cp package.json "$TEMP_DIR/"
cp package-lock.json "$TEMP_DIR/"
cp tsconfig.json "$TEMP_DIR/"
cp tailwind.config.ts "$TEMP_DIR/"
cp next.config.js "$TEMP_DIR/"
cp README.md "$TEMP_DIR/"
cp .env.example "$TEMP_DIR/"
cp .gitignore "$TEMP_DIR/"
cp CURSOR_INSTRUCTIONS.md "$TEMP_DIR/"
cp CHANGELOG.md "$TEMP_DIR/"
cp UI_TROUBLESHOOTING_GUIDE.md "$TEMP_DIR/"
cp QUICK_FIX_REFERENCE.md "$TEMP_DIR/"

# Create deployment instructions
cat > "$TEMP_DIR/DEPLOYMENT.md" << 'EOF'
# IntelliOps AI - Deployment Instructions

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Live Demo
The application is already deployed at:
https://ai-ml-dashboard-pomomct98-rahuul-pandes-projects.vercel.app

## Features
- 20+ enterprise features
- AI-powered defect matching (96% accuracy)
- Real-time monitoring of 150+ services
- $16.7M annual savings demonstration

## Support
Developer: Rahuul Pande
Email: kumar.rahul@cognizant.com
Event: Vibe Coding 2025
EOF

# Create a simple installation script
cat > "$TEMP_DIR/install.sh" << 'EOF'
#!/bin/bash
echo "🚀 Installing IntelliOps AI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo "📝 Setting up environment configuration..."
    cp .env.example .env.local
    echo "✅ Environment file created. Edit .env.local if needed."
fi

echo "🎉 Installation complete!"
echo "🚀 Run 'npm run dev' to start the development server"
echo "🌐 Visit http://localhost:3000 to view the application"
EOF

chmod +x "$TEMP_DIR/install.sh"

# Create package.json for the deployment
cat > "$TEMP_DIR/package.json" << 'EOF'
{
  "name": "intelliops-ai",
  "version": "1.2.0",
  "description": "IntelliOps AI - Where Operations Become Intelligent. Enterprise banking intelligence platform delivering $16.7M annual savings through predictive intelligence, real-time monitoring, and automated incident response.",
  "keywords": [
    "ai-health-monitoring",
    "banking-operations",
    "incident-prediction",
    "enterprise-dashboard",
    "cost-savings",
    "roi-calculator",
    "system-monitoring",
    "predictive-analytics",
    "roi-calculator",
    "qr-code",
    "mobile-ready"
  ],
  "author": {
    "name": "Rahuul Pande",
    "cognizant-id": "152044",
    "email": "kumar.rahul@cognizant.com",
    "event": "Vibe Coding 2025",
    "company": "Cognizant"
  },
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "install-deps": "npm install",
    "setup-env": "cp .env.example .env.local",
    "deploy": "npm run build && npm start"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next": "^15.4.4",
    "typescript": "^5",
    "tailwindcss": "^4.1.11",
    "framer-motion": "^12.23.11",
    "recharts": "^3.1.0",
    "zustand": "^5.0.6",
    "lucide-react": "^0.532.0",
    "faker": "^9.9.0",
    "date-fns": "^4.1.0",
    "axios": "^1.11.0",
    "qrcode": "^1.5.4",
    "react-flow-renderer": "^11.11.4",
    "react-window": "^1.8.11"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^15.4.4"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/RahuulPande/enterprise_level_dashboard.git"
  },
  "homepage": "https://ai-ml-dashboard-pomomct98-rahuul-pandes-projects.vercel.app",
  "bugs": {
    "url": "https://github.com/RahuulPande/enterprise_level_dashboard/issues"
  }
}
EOF

echo "📦 Creating ZIP file..."

# Create the ZIP file
cd "$TEMP_DIR"
zip -r "../$ZIP_NAME" . -x "*.DS_Store" "*/__pycache__/*" "*/venv/*" "*/node_modules/*" "*/dist/*" "*/build/*" "*/.next/*" "*/.git/*" "*.key" "*.pem" "*/.vscode/*" "*/.idea/*" "Thumbs.db"

# Move back to original directory
cd ..

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "✅ Deployment ZIP created: $ZIP_NAME"
echo "📁 File size: $(du -h "$ZIP_NAME" | cut -f1)"
echo "📋 Contents:"
unzip -l "$ZIP_NAME" | head -20

echo ""
echo "🎉 Deployment package ready!"
echo "📤 File: $ZIP_NAME"
echo "🌐 Live Demo: https://ai-ml-dashboard-pomomct98-rahuul-pandes-projects.vercel.app"
echo "📚 Documentation: README.md"
echo ""
echo "📦 Package includes:"
echo "   ✅ All source code (src/)"
echo "   ✅ Static assets (public/)"
echo "   ✅ Configuration files"
echo "   ✅ Documentation (README.md, DEPLOYMENT.md)"
echo "   ✅ Installation script (install.sh)"
echo "   ✅ Environment template (.env.example)"
echo ""
echo "❌ Excluded:"
echo "   - node_modules/"
echo "   - .git/"
echo "   - .next/"
echo "   - build/"
echo "   - dist/"
echo "   - .env files with secrets"
echo "   - IDE files (.vscode, .idea)"
echo "   - System files (.DS_Store, Thumbs.db)" 