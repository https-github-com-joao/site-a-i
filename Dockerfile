FROM node:16-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json /app/

RUN adduser -D -u 1001 jenkins

USER jenkins

ADD . /app

#RUN npm install
#RUN npm run build
#RUN npm prune --production

CMD [ "node", "./dist/app.js" ]