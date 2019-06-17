# Build static react application
FROM node:lts as node-build

WORKDIR /home/node/app
COPY *.json /home/node/app/
RUN npm ci

# Build a production application.
COPY . /home/node/app/
RUN npm run build

# Create a minimal nginx runtime container
FROM nginx as react-runtime
COPY --from=node-build /home/node/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
