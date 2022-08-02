# -----------------------------------------------
# Builder
# -----------------------------------------------
FROM node:16.16 as builder

RUN apt-get update -y && \
    apt-get install -y build-essential git python3 && \
    apt-get clean && \
    rm -f /var/lib/apt/lists/*_*

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-color --unsafe-perm

COPY . .

RUN npm run build

# -----------------------------------------------
# Runner
# -----------------------------------------------
FROM node:16.16 as runner

WORKDIR /app

COPY --from=builder /build/config ./config
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node-server ./node-server
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json /build/package-lock.json ./

CMD ["npm", "run", "server"]
