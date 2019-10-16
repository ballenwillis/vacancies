# Vacancies
CS411 project -- We help people who want to work on a side project find a team to make it happen

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
- Go to the client directory `cd Vacancies`
- Install all dependencies using [`yarn`](https://yarnpkg.com)
- **start development server** 🚀 - `yarn start`


# CS 411 Stage 3 Requirements:
- Server Setup: a detailed description of how you set up your project local or remote server. OPTIONAL: provide screenshots to show that your server is up and running.

[See Above]
- If you are hosting your project remotely, please answer the following questions:
  1. what platform have you used (e.g., cPanel, AWS...)?
  
  We will be using AWS to host our API and our database using RDS and EC2.
  2. fill in Project Setup Report URL on your project page.
- Database Setup: please answer the following questions:
  1. What relational database system have you used?
    
    We are using PostgresQL.
    
  2. How you plan to import real data?
    
    We will collect real data through Google forms. We have pretty wide reach in both the tech world and the student ecosystem. This will not be hard to collect. The harder part will be either creating fake profiles or convincing people to signup for the app in order for us to post their project.
