# QuickLib

QuickLib is a full-stack library management system designed for colleges and universities. It provides RESTful APIs for core operations and GraphQL subscriptions for real-time messaging and chat. The project is built with Node.js, Express, MongoDB, Apollo Server, and React.

## Features

- **User Authentication:** Register, login, JWT-based authentication, and role-based access (Admin/Student).
- **Book Management:** Add, update, delete, and search books.
- **Issue & Return:** Request, approve, issue, return, and re-issue books with fine calculation.
- **Reviews:** Users can review books, view reviews by book or user, and delete reviews.
- **Messaging & Chat:** Real-time chat and notifications using GraphQL subscriptions.
- **Validation:** Robust input validation using Joi.
- **REST & GraphQL:** REST APIs for CRUD operations, GraphQL for chat/messages.
- **Admin Dashboard:** Statistics on issued books, fines, and monthly reports.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Apollo Server (GraphQL), Joi
- **Frontend:** React (see `/frontend`)
- **Real-time:** GraphQL Subscriptions (Apollo, WebSocket)
- **Authentication:** JWT, Cookies

## Folder Structure

```
QuickLib/
├── Backend/
│   ├── Controller/         # Route controllers (Auth, Book, Issue, Review, etc.)
│   ├── Models/             # Mongoose models (User, Book, Issue, Review, Message)
│   ├── Middlwares/         # Custom middlewares (Auth, Validation, Error, Logger)
│   ├── Routes/             # Express routers
│   ├── Schema/             # GraphQL typeDefs & resolvers
│   ├── Server/             # PubSub and WebSocket setup
│   ├── utils/              # Utility functions (email, catchAsync, etc.)
│   └── index.js            # Main server entry point
├── frontend/               # React frontend (not detailed here)
├── uploads/                # Static file uploads
├── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/QuickLib.git
   cd QuickLib
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in `/Backend` with:
   ```
   DATABASE=mongodb+srv://<username>:<db_password>@cluster.mongodb.net/quicklib
   DATABASE_PASSWORD=your_db_password
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_COOKIE_EXPIRES_IN=7
   PORT=8080
   ```

4. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

- **Start Backend:**
  ```bash
  cd Backend
  npm start
  ```
- **Start Frontend:**
  ```bash
  cd ../frontend
  npm start
  ```

### API Endpoints

#### REST

- `/api/v1/user/signup` - Register user
- `/api/v1/user/login` - Login
- `/api/v1/books` - CRUD for books
- `/api/v1/issueBook` - Issue/return books
- `/api/v1/issuedBooks` - List issued books
- `/api/v1/reviews` - Create, get, delete reviews

#### GraphQL

- `/graphql` - GraphQL endpoint (Apollo Server)
- Subscriptions for chat/messages

### Validation

All major endpoints use Joi validation for request bodies.

### Messaging & Chat

Real-time chat and notifications are handled via GraphQL subscriptions using Apollo Server and WebSocket.

---

**Made with ❤️**