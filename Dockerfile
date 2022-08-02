# -----------------------------------------------
# Builder
# -----------------------------------------------
FROM node:16.16 as builder

RUN apt-get update -y && \
    apt-get install -y build-essential git python3 && \
    apt-get clean && \
    rm -f /var/lib/apt/lists/*_*

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-color --unsafe-perm

COPY . .

RUN npm run build

# -----------------------------------------------
# Runner
# -----------------------------------------------
FROM node:16.16 as runner

WORKDIR /app

COPY --from=builder . .

CMD ["npm", "run", "server", "--prefix", "app"]
