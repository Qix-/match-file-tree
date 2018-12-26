FROM mhart/alpine-node:11.3.0
WORKDIR /src
COPY package.json ./
RUN npm i
COPY test ./test/
COPY index.js ./
RUN npm run test
