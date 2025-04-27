FROM node:18
WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

CMD ["npm", "run", "start:dev"]