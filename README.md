# 🍽️ MealPlan App

**MealPlan App** is a full-stack web app that helps users plan their meals efficiently. It's currently under development, with the frontend being actively built and the backend ready for integration.

---

## ⚙️ Tech Stack

- **Frontend**: Svelte (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose) - Atlas
- **Deployment**: Planned (Render / Vercel)

---

## 📌 Features 

  • Backend API (CRUD for meals)
	•	Authentication & Authorization (JWT)

 ---

## 🌐 External API Integration – Spoonacular

This app integrates with the [Spoonacular API](https://spoonacular.com/food-api) to fetch real-time recipe and meal data.

### 🔧 Usage
- The backend uses Spoonacular to search for meals based on ingredients, dietary preferences, or keywords.
- This allows the app to suggest recipes, autofill meal data, and enhance user planning.

### 🔐 API Key Security
- The API key is stored in an environment variable (`.env`) and **never committed** to version control.
- Example:
  ```env
  SPOONACULAR_API_KEY=your_api_key_here
  SPOONACULAR_API_URL=https://api.spoonacular.com
  ```

---

## 🚀 Getting Started

### Clone & Install

```bash
git clone https://github.com/jaswanthrb/mealplan-app.git
cd mealplan-app

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev

```

## 📬 API Preview

```
GET    /api/meals
GET    /api/meals/:id
GET    /api/recipes/search?query=pasta
POST   /api/meals
PUT    /api/meals/:id
DELETE /api/meals/:id

```




