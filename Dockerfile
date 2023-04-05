FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /dist/my_app /usr/share/nginx/html