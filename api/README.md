# Tech Evaluation API

This directory contains the backend RESTful API for the Tech Evaluation project. It provides endpoints for managing transactions, built with Node.js, Express, and MongoDB.

---

## Features
- **CRUD Operations** for transactions (Stake, Borrow, Lend)
- **Request validation** using `express-validator`
- **MongoDB** data storage via Mongoose
- **Environment-based configuration**
- **Security**: Helmet, Rate Limiting, mongo-sanitize
- **Logging**: Morgan (500 errors only)

---

## Security & Middleware
- **Helmet** for security headers
- **express-rate-limit** for rate limiting
- **express-mongo-sanitize** to prevent NoSQL injection
- **CORS** for cross-origin requests
- **Morgan** for error logging (500 errors only)
- **body-parser** for parsing JSON and URL-encoded requests
- **cookie-parser** for cookie support

---

## Tech Stack
- **Node.js** (ES Modules)
- **Express.js**
- **MongoDB** with **Mongoose**
- **express-validator** for request validation
- **dotenv** for environment management

---

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB database (local or remote)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and fill in your values:
   ```bash
   cp .env.example .env
   ```
3. Start the server:
   ```bash
   npm run dev
   # or
   node api/server.js
   ```

---

## Environment Variables
Set these in your `.env` file:
- `PORT` - Port for the API server (default: 5800)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - `development` or `production`

---

## API Endpoints

### Transactions
Base path: `/api/transactions`

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| GET    | `/`              | List all transactions (optionally filter by `type`) |
| GET    | `/:id`           | Get a transaction by ID      |
| POST   | `/`              | Create a new transaction     |
| PUT    | `/:id`           | Update a transaction         |
| DELETE | `/:id`           | Delete a transaction         |

#### Transaction Object
```
{
  _id: string,
  username?: string,
  transactionType: 'Stake' | 'Borrow' | 'Lend',
  token: string,
  amount: number,
  status: 'pending' | 'completed' | 'failed' | 'cancelled',
  description?: string,
  date: Date
}
```

#### Query Parameters
- `type` (optional, GET `/api/transactions`): Filter by transaction type (`Stake`, `Borrow`, or `Lend`)

#### Request Body (POST/PUT)
- `transactionType` (`Stake`, `Borrow`, `Lend`) [POST only]
- `token` (string)
- `amount` (number)
- `status` (`pending`, `completed`, `failed`, `cancelled`) [PUT only]
- `description` (string, optional)

#### Validation
- All endpoints use `express-validator` for strict validation. Errors are returned as:
  ```json
  { "errors": [ { "msg": "...", "param": "...", } ] }
  ```

#### Error Handling
- 400: Validation errors or bad input
- 404: Resource not found
- 500: Internal server errors

---

## Project Structure
```
api/
├── config/         # Database and contract configs
├── controllers/    # Route handler logic
├── models/         # Mongoose schemas
├── repositories/   # Data access logic
├── router/         # API route definitions
├── services/       # Business logic
├── utils/          # Validators and helpers
├── server.js       # Main entry point
└── README.md       # This file
```