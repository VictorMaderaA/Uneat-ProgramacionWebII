FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

CMD [ "node", "dist/index.js" ]

EXPOSE 5000
