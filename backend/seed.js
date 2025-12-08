const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Recipe = require('./models/Recipe');

const sampleUsers = [
  {
    name: 'Chef Maria',
    email: 'maria@recipehub.com',
    password: 'password123',
    role: 'user',
    bio: 'Passionate home cook sharing family recipes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    name: 'John Smith',
    email: 'john@recipehub.com',
    password: 'password123',
    role: 'user',
    bio: 'Food enthusiast and recipe creator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@recipehub.com',
    password: 'password123',
    role: 'user',
    bio: 'Vegetarian chef specializing in healthy meals',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
  }
];

// Helper function to generate unique recipes
const generateUniqueRecipes = () => {
  const recipes = [];
  const titles = new Set();
  
  const recipeTemplates = [
    // Italian
    { title: 'Classic Margherita Pizza', cuisine: 'Italian', difficulty: 'medium', cookingTime: 25, servings: 4 },
    { title: 'Spaghetti Carbonara', cuisine: 'Italian', difficulty: 'medium', cookingTime: 20, servings: 4 },
    { title: 'Penne Arrabbiata', cuisine: 'Italian', difficulty: 'easy', cookingTime: 25, servings: 4 },
    { title: 'Chicken Parmesan', cuisine: 'Italian', difficulty: 'medium', cookingTime: 45, servings: 4 },
    { title: 'Chicken Alfredo', cuisine: 'Italian', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Vegetable Lasagna', cuisine: 'Italian', difficulty: 'hard', cookingTime: 90, servings: 8 },
    { title: 'Fettuccine Alfredo', cuisine: 'Italian', difficulty: 'easy', cookingTime: 20, servings: 4 },
    { title: 'Chicken Piccata', cuisine: 'Italian', difficulty: 'easy', cookingTime: 25, servings: 4 },
    { title: 'Eggplant Parmesan', cuisine: 'Italian', difficulty: 'medium', cookingTime: 60, servings: 6 },
    { title: 'Risotto ai Funghi', cuisine: 'Italian', difficulty: 'medium', cookingTime: 35, servings: 4 },
    { title: 'Osso Buco', cuisine: 'Italian', difficulty: 'hard', cookingTime: 180, servings: 4 },
    { title: 'Bruschetta', cuisine: 'Italian', difficulty: 'easy', cookingTime: 15, servings: 6 },
    
    // Indian
    { title: 'Chicken Tikka Masala', cuisine: 'Indian', difficulty: 'medium', cookingTime: 45, servings: 4 },
    { title: 'Chicken Curry', cuisine: 'Indian', difficulty: 'medium', cookingTime: 60, servings: 4 },
    { title: 'Chicken Biryani', cuisine: 'Indian', difficulty: 'hard', cookingTime: 90, servings: 6 },
    { title: 'Chicken Korma', cuisine: 'Indian', difficulty: 'medium', cookingTime: 60, servings: 4 },
    { title: 'Butter Chicken', cuisine: 'Indian', difficulty: 'medium', cookingTime: 50, servings: 4 },
    { title: 'Palak Paneer', cuisine: 'Indian', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Chana Masala', cuisine: 'Indian', difficulty: 'easy', cookingTime: 40, servings: 4 },
    { title: 'Dal Makhani', cuisine: 'Indian', difficulty: 'medium', cookingTime: 60, servings: 4 },
    { title: 'Tandoori Chicken', cuisine: 'Indian', difficulty: 'medium', cookingTime: 45, servings: 4 },
    { title: 'Samosas', cuisine: 'Indian', difficulty: 'medium', cookingTime: 45, servings: 8 },
    { title: 'Naan Bread', cuisine: 'Indian', difficulty: 'easy', cookingTime: 30, servings: 8 },
    { title: 'Rogan Josh', cuisine: 'Indian', difficulty: 'hard', cookingTime: 120, servings: 4 },
    
    // Mexican
    { title: 'Beef Tacos', cuisine: 'Mexican', difficulty: 'easy', cookingTime: 25, servings: 6 },
    { title: 'Chicken Fajitas', cuisine: 'Mexican', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Chicken Enchiladas', cuisine: 'Mexican', difficulty: 'medium', cookingTime: 45, servings: 6 },
    { title: 'Beef Burritos', cuisine: 'Mexican', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Chiles Rellenos', cuisine: 'Mexican', difficulty: 'medium', cookingTime: 50, servings: 4 },
    { title: 'Carnitas', cuisine: 'Mexican', difficulty: 'medium', cookingTime: 180, servings: 6 },
    { title: 'Guacamole', cuisine: 'Mexican', difficulty: 'easy', cookingTime: 10, servings: 4 },
    { title: 'Quesadillas', cuisine: 'Mexican', difficulty: 'easy', cookingTime: 15, servings: 4 },
    { title: 'Chicken Mole', cuisine: 'Mexican', difficulty: 'hard', cookingTime: 120, servings: 6 },
    { title: 'Pozole', cuisine: 'Mexican', difficulty: 'medium', cookingTime: 90, servings: 6 },
    
    // Asian
    { title: 'Pad Thai', cuisine: 'Thai', difficulty: 'medium', cookingTime: 30, servings: 2 },
    { title: 'Pad See Ew', cuisine: 'Thai', difficulty: 'medium', cookingTime: 25, servings: 3 },
    { title: 'Chicken Satay', cuisine: 'Thai', difficulty: 'easy', cookingTime: 40, servings: 4 },
    { title: 'Green Curry', cuisine: 'Thai', difficulty: 'medium', cookingTime: 35, servings: 4 },
    { title: 'Tom Yum Soup', cuisine: 'Thai', difficulty: 'easy', cookingTime: 25, servings: 4 },
    { title: 'Beef Stir Fry', cuisine: 'Chinese', difficulty: 'easy', cookingTime: 20, servings: 4 },
    { title: 'Kung Pao Chicken', cuisine: 'Chinese', difficulty: 'medium', cookingTime: 25, servings: 4 },
    { title: 'Sweet and Sour Pork', cuisine: 'Chinese', difficulty: 'medium', cookingTime: 30, servings: 4 },
    { title: 'General Tso\'s Chicken', cuisine: 'Chinese', difficulty: 'medium', cookingTime: 30, servings: 4 },
    { title: 'Mapo Tofu', cuisine: 'Chinese', difficulty: 'easy', cookingTime: 20, servings: 4 },
    { title: 'Chicken Teriyaki', cuisine: 'Japanese', difficulty: 'easy', cookingTime: 35, servings: 4 },
    { title: 'Sushi Rolls', cuisine: 'Japanese', difficulty: 'hard', cookingTime: 60, servings: 4 },
    { title: 'Ramen', cuisine: 'Japanese', difficulty: 'medium', cookingTime: 45, servings: 2 },
    { title: 'Beef Bulgogi', cuisine: 'Korean', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Beef Pho', cuisine: 'Vietnamese', difficulty: 'hard', cookingTime: 360, servings: 4 },
    { title: 'Chicken Adobo', cuisine: 'Filipino', difficulty: 'easy', cookingTime: 60, servings: 4 },
    { title: 'Beef Rendang', cuisine: 'Indonesian', difficulty: 'hard', cookingTime: 180, servings: 6 },
    
    // American
    { title: 'Chocolate Chip Cookies', cuisine: 'American', difficulty: 'easy', cookingTime: 30, servings: 24 },
    { title: 'Caesar Salad', cuisine: 'American', difficulty: 'easy', cookingTime: 15, servings: 4 },
    { title: 'Grilled Salmon with Lemon', cuisine: 'American', difficulty: 'easy', cookingTime: 15, servings: 4 },
    { title: 'BBQ Pulled Pork', cuisine: 'American', difficulty: 'easy', cookingTime: 300, servings: 8 },
    { title: 'Beef Stroganoff', cuisine: 'American', difficulty: 'medium', cookingTime: 40, servings: 4 },
    { title: 'Mac and Cheese', cuisine: 'American', difficulty: 'easy', cookingTime: 30, servings: 6 },
    { title: 'Chicken Wings', cuisine: 'American', difficulty: 'easy', cookingTime: 45, servings: 4 },
    { title: 'Burgers', cuisine: 'American', difficulty: 'easy', cookingTime: 20, servings: 4 },
    { title: 'Meatloaf', cuisine: 'American', difficulty: 'easy', cookingTime: 75, servings: 6 },
    { title: 'Pot Roast', cuisine: 'American', difficulty: 'medium', cookingTime: 240, servings: 6 },
    { title: 'Fried Chicken', cuisine: 'American', difficulty: 'medium', cookingTime: 45, servings: 4 },
    { title: 'Clam Chowder', cuisine: 'American', difficulty: 'medium', cookingTime: 45, servings: 6 },
    
    // French
    { title: 'French Onion Soup', cuisine: 'French', difficulty: 'medium', cookingTime: 90, servings: 4 },
    { title: 'Ratatouille', cuisine: 'French', difficulty: 'easy', cookingTime: 45, servings: 6 },
    { title: 'Beef Bourguignon', cuisine: 'French', difficulty: 'hard', cookingTime: 240, servings: 6 },
    { title: 'Coq au Vin', cuisine: 'French', difficulty: 'hard', cookingTime: 120, servings: 4 },
    { title: 'Duck Confit', cuisine: 'French', difficulty: 'hard', cookingTime: 180, servings: 4 },
    { title: 'Bouillabaisse', cuisine: 'French', difficulty: 'hard', cookingTime: 90, servings: 6 },
    { title: 'Quiche Lorraine', cuisine: 'French', difficulty: 'medium', cookingTime: 60, servings: 6 },
    { title: 'Croque Monsieur', cuisine: 'French', difficulty: 'easy', cookingTime: 20, servings: 2 },
    
    // Greek
    { title: 'Greek Moussaka', cuisine: 'Greek', difficulty: 'hard', cookingTime: 120, servings: 6 },
    { title: 'Spanakopita', cuisine: 'Greek', difficulty: 'medium', cookingTime: 60, servings: 8 },
    { title: 'Greek Salad', cuisine: 'Greek', difficulty: 'easy', cookingTime: 15, servings: 4 },
    { title: 'Souvlaki', cuisine: 'Greek', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Pastitsio', cuisine: 'Greek', difficulty: 'hard', cookingTime: 90, servings: 8 },
    
    // British
    { title: 'Fish and Chips', cuisine: 'British', difficulty: 'medium', cookingTime: 45, servings: 4 },
    { title: 'Beef Wellington', cuisine: 'British', difficulty: 'hard', cookingTime: 90, servings: 6 },
    { title: 'Shepherd\'s Pie', cuisine: 'British', difficulty: 'medium', cookingTime: 75, servings: 6 },
    { title: 'Chicken Tikka Masala', cuisine: 'British', difficulty: 'medium', cookingTime: 45, servings: 4 },
    { title: 'Bangers and Mash', cuisine: 'British', difficulty: 'easy', cookingTime: 30, servings: 4 },
    
    // Middle Eastern
    { title: 'Chicken Shawarma', cuisine: 'Middle Eastern', difficulty: 'easy', cookingTime: 30, servings: 4 },
    { title: 'Hummus', cuisine: 'Middle Eastern', difficulty: 'easy', cookingTime: 10, servings: 6 },
    { title: 'Falafel', cuisine: 'Middle Eastern', difficulty: 'medium', cookingTime: 45, servings: 6 },
    { title: 'Baba Ganoush', cuisine: 'Middle Eastern', difficulty: 'easy', cookingTime: 40, servings: 6 },
    { title: 'Shakshuka', cuisine: 'Middle Eastern', difficulty: 'easy', cookingTime: 25, servings: 4 },
    { title: 'Lamb Kofta', cuisine: 'Middle Eastern', difficulty: 'medium', cookingTime: 40, servings: 4 },
    
    // Seafood
    { title: 'Shrimp Scampi', cuisine: 'Italian', difficulty: 'easy', cookingTime: 20, servings: 4 },
    { title: 'Lobster Bisque', cuisine: 'French', difficulty: 'hard', cookingTime: 60, servings: 4 },
    { title: 'Crab Cakes', cuisine: 'American', difficulty: 'medium', cookingTime: 30, servings: 4 },
    { title: 'Fish Tacos', cuisine: 'Mexican', difficulty: 'easy', cookingTime: 25, servings: 4 },
    { title: 'Paella', cuisine: 'Spanish', difficulty: 'hard', cookingTime: 60, servings: 6 },
    { title: 'Cioppino', cuisine: 'Italian', difficulty: 'medium', cookingTime: 45, servings: 6 },
    
    // Vegetarian
    { title: 'Vegetable Curry', cuisine: 'Indian', difficulty: 'easy', cookingTime: 35, servings: 4 },
    { title: 'Stuffed Bell Peppers', cuisine: 'American', difficulty: 'medium', cookingTime: 60, servings: 4 },
    { title: 'Mushroom Risotto', cuisine: 'Italian', difficulty: 'medium', cookingTime: 40, servings: 4 },
    { title: 'Vegetable Stir Fry', cuisine: 'Chinese', difficulty: 'easy', cookingTime: 15, servings: 4 },
    { title: 'Caprese Salad', cuisine: 'Italian', difficulty: 'easy', cookingTime: 10, servings: 4 },
    { title: 'Stuffed Zucchini', cuisine: 'Mediterranean', difficulty: 'medium', cookingTime: 50, servings: 4 },
    
    // Desserts
    { title: 'Tiramisu', cuisine: 'Italian', difficulty: 'medium', cookingTime: 120, servings: 8 },
    { title: 'Crème Brûlée', cuisine: 'French', difficulty: 'medium', cookingTime: 90, servings: 6 },
    { title: 'Cheesecake', cuisine: 'American', difficulty: 'medium', cookingTime: 90, servings: 12 },
    { title: 'Apple Pie', cuisine: 'American', difficulty: 'medium', cookingTime: 75, servings: 8 },
    { title: 'Brownies', cuisine: 'American', difficulty: 'easy', cookingTime: 35, servings: 16 },
    { title: 'Chocolate Cake', cuisine: 'American', difficulty: 'medium', cookingTime: 60, servings: 12 }
  ];
  
  // Generate full recipe objects
  recipeTemplates.forEach((template, index) => {
    if (!titles.has(template.title)) {
      titles.add(template.title);
      recipes.push(createRecipeFromTemplate(template, index));
    }
  });
  
  return recipes;
};

const createRecipeFromTemplate = (template, index) => {
  const descriptions = {
    'Classic Margherita Pizza': 'A timeless Italian classic with fresh tomatoes, mozzarella, and basil.',
    'Spaghetti Carbonara': 'Creamy Italian pasta with eggs, cheese, pancetta, and black pepper.',
    'Penne Arrabbiata': 'Spicy Italian pasta with tomatoes, garlic, and red chili peppers.',
    'Chicken Parmesan': 'Breaded chicken breast topped with marinara sauce and melted mozzarella.',
    'Chicken Alfredo': 'Creamy pasta with tender chicken and rich Alfredo sauce.',
    'Vegetable Lasagna': 'Layers of pasta, rich tomato sauce, creamy béchamel, and fresh vegetables.',
    'Fettuccine Alfredo': 'Classic creamy pasta dish with butter, cream, and parmesan cheese.',
    'Chicken Piccata': 'Tender chicken in a lemony, buttery sauce with capers.',
    'Eggplant Parmesan': 'Breaded eggplant layered with marinara and mozzarella cheese.',
    'Risotto ai Funghi': 'Creamy Italian rice dish with mushrooms and parmesan.',
    'Osso Buco': 'Braised veal shanks in a rich tomato and wine sauce.',
    'Bruschetta': 'Toasted bread topped with fresh tomatoes, basil, and garlic.',
    'Chicken Tikka Masala': 'Creamy, aromatic Indian curry with tender chicken pieces.',
    'Chicken Curry': 'Aromatic Indian curry with tender chicken in a spiced tomato-based sauce.',
    'Chicken Biryani': 'Fragrant basmati rice layered with spiced chicken and caramelized onions.',
    'Chicken Korma': 'Mild and creamy Indian curry with tender chicken in a rich, nutty sauce.',
    'Butter Chicken': 'Rich and creamy Indian curry with tender chicken in a tomato-based sauce.',
    'Palak Paneer': 'Creamy spinach curry with Indian cheese cubes.',
    'Chana Masala': 'Spiced chickpea curry with tomatoes and aromatic spices.',
    'Dal Makhani': 'Creamy black lentil curry cooked with butter and cream.',
    'Tandoori Chicken': 'Marinated chicken cooked in a tandoor with yogurt and spices.',
    'Samosas': 'Crispy fried pastries filled with spiced potatoes and peas.',
    'Naan Bread': 'Soft, fluffy Indian flatbread baked in a tandoor.',
    'Rogan Josh': 'Aromatic lamb curry from Kashmir with yogurt and spices.',
    'Beef Tacos': 'Classic Mexican tacos with seasoned ground beef and fresh toppings.',
    'Chicken Fajitas': 'Sizzling strips of marinated chicken with bell peppers and onions.',
    'Chicken Enchiladas': 'Rolled tortillas filled with chicken and covered in sauce.',
    'Beef Burritos': 'Large flour tortillas filled with beef, beans, and rice.',
    'Chiles Rellenos': 'Stuffed poblano peppers battered and fried.',
    'Carnitas': 'Slow-cooked pork that\'s crispy on the outside and tender inside.',
    'Guacamole': 'Fresh avocado dip with lime, cilantro, and spices.',
    'Quesadillas': 'Grilled tortillas filled with cheese and other fillings.',
    'Chicken Mole': 'Complex Mexican sauce with chocolate, spices, and chicken.',
    'Pozole': 'Traditional Mexican soup with hominy and pork.',
    'Pad Thai': 'Authentic Thai stir-fried noodles with tamarind and fish sauce.',
    'Pad See Ew': 'Thai stir-fried wide rice noodles with soy sauce and Chinese broccoli.',
    'Chicken Satay': 'Tender chicken skewers marinated in spices and grilled.',
    'Green Curry': 'Spicy Thai curry with coconut milk, green chilies, and vegetables.',
    'Tom Yum Soup': 'Hot and sour Thai soup with shrimp and aromatic herbs.',
    'Beef Stir Fry': 'Quick and flavorful Asian-inspired stir fry with tender beef.',
    'Kung Pao Chicken': 'Spicy Chinese stir-fry with peanuts and vegetables.',
    'Sweet and Sour Pork': 'Crispy pork in a tangy sweet and sour sauce.',
    'General Tso\'s Chicken': 'Crispy chicken in a sweet and spicy sauce.',
    'Mapo Tofu': 'Spicy Sichuan dish with tofu and ground pork.',
    'Chicken Teriyaki': 'Sweet and savory Japanese-style chicken glazed with teriyaki sauce.',
    'Sushi Rolls': 'Fresh sushi rolls with your choice of fillings.',
    'Ramen': 'Japanese noodle soup with rich broth and various toppings.',
    'Beef Bulgogi': 'Korean marinated beef that\'s sweet, savory, and incredibly tender.',
    'Beef Pho': 'Vietnamese noodle soup with aromatic broth and tender beef.',
    'Chicken Adobo': 'Filipino chicken braised in soy sauce, vinegar, and garlic.',
    'Beef Rendang': 'Slow-cooked Indonesian curry with tender beef in a rich, coconut-based sauce.',
    'Chocolate Chip Cookies': 'Soft, chewy cookies loaded with chocolate chips.',
    'Caesar Salad': 'Classic Caesar salad with homemade dressing and parmesan cheese.',
    'Grilled Salmon with Lemon': 'Perfectly grilled salmon fillets with a zesty lemon butter sauce.',
    'BBQ Pulled Pork': 'Slow-cooked pork shoulder smothered in tangy BBQ sauce.',
    'Beef Stroganoff': 'Tender beef strips in a rich, creamy mushroom sauce.',
    'Mac and Cheese': 'Creamy pasta dish with melted cheese.',
    'Chicken Wings': 'Crispy fried or baked chicken wings with your favorite sauce.',
    'Burgers': 'Classic beef burgers with all the fixings.',
    'Meatloaf': 'Seasoned ground meat baked in a loaf shape.',
    'Pot Roast': 'Slow-cooked beef with vegetables in a rich gravy.',
    'Fried Chicken': 'Crispy, golden fried chicken pieces.',
    'Clam Chowder': 'Creamy New England soup with clams and potatoes.',
    'French Onion Soup': 'Rich, caramelized onion soup topped with melted Gruyère cheese.',
    'Ratatouille': 'Provençal vegetable stew with eggplant, zucchini, and bell peppers.',
    'Beef Bourguignon': 'Classic French stew with tender beef braised in red wine.',
    'Coq au Vin': 'French chicken braised in wine with mushrooms and onions.',
    'Duck Confit': 'Slow-cooked duck leg preserved in its own fat.',
    'Bouillabaisse': 'Provençal fish stew with various fish and shellfish.',
    'Quiche Lorraine': 'French savory tart with eggs, cream, and bacon.',
    'Croque Monsieur': 'Grilled ham and cheese sandwich with béchamel sauce.',
    'Greek Moussaka': 'Layered casserole with eggplant, spiced meat, and creamy béchamel.',
    'Spanakopita': 'Greek spinach pie with feta cheese in phyllo pastry.',
    'Greek Salad': 'Fresh salad with tomatoes, cucumbers, olives, and feta cheese.',
    'Souvlaki': 'Greek skewered and grilled meat, typically served with pita.',
    'Pastitsio': 'Greek baked pasta dish with meat sauce and béchamel.',
    'Fish and Chips': 'Crispy beer-battered fish with golden fries.',
    'Beef Wellington': 'Tender beef fillet wrapped in puff pastry with mushroom duxelles.',
    'Shepherd\'s Pie': 'Ground lamb with vegetables topped with mashed potatoes.',
    'Bangers and Mash': 'British sausages served with mashed potatoes and gravy.',
    'Chicken Shawarma': 'Middle Eastern spiced chicken with garlic sauce.',
    'Hummus': 'Creamy chickpea dip with tahini and lemon.',
    'Falafel': 'Deep-fried chickpea balls, typically served in pita.',
    'Baba Ganoush': 'Smoky eggplant dip with tahini and lemon.',
    'Shakshuka': 'Poached eggs in a spicy tomato and pepper sauce.',
    'Lamb Kofta': 'Spiced ground lamb formed into balls or patties.',
    'Shrimp Scampi': 'Succulent shrimp in a garlic, white wine, and butter sauce.',
    'Lobster Bisque': 'Rich and creamy soup made with lobster shells and meat.',
    'Crab Cakes': 'Pan-fried cakes made with crab meat and seasonings.',
    'Fish Tacos': 'Crispy fish in warm tortillas with fresh toppings.',
    'Paella': 'Spanish rice dish with saffron, seafood, and vegetables.',
    'Cioppino': 'Italian-American fish stew with tomatoes and wine.',
    'Vegetable Curry': 'Mixed vegetables in a spiced coconut curry sauce.',
    'Stuffed Bell Peppers': 'Bell peppers filled with rice, meat, and vegetables.',
    'Mushroom Risotto': 'Creamy Italian rice dish with mushrooms.',
    'Vegetable Stir Fry': 'Quick-cooked mixed vegetables in a savory sauce.',
    'Caprese Salad': 'Fresh mozzarella, tomatoes, and basil with olive oil.',
    'Stuffed Zucchini': 'Zucchini boats filled with rice, meat, and cheese.',
    'Tiramisu': 'Italian dessert with coffee-soaked ladyfingers and mascarpone.',
    'Crème Brûlée': 'Rich custard dessert with a caramelized sugar top.',
    'Cheesecake': 'Creamy dessert made with cream cheese on a graham cracker crust.',
    'Apple Pie': 'Classic American pie with spiced apples in a flaky crust.',
    'Brownies': 'Dense, fudgy chocolate squares.',
    'Chocolate Cake': 'Rich, moist chocolate layer cake.'
  };
  
  const tagsMap = {
    'Italian': ['pasta', 'italian', 'comfort-food'],
    'Indian': ['curry', 'indian', 'spicy'],
    'Mexican': ['mexican', 'spicy', 'quick'],
    'Thai': ['thai', 'spicy', 'asian'],
    'Chinese': ['chinese', 'stir-fry', 'asian'],
    'Japanese': ['japanese', 'healthy', 'asian'],
    'Korean': ['korean', 'marinated', 'grilled'],
    'Vietnamese': ['vietnamese', 'soup', 'noodles'],
    'Filipino': ['filipino', 'tangy', 'comfort-food'],
    'Indonesian': ['indonesian', 'curry', 'spicy'],
    'American': ['american', 'comfort-food', 'classic'],
    'French': ['french', 'elegant', 'wine'],
    'Greek': ['greek', 'mediterranean', 'healthy'],
    'British': ['british', 'pub-food', 'classic'],
    'Middle Eastern': ['middle-eastern', 'spicy', 'healthy'],
    'Spanish': ['spanish', 'seafood', 'rice'],
    'Mediterranean': ['mediterranean', 'healthy', 'vegetarian']
  };
  
  const imageMap = {
    'Classic Margherita Pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
    'Spaghetti Carbonara': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    'Penne Arrabbiata': 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop',
    'Chicken Parmesan': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    'Chicken Alfredo': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    'Vegetable Lasagna': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Fettuccine Alfredo': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    'Chicken Piccata': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    'Eggplant Parmesan': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Risotto ai Funghi': 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop',
    'Osso Buco': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Bruschetta': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Chicken Tikka Masala': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Chicken Curry': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Chicken Biryani': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    'Chicken Korma': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Butter Chicken': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Palak Paneer': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Chana Masala': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Dal Makhani': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Tandoori Chicken': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Samosas': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop',
    'Naan Bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    'Rogan Josh': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Beef Tacos': 'https://images.unsplash.com/photo-1565299585323-38174c0b5a73?w=800&h=600&fit=crop',
    'Chicken Fajitas': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Chicken Enchiladas': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Beef Burritos': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop',
    'Chiles Rellenos': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Carnitas': 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop',
    'Guacamole': 'https://images.unsplash.com/photo-1588167378332-0b3a3b3b3b3b?w=800&h=600&fit=crop',
    'Quesadillas': 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&h=600&fit=crop',
    'Chicken Mole': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Pozole': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Pad Thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    'Pad See Ew': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    'Chicken Satay': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    'Green Curry': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    'Tom Yum Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Beef Stir Fry': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Kung Pao Chicken': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Sweet and Sour Pork': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'General Tso\'s Chicken': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Mapo Tofu': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Chicken Teriyaki': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Sushi Rolls': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    'Ramen': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    'Beef Bulgogi': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Beef Pho': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    'Chicken Adobo': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Beef Rendang': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Chocolate Chip Cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    'Caesar Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    'Grilled Salmon with Lemon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',
    'BBQ Pulled Pork': 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop',
    'Beef Stroganoff': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Mac and Cheese': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    'Chicken Wings': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    'Meatloaf': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Pot Roast': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Fried Chicken': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Clam Chowder': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'French Onion Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Ratatouille': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Beef Bourguignon': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Coq au Vin': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Duck Confit': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Bouillabaisse': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Quiche Lorraine': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Croque Monsieur': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    'Greek Moussaka': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Spanakopita': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Greek Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    'Souvlaki': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Pastitsio': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Fish and Chips': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    'Beef Wellington': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    'Shepherd\'s Pie': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Bangers and Mash': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    'Chicken Shawarma': 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    'Hummus': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Falafel': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Baba Ganoush': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Shakshuka': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Lamb Kofta': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    'Shrimp Scampi': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    'Lobster Bisque': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Crab Cakes': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    'Fish Tacos': 'https://images.unsplash.com/photo-1565299585323-38174c0b5a73?w=800&h=600&fit=crop',
    'Paella': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    'Cioppino': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    'Vegetable Curry': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'Stuffed Bell Peppers': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Mushroom Risotto': 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop',
    'Vegetable Stir Fry': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Caprese Salad': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop',
    'Stuffed Zucchini': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'Tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    'Crème Brûlée': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    'Cheesecake': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    'Apple Pie': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=600&fit=crop',
    'Brownies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    'Chocolate Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop'
  };
  
  const baseIngredients = {
    'Classic Margherita Pizza': [
      { name: 'Pizza dough', quantity: '1 ball (300g)' },
      { name: 'Tomato sauce', quantity: '1/2 cup' },
      { name: 'Fresh mozzarella', quantity: '200g' },
      { name: 'Fresh basil leaves', quantity: '10-12 leaves' },
      { name: 'Olive oil', quantity: '2 tbsp' }
    ],
    'Spaghetti Carbonara': [
      { name: 'Spaghetti', quantity: '400g' },
      { name: 'Eggs', quantity: '4 large' },
      { name: 'Parmesan cheese', quantity: '1 cup, grated' },
      { name: 'Pancetta', quantity: '200g, diced' },
      { name: 'Black pepper', quantity: '1 tsp, freshly ground' }
    ],
    'Chicken Tikka Masala': [
      { name: 'Chicken breast', quantity: '500g, cubed' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Garam masala', quantity: '2 tsp' },
      { name: 'Heavy cream', quantity: '1 cup' },
      { name: 'Tomato puree', quantity: '1 cup' },
      { name: 'Onion', quantity: '1 large, diced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Ginger', quantity: '1 inch, grated' }
    ],
    'Chocolate Chip Cookies': [
      { name: 'All-purpose flour', quantity: '2 1/4 cups' },
      { name: 'Butter', quantity: '1 cup, softened' },
      { name: 'Brown sugar', quantity: '3/4 cup' },
      { name: 'White sugar', quantity: '3/4 cup' },
      { name: 'Eggs', quantity: '2 large' },
      { name: 'Vanilla extract', quantity: '2 tsp' },
      { name: 'Chocolate chips', quantity: '2 cups' }
    ],
    'Beef Stir Fry': [
      { name: 'Beef sirloin', quantity: '400g, thinly sliced' },
      { name: 'Broccoli', quantity: '2 cups, florets' },
      { name: 'Bell peppers', quantity: '2, sliced' },
      { name: 'Soy sauce', quantity: '3 tbsp' },
      { name: 'Sesame oil', quantity: '1 tbsp' },
      { name: 'Ginger', quantity: '1 tbsp, minced' },
      { name: 'Garlic', quantity: '3 cloves, minced' }
    ]
  };
  
  const baseInstructions = {
    'Classic Margherita Pizza': [
      'Preheat your oven to 475°F (245°C) with a pizza stone inside.',
      'Roll out the pizza dough on a floured surface.',
      'Spread tomato sauce evenly over the dough.',
      'Tear mozzarella into pieces and distribute evenly.',
      'Bake for 10-12 minutes until golden.',
      'Top with fresh basil leaves and serve.'
    ],
    'Spaghetti Carbonara': [
      'Cook spaghetti in salted boiling water until al dente.',
      'Whisk eggs with parmesan and black pepper.',
      'Cook pancetta until crispy.',
      'Add hot pasta to the pan.',
      'Remove from heat and quickly toss with egg mixture.',
      'Serve immediately.'
    ],
    'Chicken Tikka Masala': [
      'Marinate chicken in yogurt and spices for 2 hours.',
      'Sauté onions until golden brown.',
      'Add garlic and ginger, cook until fragrant.',
      'Add tomato puree and cook until oil separates.',
      'Add chicken and cook until done.',
      'Pour in heavy cream and simmer.',
      'Serve with basmati rice or naan.'
    ]
  };
  
  // Get description, ingredients, and instructions
  const description = descriptions[template.title] || `${template.title} - A delicious ${template.cuisine} dish.`;
  const ingredients = baseIngredients[template.title] || generateIngredients(template);
  const instructions = baseInstructions[template.title] || generateInstructions(template);
  const tags = tagsMap[template.cuisine] || [template.cuisine.toLowerCase(), template.difficulty];
  const image = imageMap[template.title] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop';
  
  return {
    title: template.title,
    description,
    ingredients,
    instructions,
    cookingTime: template.cookingTime,
    servings: template.servings,
    difficulty: template.difficulty,
    cuisine: template.cuisine,
    tags,
    image,
    reviews: [
      { rating: 4 + Math.floor(Math.random() * 2), comment: 'Delicious recipe!' },
      { rating: 5, comment: 'Will make again!' }
    ]
  };
};

const generateIngredients = (template) => {
  const common = [
    { name: 'Onion', quantity: '1, diced' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Olive oil', quantity: '2 tbsp' },
    { name: 'Salt', quantity: 'to taste' },
    { name: 'Black pepper', quantity: 'to taste' }
  ];
  return common;
};

const generateInstructions = (template) => [
  'Prepare all ingredients.',
  'Heat oil in a large pan.',
  'Cook main ingredients until done.',
  'Season with salt and pepper.',
  'Serve hot and enjoy!'
];

const sampleRecipes = generateUniqueRecipes();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipehub');
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Recipe.deleteMany({});
    console.log('Cleared existing data');

    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    }

    for (let i = 0; i < sampleRecipes.length; i++) {
      const recipeData = sampleRecipes[i];
      const author = createdUsers[i % createdUsers.length];
      
      const recipe = new Recipe({
        ...recipeData,
        author: author._id,
        reviews: recipeData.reviews.map(review => ({
          ...review,
          user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
        }))
      });
      
      await recipe.save();
      console.log(`Created recipe: ${recipe.title}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log(`Created ${createdUsers.length} users and ${sampleRecipes.length} recipes`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
