FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node server.js"]
