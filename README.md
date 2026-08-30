# Online Bag Shop

An Express and EJS shopping application with customer and owner workflows.

## Features

- User and owner authentication
- Product creation and image uploads
- Product catalogue and shopping cart
- Cookie-based JWT authentication
- MongoDB persistence

## Tech stack

Node.js, Express, EJS, MongoDB, Mongoose, JWT, Multer

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The application requires `MONGODB_URI`, `JWT_KEY`, and `SESSION_SECRET`.
