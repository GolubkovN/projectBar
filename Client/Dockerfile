FROM node:12-alpine as build
RUN mkdir /usr/app
WORKDIR /usr/app
COPY package.json /usr/app/package.json
RUN apk add git
RUN npm install --only=prod
COPY . /usr/app
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/app/dist /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY config /etc/nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]