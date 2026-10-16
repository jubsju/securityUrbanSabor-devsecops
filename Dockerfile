FROM node:20-alpine
LABEL org.opencontainers.image.source="https://github.com/jubsju/techsecure-devsecops"
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]
