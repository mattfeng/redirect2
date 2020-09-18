FROM node:12

RUN mkdir -p /db

RUN npm install -g nodemon

# install the app
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["nodemon"]
CMD ["./bin/www"]