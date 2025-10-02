# docker developpement
ARG MIN_UID=1000
ARG MAX_UID=1500
FROM node:21 AS dev
ARG MIN_UID
ARG MAX_UID
SHELL ["/bin/bash", "-c"]
RUN mkdir /etc/skel/.config /etc/skel/.npm && userdel -rf node
RUN for (( uid=${MIN_UID}; uid<=${MAX_UID}; uid++ )); do useradd --uid $uid --user-group --create-home --shell /bin/bash user${uid}; done
VOLUME ["/app"]
EXPOSE 8000
WORKDIR /app

# building stage
FROM node:current-alpine3.20 AS build-stage
USER node
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npm run build

# mise en production
FROM nginx:stable-alpine3.20 AS prod
ENV NODE_ENV production
COPY --from=build-stage /app/dist /var/www/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80