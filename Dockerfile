FROM node:20-alpine

WORKDIR /app

ENV PORT=3000

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
