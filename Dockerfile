FROM nginx:alpine

COPY index.html podpisi.txt script.js style.css /usr/share/nginx/html/
