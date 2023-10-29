# Admin panel

## Description

This is a simple admin panel for managing users and their information.

During the initial use, there will be two requests made to https://reqres.in/api/users.

Afterward, all data will be stored in local storage.

To update the data from the server, please clear the local storage.


## Run locally
```
npm i
npm run dev
```

## Run using Docker
```
docker build -t td-admin .
docker run -it -p 8000:8000 --rm td-admin
```