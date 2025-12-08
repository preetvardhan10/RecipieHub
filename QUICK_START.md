# Quick Start Guide

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database (Neon DB recommended)
- npm or yarn

## Step 1: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create or update `backend/.env` file:
   ```env
   NODE_ENV=development
   PORT=5001
   DATABASE_URL=postgresql://your-connection-string-here
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   OPENAI_API_KEY=sk-your-key (optional)
   ```

4. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✅ PostgreSQL Connected via Prisma
   🚀 Server running on port 5001
   ```

## Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create or update `frontend/.env` file:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at: http://localhost:5173

## Step 3: Test the Application

1. Open http://localhost:5173 in your browser
2. Try signing up with a new account
3. Or login with existing credentials:
   - Email: `maria@example.com`
   - Password: `password123`

## Troubleshooting

### Backend won't start

**Error: DATABASE_URL not set**
- Make sure `DATABASE_URL` is in `backend/.env`
- Check the connection string is correct

**Error: Port already in use**
- Change `PORT` in `backend/.env` to a different port
- Update `VITE_API_URL` in `frontend/.env` to match

### Frontend can't connect to backend

**Error: ERR_CONNECTION_REFUSED**
- Make sure backend is running (`npm run dev` in backend folder)
- Check backend is on port 5001
- Verify `VITE_API_URL` in `frontend/.env` is `http://localhost:5001/api`

### Can't signup/login

- Check backend server is running
- Check browser console for errors
- Verify DATABASE_URL is correct and database is accessible
- Check backend terminal for error messages

## Default Test Credentials

After running `npm run seed` in the backend:

- **Email:** maria@example.com | **Password:** password123
- **Email:** john@example.com | **Password:** password123
- **Email:** sarah@example.com | **Password:** password123

## Need Help?

1. Check backend terminal for errors
2. Check browser console (F12) for frontend errors
3. Verify all environment variables are set correctly
4. Make sure both servers are running

