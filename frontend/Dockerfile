# ---------- Base builder ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Ha pnpm/yarn-t használsz, itt válts annak megfelelően
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Prod build (dev módban ezt a stage-et nem használjuk)
RUN npm run build

# ---------- Production server (nginx) ----------
FROM nginx:alpine AS prod
# A buildelt statikus fájlok bemásolása
COPY --from=builder /app/dist /usr/share/nginx/html
# Alap nginx config is elég, ez már kiszolgálja a /usr/share/nginx/html tartalmat
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ---------- Development (Vite dev server) ----------
# Használat: docker build --target dev -t finance-frontend:dev .
FROM node:20-alpine AS dev
WORKDIR /app
ENV HOST=0.0.0.0
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
