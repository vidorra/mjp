# ---- Builder: installeert alles + bouwt (wordt weggegooid) ----
FROM node:20-alpine AS builder
RUN apk add --no-cache tzdata
RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

RUN npm run build

# DevDependencies + build-cache weggooien
RUN npm prune --omit=dev && rm -rf .next/cache .next/standalone

# ---- Runner: schone image zonder compilers ----
FROM node:20-alpine AS runner
RUN apk add --no-cache tzdata
ENV TZ=Europe/Brussels
RUN cp /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

CMD [ "npm", "start" ]
