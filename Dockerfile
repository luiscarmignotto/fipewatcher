FROM node:17-alpine as builder
WORKDIR /app

ENV REACT_APP_VERSION "versionPlaceHolder"
ENV REACT_APP_BACKEND_SERVICE_NAME "localhost"
ENV REACT_APP_BACKEND_SERVICE_PORT "4000"

COPY package.json .
RUN npm install
COPY . . 
RUN npm run build 

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

RUN sed -i 's/user  nginx;/user  root;/g' /etc/nginx/nginx.conf

COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]