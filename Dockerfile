# syntax=docker/dockerfile:1

ARG NODE_VERSION=22-bookworm-slim

FROM node:${NODE_VERSION} AS deps
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY scripts ./scripts

RUN npm ci

FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY scripts ./scripts
COPY lib/db ./lib/db

RUN npm ci --omit=dev --ignore-scripts \
    && npx prisma generate \
    && npm cache clean --force

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/data ./data
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next", "start", "-p", "3000"]
