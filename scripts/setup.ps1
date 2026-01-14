Write-Host "🚀 Starting setup..."

# 1. Define the file we need to patch
# We capture the output of symphony --help and look for the path
try {
    # 2>&1 redirects stderr to stdout in PowerShell
    $symphonyOutput = symphony --help 2>&1 | Out-String
    
    # Regex to match: from '/path/to/file' or from "path/to/file"
    if ($symphonyOutput -match "from ['""]([^'""]*)['""]") {
        $TARGET_FILE = $matches[1]
    } else {
        $TARGET_FILE = $null
    }
} catch {
    Write-Host "Warning: Could not run symphony command. Ensure it is in your PATH." -ForegroundColor Yellow
    $TARGET_FILE = $null
}

# Install Playwright browsers
Write-Host "Installing Playwright browsers..."
npm install playwright@1.56.0
npx playwright install chromium webkit firefox

# 2. Check if the patch is needed
if (-not $TARGET_FILE) {
    Write-Host "✅ Setup is already done or target file not found. No patch needed."
    return
}

# 3. Add playwright-core
# check if installed globally
$pkgCheck = npm list -g playwright-core --depth=0 2>$null | Out-String
if ($pkgCheck -notmatch "playwright-core@") {
    Write-Host "Adding playwright-core globally..."
    npm install -g playwright-core
} else {
    Write-Host "✅ playwright-core is already installed globally."
}

Write-Host "🔍 Searching for Symphony..."

# 4. Apply the patch
if (Test-Path "$TARGET_FILE") {
    Write-Host "📍 Found at: $TARGET_FILE"
    Write-Host "🛠  Applying the fix..."

    $SEARCH = "/home/runner/work/symphony/symphony/node_modules/playwright-core/package.json"
    $REPLACE = "playwright-core/package.json"

    # Read, Replace, and Save
    # We use [regex]::Escape for the search string to ensure special chars like / don't break regex
    (Get-Content -Path "$TARGET_FILE") -replace [regex]::Escape($SEARCH), $REPLACE | Set-Content -Path "$TARGET_FILE"
    
    Write-Host "✅ Patch applied successfully."
} else {
    Write-Host "Target file does not exist at expected path." -ForegroundColor Red
}