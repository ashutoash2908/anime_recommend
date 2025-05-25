# Anime Recommendation System - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Render](https://img.shields.io/badge/Deployed_on-Render-46d3ff)

A REST API backend for an anime recommendation system using the AniList GraphQL API, built with Node.js, Express, and PostgreSQL.

##  Live Deployment
**Backend API**: [https://anime-recommend-0og0.onrender.com](https://anime-recommend-0og0.onrender.com)  


##  Features
- JWT Authentication (Register/Login)
- Anime search by name or genre
- Personalized recommendations based on user preferences
- PostgreSQL database integration
- CORS-enabled for frontend connectivity
- Rate limiting for API endpoints

##  Tech Stack
- **Framework**: Express.js
- **Database**: PostgreSQL (with Sequelize ORM)
- **Authentication**: JWT
- **External API**: AniList GraphQL API
- **Deployment**: Render.com

## Getting Started

### Prerequisites
- Node.js 18.x
- PostgreSQL 15+
- AniList API access (no key required)

### Installation

  
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/anime-recommendation-backend.git
   cd anime-recommendation-backend

 ### to run
 npm install
 nodemon app.js

 ## 🔧 Environment Variables Template

Create a `.env` file in your project root with the following variables:

```env
# ========================
# Database Configuration
# ========================
DB_NAME=anime_recommendation
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432  # Default PostgreSQL port

# ========================
# JWT Authentication
# ========================
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d  # Token expiration (e.g., 7d, 24h)

# ========================
# Server Configuration
# ========================
PORT=5000  # Server port

# ========================
# External APIs
# ========================
ANILIST_API_URL=https://graphql.anilist.co  # AniList GraphQL endpoint

# ========================
# Production Overrides (Render.com)
# ========================
# DATABASE_URL=postgres://user:password@host:5432/dbname
# NODE_ENV=production
