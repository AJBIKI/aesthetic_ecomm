# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Install Prisma v6 CLI for generate
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client and build
RUN npx prisma generate
RUN npx @nestjs/cli build

# ---- Production Stage ----
FROM node:22-alpine

WORKDIR /app

# Copy built output and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client again for final image
RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/src/main"]
