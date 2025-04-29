FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm build

CMD ["npm", "run", "start"]
