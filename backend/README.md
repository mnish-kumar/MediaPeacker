# MediaPeacker Backend

A Node.js backend service for media searching and user authentication.

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Redis server (optional)

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Environment Configuration:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your actual values in the `.env` file:
     - `DB_URI`: Your MongoDB connection string
     - `JWT_SECRET_KEY`: A secure secret key for JWT tokens
     - `UNSPLASH_ACCESS_KEY`: Your Unsplash API key
     - `TENOR_API_KEY`: Your Tenor API key
     - `PEXELS_API_KEY`: Your Pexels API key

4. Start the server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET_KEY` | Secret key for JWT token signing | Yes |
| `UNSPLASH_ACCESS_KEY` | API key for Unsplash image service | Yes |
| `TENOR_API_KEY` | API key for Tenor GIF service | Yes |
| `PEXELS_API_KEY` | API key for Pexels image/video service | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment mode (development/production) | No |

## API Endpoints

- Authentication routes: `/api/auth/*`
- Media search routes: `/api/media/*`

## Project Structure

```
src/
├── controllers/     # Route controllers
├── middlewares/     # Express middlewares
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic services
├── db/            # Database configuration
└── redis/         # Redis client configuration
```

## Security

- Environment variables are used for sensitive configuration
- JWT tokens for authentication
- Password hashing with bcrypt
- CORS protection enabled

**Important:** Never commit your `.env` file to version control. It contains sensitive information.