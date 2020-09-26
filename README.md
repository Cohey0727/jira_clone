<h1 align="center">Jira Clone</h1>

## How to get started

- install libraries

```shell
npm run install-dependencies
```

- migration database

```shell
cd api/
npx typeorm migration:run

```

- start api

``` shell
cd api/
npm start
```

- start client

``` shell
cd client/
npm start
```