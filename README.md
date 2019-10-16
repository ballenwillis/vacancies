# Vacancies
Teamfinder project -- We help people who want to work on a side project find a team to make it happen

# Getting started - local env

## Database
- Go to the Database directory `cd Database`
- Create a database called `vacancies`
- Run `initial-setup.sql` on the `public` schema.

## API
- Go to the API directory `cd API`
- Install all dependencies using [`yarn`](https://yarnpkg.com)
- Copy [`.env_template`](API/.env_template) to [`.env`](API/.env_template) and populate as needed:
  ```sh
    cp .env_template .env
  ```
- **Start the server** 🚀 - `yarn start`
- Server should start 🌎
  > you should see `Listening on port $PORT` in the console where $PORT is the port you set in `.env`

## Client
- Go to the client directory `cd client`
- Install all dependencies using [`yarn`](https://yarnpkg.com)
- **start development server** 🚀 - `yarn start`
