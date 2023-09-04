# TodoList API

This is a simple TodoList API implemented using Docker, MySQL, SQL, Express, Node.js, TypeScript, Joi, Mocha, and Chai. This README provides a brief overview of the project and instructions for setup and testing.

## Prerequisites

Before you begin, make sure you have the following tools and technologies installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd todo-list-api
   ```

1. Setup environment variables:

   ```bash
   touch .env
   ```

   copy and paste the `.env.sample` in to `.env`

1. Run docker:

   ```bash
   docker-compose up

   #or

   docker compose up
   ```

1. Enter api container:

   ```bash
   docker exec -it todo_list_api bash
   ```

1. Install project dependencies:

   ```bash
   npm i
   ```

1. Get the server up

   `dev mode`

   ```bash
   npm run dev
   ```

   `build`

   ```bash
   npm run start
   ```

## Run tests

```bash
npm test
```

## `Thunder Client`

`Thunder Client` is a easy method to make api requests inside of VSCode. It's pretty cool and simple.

To install just search for `Thunder Client` on the tab extensions on your VSCode then hit the install button.

### To import collection do the following

Open the Thunder Client tab > Collections > Menu > Import > Choose the file `thunder-collection_todos.json`

![Import collection](/imgs/thunder-collection-install.png)
