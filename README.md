# 🍽️ RecipeHub – Smart Recipe Sharing & Meal Planning Platform

RecipeHub is a full-stack web application that helps users organize recipes, discover new dishes using AI, and plan meals efficiently.

## 🚀 Features
- User authentication (JWT-based)
- Create, read, update & delete recipes
- Advanced search, filter, sorting & pagination
- AI-powered recipe suggestions (OpenAI)
- Meal planning
- Community features: ratings, reviews, favorites
- Fully deployed on cloud

## 🏗️ Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, Axios  
- **Backend:** Node.js, Express, JWT, bcrypt  
- **Database:** MongoDB (Mongoose)  
- **AI:** OpenAI API  
- **Hosting:** Vercel (Frontend), Render (Backend), MongoDB Atlas (DB)

## 📡 API Highlights
- `POST /api/auth/signup` – Register user  
- `POST /api/auth/login` – Login user  
- `GET /api/recipes` – Get recipes  
- `POST /api/recipes` – Create recipe  
- `POST /api/ai/suggest` – AI recipe suggestions  

## ▶️ Setup
```bash
git clone https://github.com/your-username/recipehub.git
cd recipehub
npm install
npm run dev
