#!/bin/bash

echo "🚀 Starting Symphony Environment Setup..."

# 1. Check/Install Bun
if ! command -v bun &> /dev/null; then
    echo "📦 Bun not found. Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    # Source the new path so the script can use 'bun' immediately
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
else
    echo "✅ Bun is already installed."
fi

# 2. Install Playwright Core and Symphony globally using Bun
echo "📥 Installing Playwright Core and Symphony globally..."
bun install -g playwright-core @kriptonian/symphony

# 3. Apply the Patch
echo "🛠  Applying path fix to Symphony..."
SEARCH="/home/runner/work/symphony/symphony/node_modules/playwright-core/package.json"
REPLACE="playwright-core/package.json"

# Find the actual global path where bun installed symphony
TARGET_FILE=$(bun pm bin -g)/../install/global/node_modules/@kriptonian/symphony/dist/index.js

# Fallback check for standard npm global paths if Bun pathing differs
if [ ! -f "$TARGET_FILE" ]; then
    TARGET_FILE=$(npm list -g --parseable @kriptonian/symphony 2>/dev/null)/dist/index.js
fi

if [ -f "$TARGET_FILE" ]; then
    sed -i '' "s|$SEARCH|$REPLACE|g" "$TARGET_FILE"
    echo "✨ Patch applied to: $TARGET_FILE"
else
    echo "❌ Error: Could not locate Symphony to patch. Please check installation."
    exit 1
fi

echo "🏁 Setup complete! You can now use 'symphony'."