
FROM node:14-alpine
WORKDIR /web-server-inbound:outbound
COPY . .
RUN npm install --production
CMD ["node","./server.js"]
EXPOSE 8080