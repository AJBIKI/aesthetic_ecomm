# Build Test Suite — The Monsoon Club Backend
# Run: bash test.sh or double-click

Write-Host "========================================"
Write-Host "  The Monsoon Club — Backend Tests"
Write-Host "========================================"
Write-Host ""

# 1. TypeScript type-check
Write-Host "[1/4] Running TypeScript type check..."
$tsc = & "npx" "--package" "typescript" "tsc" "--noEmit" 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ TypeScript compiles clean" -ForegroundColor Green
} else {
    Write-Host "  ❌ TypeScript errors:" -ForegroundColor Red
    Write-Host $tsc
    exit 1
}

# 2. Prisma validation
Write-Host "[2/4] Validating Prisma schema..."
$prisma = & "npx" "prisma" "validate" 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Prisma schema valid" -ForegroundColor Green
} else {
    Write-Host "  ❌ Prisma errors:" -ForegroundColor Red
    Write-Host $prisma
    exit 1
}

# 3. NestJS build
Write-Host "[3/4] Running NestJS build..."
$build = & "npx" "nest" "build" 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ NestJS build successful" -ForegroundColor Green
} else {
    Write-Host "  ❌ Build failed:" -ForegroundColor Red
    Write-Host $build
    exit 1
}

# 4. Check all source files exist
Write-Host "[4/4] Verifying file structure..."
$expected = @(
    "src/main.ts",
    "src/app.module.ts",
    "src/prisma/prisma.service.ts",
    "src/prisma/prisma.module.ts",
    "src/common/interceptors/response.interceptor.ts",
    "src/common/filters/http-exception.filter.ts",
    "src/common/guards/jwt-auth.guard.ts",
    "src/common/decorators/current-user.decorator.ts",
    "src/issues/issues.controller.ts",
    "src/issues/issues.service.ts",
    "src/volumes/volumes.controller.ts",
    "src/volumes/volumes.service.ts",
    "src/products/products.controller.ts",
    "src/products/products.service.ts",
    "src/orders/orders.controller.ts",
    "src/orders/orders.service.ts",
    "src/payments/payments.service.ts",
    "src/admin/auth/auth.controller.ts",
    "src/admin/auth/auth.service.ts",
    "src/admin/auth/jwt.strategy.ts",
    "src/admin/products/admin-products.controller.ts",
    "src/admin/orders/admin-orders.controller.ts",
    "src/admin/upload/upload.controller.ts",
    "prisma/schema.prisma",
    "prisma/seed.ts"
)

$missing = 0
foreach ($file in $expected) {
    if (-not (Test-Path $file)) {
        Write-Host "  ❌ Missing: $file" -ForegroundColor Red
        $missing++
    }
}

if ($missing -eq 0) {
    Write-Host "  ✅ All $($expected.Count) source files present" -ForegroundColor Green
} else {
    Write-Host "  ❌ $missing file(s) missing" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================"
Write-Host "  ✅ ALL TESTS PASSED" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""
Write-Host "To run the server:"
Write-Host "  1. Start PostgreSQL"
Write-Host "  2. npx prisma db push"
Write-Host "  3. npx ts-node prisma/seed.ts"
Write-Host "  4. npm run start:dev"
