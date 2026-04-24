# 📱 Social Media Dashboard

A full-stack social media platform built with the **MERN stack** — featuring real-time messaging, user profiles with media uploads, likes/comments/follows, and an analytics dashboard.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Real-time | Socket.IO |
| Notifications | Redis |
| Media Storage | Cloudinary |

## Features

- 🔐 JWT-based authentication (login / register)
- 👤 User profiles with avatar & cover image upload
- 📝 Create, like, and comment on posts
- 👥 Follow / unfollow users
- 💬 Real-time messaging (WebSockets)
- 🔔 Redis-powered notification system
- 📊 Analytics dashboard for engagement tracking

## Project Structure

```
social-media-dashboard/
├── backend/    → Node.js + Express API
└── frontend/   → React + Vite client
```

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Redis (for notifications — Day 7)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
See `backend/.env.example` for all required variables.

## Development Timeline

Built over 7 days with 25–30 meaningful commits — see commit history for day-by-day progress.

## License

MIT
