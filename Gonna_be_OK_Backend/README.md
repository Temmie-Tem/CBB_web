# Gonna_be_OK Backend

This directory contains a simple Express server used for development.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
   The server listens on port `4000` by default.

## Database

A MySQL/MariaDB database is expected. Use the `schema.sql` file to create
the `users` table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(50),
    email VARCHAR(255),
    birth_date DATE
);
```
