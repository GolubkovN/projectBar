FROM node:12-alpine as builder
WORKDIR /usr/app
COPY package.json /usr/app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /usr/app
RUN npm run build

FROM node:12-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/build /usr/app
COPY package.json /usr/app/package.json
RUN npm install --only=prod
EXPOSE 3000
USER node
CMD ["node", "index.js"]
