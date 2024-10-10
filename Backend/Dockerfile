FROM node:22-bullseye-slim

WORKDIR /app

COPY package.json ./
RUN npm install --production 

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "server.js"]


