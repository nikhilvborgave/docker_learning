FROM node:lts-alpine3.23
LABEL author="nikhil"
WORKDIR /app
COPY package.json /app
RUN npm install
COPY server.js /app
EXPOSE 3000
CMD ["node", "server.js"]
