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
Write-Host "  Terminal 1: cd server && npm run dev"
Write-Host "  Terminal 2: cd client && npm run dev"
