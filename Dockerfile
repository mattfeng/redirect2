FROM node:12

RUN mkdir -p /db

# install the app
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
ENTRYPOINT ["nodemon"]
CMD ["./bin/www"]