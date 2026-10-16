FROM node:20-alpine
LABEL org.opencontainers.image.source="https://github.com/jubsju/techsecure-devsecops"
RUN apk upgrade --no-cache
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev \
 && npm cache clean --force \
 && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
COPY src ./src
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]
