import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Explore from './components/Explore';
import RecipeDetails from './components/RecipeDetails';
import MyRecipes from './components/MyRecipes';
import MealPlanner from './components/MealPlanner';
import Profile from './components/Profile';
import RecipeForm from './components/RecipeForm';
import AISuggestions from './components/AISuggestions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route
            path="/recipe/new"
            element={
              isAuthenticated ? (
                <RecipeForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/recipe/:id/edit"
            element={
              isAuthenticated ? (
                <RecipeForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-recipes"
            element={
              isAuthenticated ? (
                <MyRecipes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/meal-planner"
            element={
              isAuthenticated ? (
                <MealPlanner />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/ai-suggestions"
            element={
              isAuthenticated ? (
                <AISuggestions />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/user/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
