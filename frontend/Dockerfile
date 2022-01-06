# Dockerfile for React frontend

FROM node:12-alpine

RUN apk add --no-cache python2 g++ make

WORKDIR /frontend

COPY . .

RUN npm install --production

CMD ["npm", "start"]
