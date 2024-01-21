# REST WEB SERVER

## Install Production Dependencies

```bash
npm i -D yargs
```

## Install Dev Dependencies

```bash
npm i -D @types/node @types/yargs rimraf typescript ts-node-dev
```

## Initialize Typescript Configuration:

```bash
npx tsc --init --outDir dist/ --rootDir src/
```

## Modify ```tsconfig.json```:

```json
"compilerOptions": {
  // previous configuration ...
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "test/**/*.spec.ts",
    "test/**/*.test.ts",
  ],
}
```

## Create ```src/``` folder:

```bash
mkdir src
```

## Create ```index.ts``` file inside ```src/``` folder:

```bash
touch src/index.ts
echo 'console.log("NodeJs Running")' > src/index.ts
```

## Modify ```package.json``` and replace the following code with:

```json
"name": "name-of-your-application",
"version": "0.0.0",
"description": "Some custom description here.",
// ...
"main": "app.js",
// ...
"scripts": {
  "dev": "tsnd --respawn src/index.ts -- src/app.ts",
  "build": "rimraf ./dist && && tsc",
  "start": "npm run build && node dist/app.js"
},
// ...
"author": "Your name here",
// ...
"license": "UNLICENSED",
```

## Create and edit ```.gitignore```

```bash
touch .gitignore
```

**Ignore the necessary folders and files:**

```
node_modules/
dist/
```

## Run Development:

```bash
npm run dev
```

**Now the server will run something similar:**

```bash
[nodemon] watching extensions: ts,js
[nodemon] starting `npx ts-node-dev --inspect -- ./src/app.ts`
[INFO] 22:30:12 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.3.3)
Debugger listening on ws://127.0.0.1:9229/94639663-8da0-4a7b-b178-9ce8b2e00d7f
For help, see: https://nodejs.org/en/docs/inspector
NodeJs Running
[nodemon] clean exit - waiting for changes before restart
```

## Don't forget to initialize ```GIT```:

```bash
git init
git add .
git commit -m "initial-configuration"
git tag 0.0.0
```

**NOTE: git tags are useful to keep track semantic versioning with package.json.**

**So don't forget to update this number accordingly with your version:**

```json
{
  // ...
  "version": "0.0.0",
  // ...
}
```

## Install testing dependencies

```bash
npm install jest @types/jest ts-jest supertest
```

## Create jest configuration file.

```bash
npx jest --init
```

## Configure ```jest.config.ts```.

```typescript
const config: Config = {
  // ...

  preset: "ts-jest",
  testEnvironment: "jest-environment-node",

  // Optional - The paths for modules that run some
  // code to configure or set up the testing
  // environment for each test.

  // setupFiles: ['dotenv/config'],
}
```

## Create scripts for testing in ```package.json```

```json
{
  // ...
  "scripts": [
    // ...
    "test": "NODE_OPTIONS=--experimental-vm-modules jest --silent",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch",
    "test:coverage": "jest --coverage"
  ],
  // ...
}
```

## Config Environment Variables

```bash
touch .env.template
```

**1. Put the following data to: ```.env.template```:**

```
PORT=
PUBLIC_PATH=
```

**2. Copy and paste from ```.env.template``` to ```.env``` and edit values:**

```
PORT=3000
PUBLIC_PATH=public
```

```bash
cp .env.template .env
```

**3. Install ```dotenv``` and ```env-var``` packages:**

```bash
npm i dotenv env-var
```

**3. Create file ```src/config/envs.ts``` and put following data:**

```typescript
import 'dot-env/config';
import { get } from 'env-var';

export default {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
};
```

## Docker

**Load Docker Image**

```bash
# Detach Mode
docker compose up -d
```

## Prisma

**1. Generate Client**

```bash
npx prisma generate
```

**2. Migrate Tables**

```bash
npx prisma migrate dev
```

## Update Package JSON

```json
// ...
"docker:test": "docker compose -f docker-compose.test.yaml --env-file .env.test up -d",
// ...
```

## Create .env.test.template

**Add this following code**

```
PORT=3000
HOST=http://localhost
MAILER_SERVICE=gmail
MAILER_EMAIL=user@domain.com
MAILER_SECRET_KEY=# secret key
PRODUCTION=false

MONGO_URL="mongodb://<change_user>:<change_password>@localhost:27017"
MONGO_DB_NAME=DATABASE_NAME
MONGO_USER=DATABASE_USERNAME
MONGO_PASSWORD=DATABASE_PASSWORD

POSTGRES_URL="postgres://<change_user>:<change_password>@localhost:5432/DATABASE_NAME"
POSTGRES_DB=DATABASE_NAME
POSTGRES_USER=DATABASE_USERNAME
POSTGRES_PASSWORD=DATABASE_PASSWORD
```

## Create .env.test and modify necessary changes

```bash
cp .env.test.template .env.test
```

## Don't forget to ignore .env.test in .gitignore

```text
...

# Local env files
.env
.env.test # <-- Append this line
```

## Create setupTests.ts and put the following code

```typescript
import { config } from "dotenv";

config({
  path: ".env.test",
});
```

## Modify ```jest.config.ts```

```typescript
// ...
setupFiles: [
  "<rootDir>/setupTests.ts", // <-- Add this configuration
], 
```

## Generate Certificates

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

## Express JS

```bash
# Install production package
npm i express 
```

```bash
# Install types as development package for typescript
npm i @types/express
```