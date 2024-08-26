
FROM node:14-alpine
WORKDIR /web-server-inbound:outbound

#source code
COPY . /web-server-inbound:outbound/.
EXPOSE 8080


RUN npm install --production
CMD ["node","./server.js"]
