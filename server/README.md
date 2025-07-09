# Note Taking App - Server

This is the backend server for the Note Taking App. It provides RESTful APIs for managing notes, users, and authentication.

## Features

- User registration and authentication (JWT-based)
- CRUD operations for notes (create, read, delete)
- Secure API endpoints
- Error handling and validation

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** for authentication

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

```bash
git clone https://github.com/tejvir21/Brain-Box.git
cd Brain-Box/server
npm install
```

### Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/noteapp
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_pass_for _third_party_access
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Auth

- `POST /api/auth` - Register a new user
- `POST /api/auth` - Login and receive a JWT

### Notes

- `GET /api/notes` - Get all notes for the authenticated user
- `POST /api/notes` - Create a new note
- `DELETE /api/notes/:id` - Delete a note

## Folder Structure

```
server/
├── controllers/
├── models/
├── routes/
├── utils/
├── .env
├── server.js
└── README.md
```

## License

This project is licensed under the MIT License.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
