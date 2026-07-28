#!/usr/bin/env bash
set -e

echo "========================================"
echo "  The Monsoon Club — Backend Tests"
echo "========================================"
echo ""

# 1. TypeScript type-check
echo "[1/4] Running TypeScript type check..."
if npx --package typescript tsc --noEmit 2>&1; then
    echo "  ✅ TypeScript compiles clean"
else
    echo "  ❌ TypeScript errors"
    exit 1
fi

# 2. Prisma validation
echo "[2/4] Validating Prisma schema..."
if npx prisma validate 2>&1; then
    echo "  ✅ Prisma schema valid"
else
    echo "  ❌ Prisma errors"
    exit 1
fi

# 3. NestJS build
echo "[3/4] Running NestJS build..."
if npx nest build 2>&1; then
    echo "  ✅ NestJS build successful"
else
    echo "  ❌ Build failed"
    exit 1
fi

# 4. Check all source files
echo "[4/4] Verifying file structure..."
expected_files=(
    "src/main.ts"
    "src/app.module.ts"
    "src/prisma/prisma.service.ts"
    "src/prisma/prisma.module.ts"
    "src/common/interceptors/response.interceptor.ts"
    "src/common/filters/http-exception.filter.ts"
    "src/common/guards/jwt-auth.guard.ts"
    "src/common/decorators/current-user.decorator.ts"
    "src/issues/issues.controller.ts"
    "src/issues/issues.service.ts"
    "src/volumes/volumes.controller.ts"
    "src/volumes/volumes.service.ts"
    "src/products/products.controller.ts"
    "src/products/products.service.ts"
    "src/orders/orders.controller.ts"
    "src/orders/orders.service.ts"
    "src/payments/payments.service.ts"
    "src/admin/auth/auth.controller.ts"
    "src/admin/auth/auth.service.ts"
    "src/admin/auth/jwt.strategy.ts"
    "src/admin/products/admin-products.controller.ts"
    "src/admin/orders/admin-orders.controller.ts"
    "src/admin/upload/upload.controller.ts"
    "prisma/schema.prisma"
    "prisma/seed.ts"
)

missing=0
for file in "${expected_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "  ❌ Missing: $file"
        missing=$((missing + 1))
    fi
done

if [ $missing -eq 0 ]; then
    echo "  ✅ All ${#expected_files[@]} source files present"
else
    echo "  ❌ $missing file(s) missing"
    exit 1
fi

echo ""
echo "========================================"
echo "  ✅ ALL TESTS PASSED"
echo "========================================"
echo ""
echo "To run the server:"
echo "  1. Start PostgreSQL"
echo "  2. npx prisma db push"
echo "  3. npx ts-node prisma/seed.ts"
echo "  4. npm run start:dev"
