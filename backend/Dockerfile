FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm install

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate --schema=src/db/prisma/schema.prisma
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/db/prisma ./src/db/prisma
COPY package*.json ./

RUN mkdir -p uploads/portfolio uploads/blog

EXPOSE 4000

CMD ["node", "dist/server.js"]
