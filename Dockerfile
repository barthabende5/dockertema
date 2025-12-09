FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25
COPY --from=build /app/dist/dockerproji/ /usr/share/nginx/html
EXPOSE 80
