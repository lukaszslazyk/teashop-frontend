FROM node:12.19.0-alpine AS build-env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY teashop_frontend/package.json ./
COPY teashop_frontend/package-lock.json ./
RUN npm ci

ARG API_ROOT
ARG CDN_ROOT

COPY teashop_frontend/ ./
RUN REACT_APP_API_ROOT=$API_ROOT \
    REACT_APP_CDN_ROOT=$CDN_ROOT \
    npm run build

FROM nginx:stable-alpine
COPY --from=build-env /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
