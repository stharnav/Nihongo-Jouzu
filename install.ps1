# Run this script to install all dependencies
Write-Host "Installing client dependencies..." -ForegroundColor Green
Set-Location client
npm install
Set-Location ..

Write-Host "Installing server dependencies..." -ForegroundColor Green
Set-Location server
npm install
Set-Location ..

Write-Host "All dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the app:"
Write-Host "  npm run dev      (root — starts Vite dev server on :5173)"
Write-Host ""
Write-Host "For Render:"
Write-Host "  Build command: npm install && npm run build"
Write-Host "  Start command: npm start"
