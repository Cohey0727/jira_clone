<h1 align="center">Jira Clone</h1>

## How to get started

- install libraries

```shell
npm run install-dependencies
```

- database container start

```shell
docker pull postgres:latest
docker run -d \
  --name jira_postgres \
  -e POSTGRES_PASSWORD=password \
  -p 6543:5432 \
  postgres

# Connect Database and create database jira_development
```


- migration database

```shell
cd api/
ts-node ./node_modules/typeorm/cli.js migration:run
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