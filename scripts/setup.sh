#!/bin/bash

# 1. Define the file we need to patch
TARGET_FILE=$(
  symphony --help 2>&1 \
  | sed -n "s/.*from '\([^']*\)'.*/\1/p"
)

echo "🚀 Starting setup..."

# Install Playwright browsers
echo "Installing Playwright browsers..."
npx playwright install chromium webkit firefox

# 2. Check if the patch is needed
if [ -z "$TARGET_FILE" ]; then
    echo "✅ Setup is already done. No patch needed."
    exit 0
fi

# 3. Add playwrite-core
if ! npm list -g playwright-core >/dev/null 2>&1; then
    echo "Adding playwright-core globally..."
    npm install -g playwright-core
else
    echo "✅ playwright-core is already installed globally."
fi

echo "🔍 Searching for Symphony..."

# 4. Apply the patch
if [ -f "$TARGET_FILE" ]; then
    echo "📍 Found at: $TARGET_FILE"
    echo "🛠  Applying the fix..."
    
    SEARCH='/home/runner/work/symphony/symphony/node_modules/playwright-core/package.json'
    REPLACE='playwright-core/package.json'
    
    # Apply the string replacement (macOS compatible sed)
    sed -i '' "s|$SEARCH|$REPLACE|g" "$TARGET_FILE"
    
    echo "✅ Success! The path has been corrected."
else
    echo "❌ Error: Could not find @kriptonian/symphony."
    echo "Please ensure it is installed via 'npm install -g' or 'bun install -g'."
    exit 1
fi