FROM node:16 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
FROM nginx:1.21

COPY --from=build /app/dist/my_app /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf