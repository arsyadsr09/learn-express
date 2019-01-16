# Learn Express

## How to Use

Install dependencies:

```sh
yarn
```

Start server with `node`:

```sh
node index.js
```

Start with `nodemon`:

```sh
nodemon index.js
```

Access the endpoints via browser, httpie, or Postman.

## API Endpoints

musics:

| Route                       | HTTP Verb | Description                  |
| --------------------------- | --------- | ---------------------------- |
| `/musics`                   | `GET`     | Get all the musics           |
| `/musics/:id`               | `GET`     | Get a single music           |
| `/musics`                   | `POST`    | Save a new music             |
| `/musics/search?name=:name` | `GET`     | Search music by name         |
| `/musics`                   | `DELETE`  | Remove all the musics        |
| `/musics/:id`               | `DELETE`  | Remove a music               |
| `/musics/:id`               | `PUT`     | Update an item with new info |
