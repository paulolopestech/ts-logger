FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

CMD ["npm", "start"]
