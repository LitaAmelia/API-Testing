# API-Testing

## Installation

Testing API Go REST requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies.

```sh
npm init -y
npm install mocha chai supertest axios dotenv mochawesome --save-dev
```

For production environments...

add file .env
```sh
API_TOKEN= 'ur token'
```

Running

```sh
npm test
```
