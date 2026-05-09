# User Management (Task 1)

This project is a User Management system built with Node.js, Express, Prisma, and PostgreSQL. It uses Docker to ensure a quick and easy setup process.

## Getting Started (via Docker)

To start the project along with all its dependencies (including the PostgreSQL database and the Node.js server), simply run the following command in your terminal:

```bash
docker compose up --build
```

### What does this command do?
1. **Database Setup:** Initializes the PostgreSQL database as configured in the `docker-compose.yml` file.
2. **Health Check:** Waits for the database to be fully ready before starting the application server.
3. **Build and Run:** Builds the Node.js application image from the `Dockerfile` and starts the server on port `5000`.

Once the application is fully running, you can access it by navigating to **http://localhost:5000**.
