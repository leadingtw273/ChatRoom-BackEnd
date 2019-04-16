FROM keymetrics/pm2:8-alpine
WORKDIR /app

COPY package.json /app
RUN npm install --production

COPY . /app
EXPOSE 5000

CMD [ "pm2-runtime", "start", "pm2.config.js", "--env", "production" ]