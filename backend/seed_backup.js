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

const sampleRecipes = [
  {
    title: 'Classic Margherita Pizza',
    description: 'A timeless Italian classic with fresh tomatoes, mozzarella, and basil. Simple ingredients that create an unforgettable flavor.',
    ingredients: [
      { name: 'Pizza dough', quantity: '1 ball (300g)' },
      { name: 'Tomato sauce', quantity: '1/2 cup' },
      { name: 'Fresh mozzarella', quantity: '200g' },
      { name: 'Fresh basil leaves', quantity: '10-12 leaves' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Black pepper', quantity: '1/2 tsp' }
    ],
    instructions: [
      'Preheat your oven to 475°F (245°C) with a pizza stone inside.',
      'Roll out the pizza dough on a floured surface to your desired thickness.',
      'Spread tomato sauce evenly over the dough, leaving a border for the crust.',
      'Tear mozzarella into pieces and distribute evenly over the sauce.',
      'Drizzle with olive oil and season with salt and pepper.',
      'Bake for 10-12 minutes until the crust is golden and cheese is bubbly.',
      'Remove from oven, top with fresh basil leaves, and serve immediately.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['pizza', 'italian', 'vegetarian', 'quick'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'Perfect recipe! The crust came out crispy and delicious.' },
      { rating: 4, comment: 'Great instructions, easy to follow.' }
    ]
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Creamy, aromatic Indian curry with tender chicken pieces. A restaurant favorite you can make at home!',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g, cubed' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Garam masala', quantity: '2 tsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Heavy cream', quantity: '1 cup' },
      { name: 'Tomato puree', quantity: '1 cup' },
      { name: 'Onion', quantity: '1 large, diced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Butter', quantity: '2 tbsp' }
    ],
    instructions: [
      'Marinate chicken in yogurt, garam masala, and turmeric for at least 2 hours.',
      'Heat butter in a large pan and sauté onions until golden brown.',
      'Add garlic and ginger, cook for 1 minute until fragrant.',
      'Add tomato puree and cook for 5 minutes until oil separates.',
      'Add marinated chicken and cook until chicken is done, about 10 minutes.',
      'Pour in heavy cream and simmer for 5 minutes.',
      'Garnish with fresh cilantro and serve with basmati rice or naan.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['curry', 'indian', 'chicken', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'Absolutely delicious! Better than restaurant quality.' },
      { rating: 5, comment: 'My family loved it! Will make again.' }
    ]
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Soft, chewy cookies loaded with chocolate chips. The perfect treat for any occasion.',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 1/4 cups' },
      { name: 'Butter', quantity: '1 cup, softened' },
      { name: 'Brown sugar', quantity: '3/4 cup' },
      { name: 'White sugar', quantity: '3/4 cup' },
      { name: 'Eggs', quantity: '2 large' },
      { name: 'Vanilla extract', quantity: '2 tsp' },
      { name: 'Baking soda', quantity: '1 tsp' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Chocolate chips', quantity: '2 cups' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, cream together butter and both sugars until light and fluffy.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'Combine flour, baking soda, and salt in a separate bowl.',
      'Gradually blend flour mixture into butter mixture.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons of dough onto ungreased cookie sheets.',
      'Bake for 9-11 minutes until golden brown.',
      'Cool on baking sheet for 2 minutes before removing to wire rack.'
    ],
    cookingTime: 30,
    servings: 24,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['dessert', 'cookies', 'chocolate', 'baking'],
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'Best chocolate chip cookies I\'ve ever made!' },
      { rating: 5, comment: 'Perfect texture and flavor.' }
    ]
  },
  {
    title: 'Beef Stir Fry',
    description: 'Quick and flavorful Asian-inspired stir fry with tender beef and fresh vegetables. Ready in 20 minutes!',
    ingredients: [
      { name: 'Beef sirloin', quantity: '400g, thinly sliced' },
      { name: 'Broccoli', quantity: '2 cups, florets' },
      { name: 'Bell peppers', quantity: '2, sliced' },
      { name: 'Carrots', quantity: '2, julienned' },
      { name: 'Soy sauce', quantity: '3 tbsp' },
      { name: 'Sesame oil', quantity: '1 tbsp' },
      { name: 'Ginger', quantity: '1 tbsp, minced' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Cornstarch', quantity: '1 tbsp' },
      { name: 'Vegetable oil', quantity: '2 tbsp' }
    ],
    instructions: [
      'Slice beef thinly against the grain and marinate in soy sauce and cornstarch for 15 minutes.',
      'Heat vegetable oil in a large wok or skillet over high heat.',
      'Add beef and cook for 2-3 minutes until browned. Remove and set aside.',
      'Add more oil if needed, then stir-fry vegetables for 3-4 minutes until crisp-tender.',
      'Add ginger and garlic, cook for 30 seconds until fragrant.',
      'Return beef to the pan and add remaining soy sauce.',
      'Toss everything together and drizzle with sesame oil.',
      'Serve immediately over steamed rice.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Chinese',
    tags: ['stir-fry', 'beef', 'quick', 'asian'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    reviews: [
      { rating: 4, comment: 'Quick and delicious weeknight dinner!' },
      { rating: 5, comment: 'The beef was so tender. Great recipe!' }
    ]
  },
  {
    title: 'Caesar Salad',
    description: 'Classic Caesar salad with homemade dressing, crisp romaine, and parmesan cheese. A timeless favorite.',
    ingredients: [
      { name: 'Romaine lettuce', quantity: '2 heads, chopped' },
      { name: 'Parmesan cheese', quantity: '1/2 cup, grated' },
      { name: 'Croutons', quantity: '1 cup' },
      { name: 'Anchovy fillets', quantity: '4 fillets' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Lemon juice', quantity: '2 tbsp' },
      { name: 'Dijon mustard', quantity: '1 tsp' },
      { name: 'Olive oil', quantity: '1/4 cup' },
      { name: 'Egg yolk', quantity: '1' },
      { name: 'Worcestershire sauce', quantity: '1 tsp' }
    ],
    instructions: [
      'Wash and dry romaine lettuce thoroughly, then chop into bite-sized pieces.',
      'In a small bowl, mash anchovies and garlic together.',
      'Whisk in lemon juice, Dijon mustard, and egg yolk.',
      'Slowly drizzle in olive oil while whisking continuously.',
      'Add Worcestershire sauce and half of the parmesan cheese.',
      'Toss lettuce with dressing until well coated.',
      'Top with croutons and remaining parmesan cheese.',
      'Serve immediately with freshly ground black pepper.'
    ],
    cookingTime: 15,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['salad', 'healthy', 'vegetarian', 'classic'],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'The dressing is amazing! Much better than store-bought.' },
      { rating: 4, comment: 'Perfect side dish for any meal.' }
    ]
  },
  {
    title: 'Pad Thai',
    description: 'Authentic Thai stir-fried noodles with tamarind, fish sauce, and your choice of protein. Sweet, sour, and savory!',
    ingredients: [
      { name: 'Rice noodles', quantity: '200g' },
      { name: 'Shrimp or chicken', quantity: '200g' },
      { name: 'Bean sprouts', quantity: '1 cup' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Tamarind paste', quantity: '2 tbsp' },
      { name: 'Fish sauce', quantity: '2 tbsp' },
      { name: 'Palm sugar', quantity: '2 tbsp' },
      { name: 'Lime', quantity: '1, juiced' },
      { name: 'Garlic', quantity: '3 cloves' },
      { name: 'Peanuts', quantity: '1/4 cup, crushed' }
    ],
    instructions: [
      'Soak rice noodles in warm water for 30 minutes until pliable.',
      'Mix tamarind paste, fish sauce, and palm sugar to make the sauce.',
      'Heat oil in a wok and scramble eggs. Remove and set aside.',
      'Add more oil and cook shrimp/chicken until done.',
      'Add garlic and stir-fry for 30 seconds.',
      'Add drained noodles and sauce, toss to combine.',
      'Add bean sprouts and scrambled eggs, toss again.',
      'Serve with lime wedges, crushed peanuts, and fresh cilantro.'
    ],
    cookingTime: 30,
    servings: 2,
    difficulty: 'medium',
    cuisine: 'Thai',
    tags: ['noodles', 'thai', 'spicy', 'asian'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'Authentic taste! Just like in Thailand.' },
      { rating: 4, comment: 'Great recipe, will make again!' }
    ]
  },
  {
    title: 'Grilled Salmon with Lemon',
    description: 'Perfectly grilled salmon fillets with a zesty lemon butter sauce. Healthy, delicious, and ready in 15 minutes.',
    ingredients: [
      { name: 'Salmon fillets', quantity: '4 (6oz each)' },
      { name: 'Lemon', quantity: '2, juiced and zested' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Fresh dill', quantity: '2 tbsp, chopped' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Black pepper', quantity: '1/2 tsp' }
    ],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Pat salmon fillets dry and season with salt and pepper.',
      'Brush both sides with olive oil.',
      'Grill salmon skin-side down for 4-5 minutes.',
      'Flip and grill for another 3-4 minutes until cooked through.',
      'Meanwhile, melt butter in a small pan.',
      'Add garlic, lemon juice, zest, and dill. Cook for 1 minute.',
      'Serve salmon with lemon butter sauce drizzled on top.'
    ],
    cookingTime: 15,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['seafood', 'healthy', 'grilled', 'quick'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'Perfectly cooked and so flavorful!' },
      { rating: 5, comment: 'The lemon butter sauce is incredible.' }
    ]
  },
  {
    title: 'Vegetable Lasagna',
    description: 'Layers of pasta, rich tomato sauce, creamy béchamel, and fresh vegetables. A vegetarian comfort food classic.',
    ingredients: [
      { name: 'Lasagna noodles', quantity: '12 sheets' },
      { name: 'Ricotta cheese', quantity: '500g' },
      { name: 'Mozzarella cheese', quantity: '300g, shredded' },
      { name: 'Parmesan cheese', quantity: '1 cup, grated' },
      { name: 'Zucchini', quantity: '2, sliced' },
      { name: 'Eggplant', quantity: '1, sliced' },
      { name: 'Spinach', quantity: '200g' },
      { name: 'Tomato sauce', quantity: '3 cups' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Olive oil', quantity: '2 tbsp' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Cook lasagna noodles according to package directions.',
      'Sauté vegetables in olive oil until tender, season with salt and pepper.',
      'Mix ricotta with half the parmesan and garlic.',
      'Layer: sauce, noodles, ricotta mixture, vegetables, mozzarella. Repeat.',
      'Top final layer with remaining sauce and cheeses.',
      'Cover with foil and bake for 45 minutes.',
      'Remove foil and bake for 15 more minutes until golden and bubbly.',
      'Let rest for 15 minutes before serving.'
    ],
    cookingTime: 90,
    servings: 8,
    difficulty: 'hard',
    cuisine: 'Italian',
    tags: ['vegetarian', 'pasta', 'baking', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    reviews: [
      { rating: 5, comment: 'Best lasagna I\'ve ever made! So cheesy and delicious.' },
      { rating: 4, comment: 'A bit time-consuming but worth it!' }
    ]
  },
  {
    title: 'Spaghetti Carbonara',
    description: 'Creamy Italian pasta with eggs, cheese, pancetta, and black pepper. A Roman classic that\'s simple yet elegant.',
    ingredients: [
      { name: 'Spaghetti', quantity: '400g' },
      { name: 'Eggs', quantity: '4 large' },
      { name: 'Parmesan cheese', quantity: '1 cup, grated' },
      { name: 'Pancetta', quantity: '200g, diced' },
      { name: 'Black pepper', quantity: '1 tsp, freshly ground' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Cook spaghetti in salted boiling water until al dente.',
      'While pasta cooks, whisk eggs with parmesan and black pepper.',
      'Cook pancetta in a large pan until crispy.',
      'Add garlic and cook for 30 seconds.',
      'Drain pasta, reserving some pasta water.',
      'Add hot pasta to the pan with pancetta.',
      'Remove from heat and quickly toss with egg mixture.',
      'Add pasta water if needed to create creamy sauce.',
      'Serve immediately with extra parmesan and black pepper.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['pasta', 'italian', 'quick', 'classic'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect carbonara!' }, { rating: 4, comment: 'Delicious and creamy.' }]
  },
  {
    title: 'Beef Tacos',
    description: 'Classic Mexican tacos with seasoned ground beef, fresh toppings, and warm tortillas. A family favorite!',
    ingredients: [
      { name: 'Ground beef', quantity: '500g' },
      { name: 'Taco seasoning', quantity: '1 packet' },
      { name: 'Tortillas', quantity: '8-10' },
      { name: 'Lettuce', quantity: '2 cups, shredded' },
      { name: 'Tomato', quantity: '2, diced' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Cheddar cheese', quantity: '1 cup, shredded' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Salsa', quantity: '1/2 cup' }
    ],
    instructions: [
      'Brown ground beef in a large skillet over medium heat.',
      'Add taco seasoning and water according to package directions.',
      'Simmer until sauce thickens, about 5 minutes.',
      'Warm tortillas in a dry skillet or microwave.',
      'Fill tortillas with beef mixture.',
      'Top with lettuce, tomato, onion, cheese, sour cream, and salsa.',
      'Serve immediately.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['tacos', 'mexican', 'beef', 'quick'],
    image: 'https://images.unsplash.com/photo-1565299585323-38174c0b5a73?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Kids loved it!' }, { rating: 4, comment: 'Easy and delicious.' }]
  },
  {
    title: 'Chicken Curry',
    description: 'Aromatic and flavorful chicken curry with coconut milk and spices. Perfect served over rice.',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g, cut into pieces' },
      { name: 'Coconut milk', quantity: '1 can (400ml)' },
      { name: 'Onion', quantity: '1 large, sliced' },
      { name: 'Tomato', quantity: '2, chopped' },
      { name: 'Curry powder', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Vegetable oil', quantity: '2 tbsp' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Heat oil in a large pot over medium heat.',
      'Add onions and cook until soft, about 5 minutes.',
      'Add ginger and garlic, cook for 1 minute.',
      'Add curry powder and turmeric, stir for 30 seconds.',
      'Add chicken and cook until browned, about 5 minutes.',
      'Add tomatoes and cook for 3 minutes.',
      'Pour in coconut milk and bring to a simmer.',
      'Cover and cook for 20-25 minutes until chicken is tender.',
      'Season with salt and serve over rice.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['curry', 'chicken', 'indian', 'coconut'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Amazing flavor!' }, { rating: 5, comment: 'Will make again.' }]
  },
  {
    title: 'French Onion Soup',
    description: 'Rich and savory soup with caramelized onions, beef broth, and melted gruyère cheese. A French bistro classic.',
    ingredients: [
      { name: 'Onions', quantity: '6 large, thinly sliced' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Beef broth', quantity: '6 cups' },
      { name: 'White wine', quantity: '1/2 cup' },
      { name: 'Gruyère cheese', quantity: '200g, grated' },
      { name: 'Baguette', quantity: '1, sliced' },
      { name: 'Thyme', quantity: '2 sprigs' },
      { name: 'Bay leaf', quantity: '2' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Melt butter in a large pot over low heat.',
      'Add onions and cook slowly for 45 minutes until caramelized.',
      'Add wine and cook for 2 minutes.',
      'Add broth, thyme, and bay leaf. Simmer for 30 minutes.',
      'Season with salt and pepper.',
      'Preheat broiler. Ladle soup into oven-safe bowls.',
      'Top with baguette slices and gruyère cheese.',
      'Broil until cheese is bubbly and golden, about 3 minutes.',
      'Serve hot.'
    ],
    cookingTime: 90,
    servings: 6,
    difficulty: 'medium',
    cuisine: 'French',
    tags: ['soup', 'french', 'onion', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect comfort food!' }, { rating: 4, comment: 'Takes time but worth it.' }]
  },
  {
    title: 'Sushi Rolls',
    description: 'Homemade sushi rolls with fresh fish, vegetables, and perfectly seasoned rice. Impress your guests!',
    ingredients: [
      { name: 'Sushi rice', quantity: '2 cups' },
      { name: 'Rice vinegar', quantity: '1/4 cup' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Nori sheets', quantity: '8' },
      { name: 'Fresh salmon', quantity: '200g, sliced' },
      { name: 'Cucumber', quantity: '1, julienned' },
      { name: 'Avocado', quantity: '2, sliced' },
      { name: 'Cream cheese', quantity: '100g' },
      { name: 'Soy sauce', quantity: 'for serving' }
    ],
    instructions: [
      'Cook sushi rice according to package directions.',
      'Mix rice vinegar, sugar, and salt. Fold into warm rice.',
      'Let rice cool to room temperature.',
      'Place nori on bamboo mat, shiny side down.',
      'Spread rice evenly, leaving 1 inch border at top.',
      'Add fillings (salmon, cucumber, avocado, cream cheese) in center.',
      'Roll tightly using bamboo mat.',
      'Slice into 8 pieces with sharp knife.',
      'Serve with soy sauce and wasabi.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'Japanese',
    tags: ['sushi', 'japanese', 'seafood', 'healthy'],
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Beautiful presentation!' }, { rating: 4, comment: 'Takes practice but delicious.' }]
  },
  {
    title: 'Greek Moussaka',
    description: 'Layered casserole with eggplant, spiced meat, and creamy béchamel sauce. A Greek comfort food masterpiece.',
    ingredients: [
      { name: 'Eggplant', quantity: '2 large, sliced' },
      { name: 'Ground lamb', quantity: '500g' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Tomato', quantity: '2, chopped' },
      { name: 'Cinnamon', quantity: '1 tsp' },
      { name: 'Allspice', quantity: '1/2 tsp' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Flour', quantity: '1/4 cup' },
      { name: 'Milk', quantity: '2 cups' },
      { name: 'Parmesan cheese', quantity: '1/2 cup' }
    ],
    instructions: [
      'Salt eggplant slices and let sit for 30 minutes. Rinse and pat dry.',
      'Brown eggplant slices in oil. Set aside.',
      'Cook lamb with onion until browned.',
      'Add tomatoes, cinnamon, and allspice. Simmer 15 minutes.',
      'Make béchamel: melt butter, add flour, whisk in milk until thick.',
      'Layer: eggplant, meat, eggplant, béchamel, parmesan.',
      'Bake at 350°F for 45 minutes until golden.',
      'Let rest 15 minutes before serving.'
    ],
    cookingTime: 120,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Greek',
    tags: ['casserole', 'greek', 'lamb', 'baking'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic and delicious!' }, { rating: 4, comment: 'Complex but worth it.' }]
  },
  {
    title: 'Chicken Fajitas',
    description: 'Sizzling fajitas with marinated chicken, bell peppers, and onions. Serve with warm tortillas and all the fixings!',
    ingredients: [
      { name: 'Chicken breast', quantity: '600g, sliced' },
      { name: 'Bell peppers', quantity: '3, sliced' },
      { name: 'Onion', quantity: '1 large, sliced' },
      { name: 'Lime juice', quantity: '1/4 cup' },
      { name: 'Cumin', quantity: '1 tbsp' },
      { name: 'Chili powder', quantity: '1 tbsp' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Tortillas', quantity: '8' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Guacamole', quantity: '1 cup' }
    ],
    instructions: [
      'Marinate chicken in lime juice, cumin, chili powder, and garlic for 30 minutes.',
      'Heat large skillet over high heat.',
      'Cook chicken until done, about 6-8 minutes. Remove.',
      'Add peppers and onions, cook until tender, about 5 minutes.',
      'Return chicken to pan, toss together.',
      'Warm tortillas.',
      'Serve with sour cream, guacamole, and salsa.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['fajitas', 'chicken', 'mexican', 'quick'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect weeknight meal!' }, { rating: 5, comment: 'So flavorful!' }]
  },
  {
    title: 'Beef Bourguignon',
    description: 'Classic French stew with tender beef braised in red wine with vegetables. Elegant and hearty.',
    ingredients: [
      { name: 'Beef chuck', quantity: '1kg, cubed' },
      { name: 'Red wine', quantity: '750ml' },
      { name: 'Bacon', quantity: '200g, diced' },
      { name: 'Carrots', quantity: '3, chopped' },
      { name: 'Onion', quantity: '2, chopped' },
      { name: 'Mushrooms', quantity: '300g, quartered' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Tomato paste', quantity: '2 tbsp' },
      { name: 'Beef stock', quantity: '2 cups' },
      { name: 'Thyme', quantity: '3 sprigs' }
    ],
    instructions: [
      'Marinate beef in wine overnight.',
      'Preheat oven to 325°F.',
      'Cook bacon until crispy. Remove and set aside.',
      'Brown beef in bacon fat. Remove.',
      'Cook vegetables in same pot until soft.',
      'Add tomato paste, cook 1 minute.',
      'Return beef and bacon. Add wine and stock.',
      'Cover and braise in oven for 3 hours.',
      'Add mushrooms, cook 30 more minutes.',
      'Serve with mashed potatoes or crusty bread.'
    ],
    cookingTime: 240,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'French',
    tags: ['stew', 'beef', 'french', 'wine'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Worth the wait!' }, { rating: 5, comment: 'Restaurant quality.' }]
  },
  {
    title: 'Chicken Teriyaki',
    description: 'Sweet and savory Japanese-style chicken glazed with teriyaki sauce. Quick and delicious!',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Mirin', quantity: '2 tbsp' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Ginger', quantity: '1 tbsp, grated' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Sesame oil', quantity: '1 tsp' },
      { name: 'Cornstarch', quantity: '1 tbsp' },
      { name: 'Green onions', quantity: '2, sliced' },
      { name: 'Sesame seeds', quantity: '1 tbsp' }
    ],
    instructions: [
      'Mix soy sauce, mirin, sugar, ginger, and garlic for marinade.',
      'Marinate chicken for 30 minutes.',
      'Heat oil in large skillet over medium-high heat.',
      'Cook chicken until golden, about 6 minutes per side.',
      'Mix cornstarch with 2 tbsp water. Add to pan.',
      'Simmer until sauce thickens, about 2 minutes.',
      'Garnish with green onions and sesame seeds.',
      'Serve over rice.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Japanese',
    tags: ['chicken', 'japanese', 'teriyaki', 'quick'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect teriyaki!' }, { rating: 4, comment: 'Quick and tasty.' }]
  },
  {
    title: 'Ratatouille',
    description: 'Provençal vegetable stew with eggplant, zucchini, bell peppers, and tomatoes. Healthy and colorful!',
    ingredients: [
      { name: 'Eggplant', quantity: '1 large, diced' },
      { name: 'Zucchini', quantity: '2, sliced' },
      { name: 'Bell peppers', quantity: '2, diced' },
      { name: 'Tomato', quantity: '4, chopped' },
      { name: 'Onion', quantity: '1, sliced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'Herbs de Provence', quantity: '1 tbsp' },
      { name: 'Basil', quantity: '1/4 cup, chopped' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Heat olive oil in large pot over medium heat.',
      'Cook onion until soft, about 5 minutes.',
      'Add garlic, cook 1 minute.',
      'Add eggplant, cook 5 minutes.',
      'Add zucchini and peppers, cook 5 minutes.',
      'Add tomatoes and herbs, simmer 20 minutes.',
      'Stir in basil, season with salt.',
      'Serve warm or cold.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'French',
    tags: ['vegetarian', 'french', 'healthy', 'vegetables'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'So fresh and healthy!' }, { rating: 4, comment: 'Great side dish.' }]
  },
  {
    title: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella. A classic Italian-American favorite.',
    ingredients: [
      { name: 'Chicken breast', quantity: '4 (6oz each)' },
      { name: 'Breadcrumbs', quantity: '1 cup' },
      { name: 'Parmesan cheese', quantity: '1/2 cup, grated' },
      { name: 'Eggs', quantity: '2, beaten' },
      { name: 'Flour', quantity: '1/2 cup' },
      { name: 'Marinara sauce', quantity: '2 cups' },
      { name: 'Mozzarella cheese', quantity: '200g, shredded' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Pound chicken breasts to even thickness.',
      'Season with salt and pepper.',
      'Dredge in flour, then egg, then breadcrumb-parmesan mixture.',
      'Heat olive oil in large skillet over medium-high heat.',
      'Cook chicken 3-4 minutes per side until golden.',
      'Place in baking dish, top with marinara and mozzarella.',
      'Bake 15-20 minutes until cheese is bubbly.',
      'Serve over pasta.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['chicken', 'italian', 'baked', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Restaurant quality!' }, { rating: 5, comment: 'Family favorite.' }]
  },
  {
    title: 'Beef Stroganoff',
    description: 'Tender beef strips in a rich, creamy mushroom sauce. Served over egg noodles for ultimate comfort.',
    ingredients: [
      { name: 'Beef sirloin', quantity: '500g, sliced' },
      { name: 'Mushrooms', quantity: '300g, sliced' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Beef broth', quantity: '1 cup' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Flour', quantity: '2 tbsp' },
      { name: 'Butter', quantity: '3 tbsp' },
      { name: 'Worcestershire sauce', quantity: '1 tbsp' },
      { name: 'Egg noodles', quantity: '400g' }
    ],
    instructions: [
      'Cook egg noodles according to package directions.',
      'Season beef with salt and pepper, dust with flour.',
      'Heat butter in large skillet, brown beef. Remove and set aside.',
      'Add more butter, sauté mushrooms and onion until soft.',
      'Add garlic, cook 1 minute.',
      'Add beef broth and Worcestershire, bring to boil.',
      'Return beef to pan, simmer 5 minutes.',
      'Remove from heat, stir in sour cream.',
      'Serve over noodles.'
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Russian',
    tags: ['beef', 'comfort-food', 'creamy', 'classic'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Creamy and delicious!' }, { rating: 4, comment: 'Perfect comfort food.' }]
  },
  {
    title: 'Fish and Chips',
    description: 'Crispy beer-battered fish with golden fries. A British pub classic that\'s easier to make than you think!',
    ingredients: [
      { name: 'White fish fillets', quantity: '4 (6oz each)' },
      { name: 'All-purpose flour', quantity: '1 1/2 cups' },
      { name: 'Beer', quantity: '1 cup, cold' },
      { name: 'Baking powder', quantity: '1 tsp' },
      { name: 'Potatoes', quantity: '4 large' },
      { name: 'Vegetable oil', quantity: 'for frying' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Malt vinegar', quantity: 'for serving' },
      { name: 'Lemon', quantity: '1, cut into wedges' }
    ],
    instructions: [
      'Cut potatoes into thick fries, soak in cold water 30 minutes.',
      'Mix flour, baking powder, and salt.',
      'Whisk in cold beer until smooth batter forms.',
      'Heat oil to 375°F (190°C).',
      'Dry potatoes, fry until golden. Drain and salt.',
      'Dip fish in batter, fry 4-5 minutes until golden.',
      'Drain on paper towels.',
      'Serve with chips, lemon, and malt vinegar.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'British',
    tags: ['seafood', 'fried', 'british', 'pub-food'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Crispy and perfect!' }, { rating: 4, comment: 'Great recipe.' }]
  },
  {
    title: 'Chicken Fajitas',
    description: 'Sizzling strips of marinated chicken with bell peppers and onions. Serve with warm tortillas and all the fixings!',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g, sliced' },
      { name: 'Bell peppers', quantity: '3, sliced' },
      { name: 'Onion', quantity: '1 large, sliced' },
      { name: 'Lime juice', quantity: '3 tbsp' },
      { name: 'Cumin', quantity: '1 tsp' },
      { name: 'Chili powder', quantity: '1 tsp' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Flour tortillas', quantity: '8' },
      { name: 'Sour cream', quantity: 'for serving' }
    ],
    instructions: [
      'Marinate chicken in lime juice, cumin, chili powder, and garlic for 30 minutes.',
      'Heat oil in large skillet over high heat.',
      'Cook chicken until done, about 5-6 minutes. Remove.',
      'Add peppers and onion, cook until soft, about 5 minutes.',
      'Return chicken to pan, toss together.',
      'Warm tortillas.',
      'Serve with sour cream, guacamole, and salsa.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['chicken', 'mexican', 'quick', 'spicy'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'So flavorful!' }, { rating: 5, comment: 'Perfect weeknight meal.' }]
  },
  {
    title: 'Shrimp Scampi',
    description: 'Succulent shrimp in a garlic, white wine, and butter sauce. Elegant yet quick enough for weeknights.',
    ingredients: [
      { name: 'Large shrimp', quantity: '500g, peeled' },
      { name: 'Linguine', quantity: '400g' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Garlic', quantity: '5 cloves, minced' },
      { name: 'White wine', quantity: '1/2 cup' },
      { name: 'Lemon juice', quantity: '3 tbsp' },
      { name: 'Red pepper flakes', quantity: '1/2 tsp' },
      { name: 'Parsley', quantity: '1/4 cup, chopped' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Cook linguine according to package directions.',
      'Season shrimp with salt and pepper.',
      'Heat butter and oil in large skillet over medium-high heat.',
      'Add shrimp, cook 2 minutes per side. Remove.',
      'Add garlic and red pepper flakes, cook 30 seconds.',
      'Add wine and lemon juice, simmer 2 minutes.',
      'Return shrimp, add parsley.',
      'Toss with pasta and serve.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Italian',
    tags: ['seafood', 'pasta', 'quick', 'elegant'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Restaurant quality!' }, { rating: 5, comment: 'So easy and delicious.' }]
  },
  {
    title: 'BBQ Pulled Pork',
    description: 'Slow-cooked pork shoulder that falls apart, smothered in tangy BBQ sauce. Perfect for sandwiches!',
    ingredients: [
      { name: 'Pork shoulder', quantity: '2kg' },
      { name: 'BBQ sauce', quantity: '2 cups' },
      { name: 'Brown sugar', quantity: '2 tbsp' },
      { name: 'Paprika', quantity: '1 tbsp' },
      { name: 'Garlic powder', quantity: '1 tsp' },
      { name: 'Onion powder', quantity: '1 tsp' },
      { name: 'Salt', quantity: '1 tbsp' },
      { name: 'Black pepper', quantity: '1 tsp' },
      { name: 'Apple cider vinegar', quantity: '1/4 cup' },
      { name: 'Hamburger buns', quantity: '8' }
    ],
    instructions: [
      'Mix spices and rub all over pork. Let sit 1 hour.',
      'Preheat oven to 300°F (150°C).',
      'Place pork in Dutch oven, cover, cook 4-5 hours until tender.',
      'Shred pork with forks.',
      'Mix BBQ sauce with vinegar, toss with pork.',
      'Serve on buns with coleslaw.'
    ],
    cookingTime: 300,
    servings: 8,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['pork', 'bbq', 'slow-cooked', 'sandwich'],
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Fall-apart tender!' }, { rating: 5, comment: 'Best pulled pork ever.' }]
  },
  {
    title: 'Chicken Curry',
    description: 'Aromatic Indian curry with tender chicken pieces in a rich, spiced tomato-based sauce.',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g, bone-in' },
      { name: 'Onion', quantity: '2, diced' },
      { name: 'Tomatoes', quantity: '3, chopped' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Garlic', quantity: '5 cloves, minced' },
      { name: 'Curry powder', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Cumin', quantity: '1 tsp' },
      { name: 'Coconut milk', quantity: '1 cup' },
      { name: 'Vegetable oil', quantity: '3 tbsp' }
    ],
    instructions: [
      'Heat oil in large pot, brown chicken. Remove and set aside.',
      'Add onion, cook until golden, about 8 minutes.',
      'Add ginger and garlic, cook 1 minute.',
      'Add spices, stir 30 seconds.',
      'Add tomatoes, cook until soft, about 5 minutes.',
      'Return chicken, add coconut milk, bring to boil.',
      'Reduce heat, simmer 30 minutes until chicken is tender.',
      'Serve with rice or naan.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['chicken', 'curry', 'indian', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic and delicious!' }, { rating: 4, comment: 'Great curry recipe.' }]
  },
  {
    title: 'French Onion Soup',
    description: 'Rich, caramelized onion soup topped with melted Gruyère cheese and crusty bread. A French bistro classic.',
    ingredients: [
      { name: 'Yellow onions', quantity: '6 large, sliced' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Beef broth', quantity: '6 cups' },
      { name: 'White wine', quantity: '1/2 cup' },
      { name: 'Thyme', quantity: '1 tsp, dried' },
      { name: 'Bay leaf', quantity: '2' },
      { name: 'Gruyère cheese', quantity: '200g, grated' },
      { name: 'French bread', quantity: '4 slices' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Melt butter in large pot over low heat.',
      'Add onions, cook slowly 45 minutes until caramelized.',
      'Add wine, cook 2 minutes.',
      'Add broth, thyme, bay leaf. Simmer 30 minutes.',
      'Season with salt and pepper.',
      'Toast bread slices.',
      'Ladle soup into bowls, top with bread and cheese.',
      'Broil until cheese is bubbly and golden.'
    ],
    cookingTime: 90,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'French',
    tags: ['soup', 'french', 'cheese', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfectly caramelized!' }, { rating: 5, comment: 'Restaurant quality soup.' }]
  },
  {
    title: 'Sushi Rolls',
    description: 'Fresh sushi rolls with your choice of fillings. Learn to make restaurant-quality sushi at home!',
    ingredients: [
      { name: 'Sushi rice', quantity: '2 cups' },
      { name: 'Rice vinegar', quantity: '3 tbsp' },
      { name: 'Sugar', quantity: '1 tbsp' },
      { name: 'Nori sheets', quantity: '4' },
      { name: 'Fresh fish', quantity: '200g, sliced' },
      { name: 'Cucumber', quantity: '1, julienned' },
      { name: 'Avocado', quantity: '1, sliced' },
      { name: 'Soy sauce', quantity: 'for serving' },
      { name: 'Wasabi', quantity: 'for serving' },
      { name: 'Pickled ginger', quantity: 'for serving' }
    ],
    instructions: [
      'Cook rice according to package directions.',
      'Mix vinegar and sugar, fold into warm rice.',
      'Place nori on bamboo mat.',
      'Spread rice on nori, leaving top edge bare.',
      'Add fillings in center.',
      'Roll tightly using mat.',
      'Slice into pieces with sharp knife.',
      'Serve with soy sauce, wasabi, and ginger.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'Japanese',
    tags: ['sushi', 'japanese', 'seafood', 'healthy'],
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Fun to make!' }, { rating: 4, comment: 'Great instructions.' }]
  },
  {
    title: 'Greek Moussaka',
    description: 'Layered casserole with eggplant, spiced meat, and creamy béchamel. A Greek comfort food masterpiece.',
    ingredients: [
      { name: 'Eggplant', quantity: '2 large, sliced' },
      { name: 'Ground lamb', quantity: '500g' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Tomatoes', quantity: '2, chopped' },
      { name: 'Cinnamon', quantity: '1/2 tsp' },
      { name: 'Allspice', quantity: '1/2 tsp' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Flour', quantity: '3 tbsp' },
      { name: 'Milk', quantity: '2 cups' },
      { name: 'Parmesan cheese', quantity: '1/2 cup, grated' }
    ],
    instructions: [
      'Salt eggplant slices, let sit 30 minutes. Rinse and pat dry.',
      'Fry eggplant until golden. Set aside.',
      'Cook lamb with onion until browned.',
      'Add tomatoes and spices, simmer 15 minutes.',
      'Make béchamel: melt butter, add flour, whisk in milk.',
      'Cook until thick, season with salt and nutmeg.',
      'Layer: eggplant, meat, repeat. Top with béchamel and cheese.',
      'Bake at 375°F (190°C) for 45 minutes until golden.'
    ],
    cookingTime: 120,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Greek',
    tags: ['lamb', 'greek', 'baked', 'casserole'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic Greek dish!' }, { rating: 4, comment: 'Worth the effort.' }]
  },
  {
    title: 'Beef Bourguignon',
    description: 'Classic French stew with tender beef braised in red wine with vegetables. Elegant and hearty.',
    ingredients: [
      { name: 'Beef chuck', quantity: '1kg, cubed' },
      { name: 'Red wine', quantity: '750ml' },
      { name: 'Bacon', quantity: '200g, diced' },
      { name: 'Carrots', quantity: '3, chopped' },
      { name: 'Onion', quantity: '1, chopped' },
      { name: 'Mushrooms', quantity: '300g, quartered' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Tomato paste', quantity: '2 tbsp' },
      { name: 'Beef stock', quantity: '2 cups' },
      { name: 'Thyme', quantity: '2 sprigs' }
    ],
    instructions: [
      'Marinate beef in wine overnight.',
      'Preheat oven to 325°F (160°C).',
      'Cook bacon until crispy. Remove.',
      'Brown beef in bacon fat. Remove.',
      'Cook vegetables until soft.',
      'Add tomato paste, cook 1 minute.',
      'Return beef and bacon, add stock and wine.',
      'Cover and braise in oven 3 hours.',
      'Add mushrooms, cook 30 more minutes.',
      'Serve with mashed potatoes.'
    ],
    cookingTime: 240,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'French',
    tags: ['beef', 'french', 'stew', 'wine'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Worth the wait!' }, { rating: 5, comment: 'Perfect for special occasions.' }]
  },
  {
    title: 'Chicken Teriyaki',
    description: 'Sweet and savory Japanese-style chicken glazed with homemade teriyaki sauce. Quick and delicious!',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Mirin', quantity: '2 tbsp' },
      { name: 'Sake', quantity: '2 tbsp' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Cornstarch', quantity: '1 tsp' },
      { name: 'Sesame seeds', quantity: '1 tbsp' },
      { name: 'Green onions', quantity: '2, sliced' }
    ],
    instructions: [
      'Mix soy sauce, mirin, sake, and sugar for sauce.',
      'Marinate chicken in half the sauce for 30 minutes.',
      'Heat pan over medium-high heat.',
      'Cook chicken skin-side down until crispy, about 6 minutes.',
      'Flip and cook until done, about 5 minutes.',
      'Add remaining sauce, simmer until thick.',
      'Garnish with sesame seeds and green onions.',
      'Serve over rice.'
    ],
    cookingTime: 35,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Japanese',
    tags: ['chicken', 'japanese', 'teriyaki', 'quick'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect glaze!' }, { rating: 5, comment: 'Better than takeout.' }]
  },
  {
    title: 'Ratatouille',
    description: 'Provençal vegetable stew with eggplant, zucchini, bell peppers, and tomatoes. Healthy and colorful!',
    ingredients: [
      { name: 'Eggplant', quantity: '1 large, diced' },
      { name: 'Zucchini', quantity: '2, sliced' },
      { name: 'Bell peppers', quantity: '2, diced' },
      { name: 'Tomato', quantity: '4, chopped' },
      { name: 'Onion', quantity: '1, sliced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'Herbs de Provence', quantity: '1 tbsp' },
      { name: 'Basil', quantity: '1/4 cup, chopped' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Heat olive oil in large pot over medium heat.',
      'Cook onion until soft, about 5 minutes.',
      'Add garlic, cook 1 minute.',
      'Add eggplant, cook 5 minutes.',
      'Add zucchini and peppers, cook 5 minutes.',
      'Add tomatoes and herbs, simmer 20 minutes.',
      'Stir in basil, season with salt.',
      'Serve warm or cold.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'French',
    tags: ['vegetarian', 'french', 'healthy', 'vegetables'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'So fresh and healthy!' }, { rating: 4, comment: 'Great side dish.' }]
  },
  {
    title: 'Chicken Alfredo',
    description: 'Creamy pasta with tender chicken and rich Alfredo sauce. A restaurant favorite made at home!',
    ingredients: [
      { name: 'Fettuccine', quantity: '400g' },
      { name: 'Chicken breast', quantity: '500g, sliced' },
      { name: 'Heavy cream', quantity: '2 cups' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Parmesan cheese', quantity: '1 cup, grated' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' },
      { name: 'Parsley', quantity: '2 tbsp, chopped' }
    ],
    instructions: [
      'Cook fettuccine according to package directions.',
      'Season chicken with salt and pepper.',
      'Cook chicken in butter until done. Remove.',
      'Add garlic to pan, cook 30 seconds.',
      'Add cream, simmer until slightly reduced.',
      'Stir in parmesan until melted.',
      'Return chicken, add pasta, toss.',
      'Garnish with parsley and serve.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Italian',
    tags: ['chicken', 'pasta', 'creamy', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Creamy perfection!' }, { rating: 5, comment: 'Better than restaurants.' }]
  },
  {
    title: 'Beef Tacos',
    description: 'Classic Mexican tacos with seasoned ground beef, fresh toppings, and warm tortillas. A family favorite!',
    ingredients: [
      { name: 'Ground beef', quantity: '500g' },
      { name: 'Taco seasoning', quantity: '1 packet' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Taco shells', quantity: '12' },
      { name: 'Lettuce', quantity: '2 cups, shredded' },
      { name: 'Tomato', quantity: '2, diced' },
      { name: 'Cheddar cheese', quantity: '1 cup, shredded' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Salsa', quantity: '1/2 cup' }
    ],
    instructions: [
      'Brown ground beef in large skillet.',
      'Add onion and garlic, cook until soft.',
      'Add taco seasoning and water, simmer 5 minutes.',
      'Warm taco shells according to package.',
      'Fill shells with beef mixture.',
      'Top with lettuce, tomato, cheese, sour cream, and salsa.',
      'Serve immediately.'
    ],
    cookingTime: 25,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['beef', 'mexican', 'quick', 'family-friendly'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Kids love it!' }, { rating: 4, comment: 'Quick and easy.' }]
  },
  {
    title: 'Lobster Bisque',
    description: 'Rich and creamy soup made with lobster shells and meat. Elegant and luxurious.',
    ingredients: [
      { name: 'Lobster', quantity: '2 (1kg each)' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Carrot', quantity: '1, diced' },
      { name: 'Celery', quantity: '2 stalks, diced' },
      { name: 'Tomato paste', quantity: '2 tbsp' },
      { name: 'Brandy', quantity: '1/4 cup' },
      { name: 'Heavy cream', quantity: '1 cup' },
      { name: 'Fish stock', quantity: '4 cups' },
      { name: 'Paprika', quantity: '1 tsp' }
    ],
    instructions: [
      'Cook lobsters, remove meat. Reserve shells.',
      'Sauté vegetables in butter until soft.',
      'Add shells, cook 5 minutes.',
      'Add tomato paste and brandy, flambé.',
      'Add stock, simmer 30 minutes.',
      'Strain, return to pot.',
      'Add cream and lobster meat, heat through.',
      'Season with paprika, salt, and pepper.',
      'Serve hot.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'French',
    tags: ['seafood', 'soup', 'french', 'elegant'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Restaurant quality!' }, { rating: 5, comment: 'Worth the effort.' }]
  },
  {
    title: 'Chicken Shawarma',
    description: 'Middle Eastern spiced chicken with garlic sauce, wrapped in warm pita. Bursting with flavor!',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g, sliced' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Lemon juice', quantity: '3 tbsp' },
      { name: 'Cumin', quantity: '1 tsp' },
      { name: 'Coriander', quantity: '1 tsp' },
      { name: 'Paprika', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Pita bread', quantity: '4' },
      { name: 'Tahini sauce', quantity: '1/2 cup' }
    ],
    instructions: [
      'Mix yogurt, lemon, spices, and garlic.',
      'Marinate chicken for at least 2 hours.',
      'Cook chicken in pan until done, about 8 minutes.',
      'Warm pita bread.',
      'Fill pita with chicken.',
      'Drizzle with tahini sauce.',
      'Add vegetables if desired.',
      'Serve immediately.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Middle Eastern',
    tags: ['chicken', 'middle-eastern', 'spicy', 'wrap'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic flavors!' }, { rating: 5, comment: 'So good!' }]
  },
  {
    title: 'Beef Wellington',
    description: 'Tender beef fillet wrapped in puff pastry with mushroom duxelles. A show-stopping centerpiece dish.',
    ingredients: [
      { name: 'Beef fillet', quantity: '1kg' },
      { name: 'Puff pastry', quantity: '500g' },
      { name: 'Mushrooms', quantity: '400g, finely chopped' },
      { name: 'Pâté', quantity: '200g' },
      { name: 'Prosciutto', quantity: '8 slices' },
      { name: 'Dijon mustard', quantity: '2 tbsp' },
      { name: 'Egg', quantity: '1, beaten' },
      { name: 'Butter', quantity: '2 tbsp' },
      { name: 'Thyme', quantity: '1 tsp' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Sear beef fillet on all sides. Cool completely.',
      'Brush with mustard.',
      'Cook mushrooms until dry. Cool.',
      'Lay prosciutto on plastic wrap.',
      'Spread pâté, then mushrooms.',
      'Place beef on top, wrap tightly. Chill 30 minutes.',
      'Wrap in pastry, seal edges.',
      'Brush with egg, score top.',
      'Bake at 400°F (200°C) for 25-30 minutes.',
      'Rest 10 minutes before slicing.'
    ],
    cookingTime: 90,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'British',
    tags: ['beef', 'british', 'elegant', 'special-occasion'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Impressive dish!' }, { rating: 5, comment: 'Perfect for dinner parties.' }]
  },
  {
    title: 'Pad See Ew',
    description: 'Thai stir-fried wide rice noodles with soy sauce, Chinese broccoli, and your choice of protein.',
    ingredients: [
      { name: 'Wide rice noodles', quantity: '400g' },
      { name: 'Chicken or beef', quantity: '300g, sliced' },
      { name: 'Chinese broccoli', quantity: '200g' },
      { name: 'Dark soy sauce', quantity: '3 tbsp' },
      { name: 'Light soy sauce', quantity: '2 tbsp' },
      { name: 'Oyster sauce', quantity: '2 tbsp' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Vegetable oil', quantity: '3 tbsp' },
      { name: 'White pepper', quantity: '1/2 tsp' }
    ],
    instructions: [
      'Soak noodles in warm water until pliable.',
      'Heat oil in wok over high heat.',
      'Scramble eggs, remove.',
      'Cook meat until done. Remove.',
      'Add garlic, stir-fry 30 seconds.',
      'Add broccoli, cook 2 minutes.',
      'Add noodles and sauces, toss.',
      'Return eggs and meat, toss.',
      'Season with white pepper.',
      'Serve hot.'
    ],
    cookingTime: 25,
    servings: 3,
    difficulty: 'medium',
    cuisine: 'Thai',
    tags: ['noodles', 'thai', 'stir-fry', 'quick'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic Thai taste!' }, { rating: 4, comment: 'Great recipe.' }]
  },
  {
    title: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken and caramelized onions. A celebratory Indian dish.',
    ingredients: [
      { name: 'Basmati rice', quantity: '2 cups' },
      { name: 'Chicken', quantity: '800g, cut into pieces' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Biryani masala', quantity: '2 tbsp' },
      { name: 'Onions', quantity: '3, sliced' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Saffron', quantity: '1/4 tsp' },
      { name: 'Milk', quantity: '2 tbsp, warm' },
      { name: 'Ghee', quantity: '3 tbsp' },
      { name: 'Cilantro', quantity: '1/4 cup, chopped' }
    ],
    instructions: [
      'Soak rice 30 minutes. Parboil until 70% cooked.',
      'Marinate chicken in yogurt and spices for 2 hours.',
      'Fry onions until golden. Set aside.',
      'Cook chicken until done, about 20 minutes.',
      'Soak saffron in warm milk.',
      'Layer: rice, chicken, onions, repeat.',
      'Drizzle saffron milk and ghee.',
      'Cover tightly, cook on low heat 20 minutes.',
      'Garnish with cilantro and serve.'
    ],
    cookingTime: 90,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Indian',
    tags: ['chicken', 'indian', 'rice', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect biryani!' }, { rating: 5, comment: 'Worth the effort.' }]
  },
  {
    title: 'Beef Bulgogi',
    description: 'Korean marinated beef that\'s sweet, savory, and incredibly tender. Perfect for grilling or pan-frying.',
    ingredients: [
      { name: 'Beef sirloin', quantity: '500g, thinly sliced' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Pear', quantity: '1/2, grated' },
      { name: 'Brown sugar', quantity: '2 tbsp' },
      { name: 'Sesame oil', quantity: '1 tbsp' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Green onions', quantity: '3, sliced' },
      { name: 'Black pepper', quantity: '1/2 tsp' },
      { name: 'Sesame seeds', quantity: '1 tbsp' }
    ],
    instructions: [
      'Mix all marinade ingredients.',
      'Marinate beef for at least 2 hours, preferably overnight.',
      'Heat pan or grill over high heat.',
      'Cook beef 2-3 minutes per side until caramelized.',
      'Garnish with sesame seeds and green onions.',
      'Serve with rice and kimchi.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Korean',
    tags: ['beef', 'korean', 'marinated', 'grilled'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'So tender and flavorful!' }, { rating: 5, comment: 'Authentic Korean taste.' }]
  },
  {
    title: 'Chicken Piccata',
    description: 'Tender chicken in a lemony, buttery sauce with capers. Elegant and quick enough for weeknights.',
    ingredients: [
      { name: 'Chicken breast', quantity: '4 (6oz each)' },
      { name: 'Flour', quantity: '1/2 cup' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'White wine', quantity: '1/2 cup' },
      { name: 'Lemon juice', quantity: '1/4 cup' },
      { name: 'Capers', quantity: '2 tbsp' },
      { name: 'Chicken broth', quantity: '1/2 cup' },
      { name: 'Parsley', quantity: '2 tbsp, chopped' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Pound chicken to even thickness.',
      'Season and dredge in flour.',
      'Heat butter in large skillet.',
      'Cook chicken 4-5 minutes per side. Remove.',
      'Add wine, lemon juice, and broth.',
      'Simmer until reduced by half.',
      'Add capers and parsley.',
      'Return chicken, heat through.',
      'Serve with pasta or rice.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Italian',
    tags: ['chicken', 'italian', 'lemon', 'quick'],
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Light and delicious!' }, { rating: 4, comment: 'Perfect weeknight meal.' }]
  },
  {
    title: 'Beef Rendang',
    description: 'Slow-cooked Indonesian curry with tender beef in a rich, coconut-based sauce. Complex and aromatic.',
    ingredients: [
      { name: 'Beef chuck', quantity: '1kg, cubed' },
      { name: 'Coconut milk', quantity: '2 cups' },
      { name: 'Lemongrass', quantity: '2 stalks' },
      { name: 'Galangal', quantity: '1 inch, sliced' },
      { name: 'Kaffir lime leaves', quantity: '4' },
      { name: 'Turmeric leaves', quantity: '2' },
      { name: 'Coconut', quantity: '1/2 cup, grated' },
      { name: 'Tamarind paste', quantity: '1 tbsp' },
      { name: 'Palm sugar', quantity: '1 tbsp' },
      { name: 'Spice paste', quantity: '1/2 cup' }
    ],
    instructions: [
      'Toast coconut until golden. Grind to paste.',
      'Heat coconut milk in large pot.',
      'Add spice paste, lemongrass, galangal.',
      'Add beef, bring to boil.',
      'Reduce heat, simmer 2 hours.',
      'Add lime leaves and turmeric leaves.',
      'Continue cooking until sauce is thick and dry.',
      'Stir in tamarind and palm sugar.',
      'Serve with steamed rice.'
    ],
    cookingTime: 180,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Indonesian',
    tags: ['beef', 'indonesian', 'curry', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic and amazing!' }, { rating: 5, comment: 'Worth the long cook time.' }]
  },
  {
    title: 'Chicken Satay',
    description: 'Tender chicken skewers marinated in spices and grilled, served with creamy peanut sauce.',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g, cubed' },
      { name: 'Coconut milk', quantity: '1/2 cup' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Cumin', quantity: '1 tsp' },
      { name: 'Coriander', quantity: '1 tsp' },
      { name: 'Lemongrass', quantity: '1 stalk, minced' },
      { name: 'Peanut butter', quantity: '1/2 cup' },
      { name: 'Soy sauce', quantity: '2 tbsp' },
      { name: 'Lime juice', quantity: '2 tbsp' },
      { name: 'Bamboo skewers', quantity: '12' }
    ],
    instructions: [
      'Soak skewers in water 30 minutes.',
      'Mix coconut milk and spices for marinade.',
      'Marinate chicken 2 hours.',
      'Thread chicken onto skewers.',
      'Grill 4-5 minutes per side.',
      'Mix peanut butter, soy sauce, and lime for sauce.',
      'Serve with peanut sauce and cucumber salad.'
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Thai',
    tags: ['chicken', 'thai', 'grilled', 'appetizer'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect satay!' }, { rating: 5, comment: 'Great for parties.' }]
  },
  {
    title: 'Beef Pho',
    description: 'Vietnamese noodle soup with aromatic broth, tender beef, and fresh herbs. Comforting and flavorful.',
    ingredients: [
      { name: 'Beef bones', quantity: '2kg' },
      { name: 'Beef sirloin', quantity: '300g, thinly sliced' },
      { name: 'Rice noodles', quantity: '400g' },
      { name: 'Onion', quantity: '2, halved' },
      { name: 'Ginger', quantity: '3 inches, sliced' },
      { name: 'Star anise', quantity: '3' },
      { name: 'Cinnamon stick', quantity: '1' },
      { name: 'Fish sauce', quantity: '3 tbsp' },
      { name: 'Bean sprouts', quantity: '2 cups' },
      { name: 'Thai basil', quantity: '1 cup' }
    ],
    instructions: [
      'Roast bones, onion, and ginger until charred.',
      'Simmer bones with spices 4-6 hours.',
      'Strain broth, season with fish sauce.',
      'Cook noodles according to package.',
      'Blanch bean sprouts.',
      'Arrange noodles, raw beef, and herbs in bowls.',
      'Pour hot broth over top.',
      'Serve with lime, hoisin, and sriracha.'
    ],
    cookingTime: 360,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'Vietnamese',
    tags: ['beef', 'soup', 'vietnamese', 'noodles'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic pho!' }, { rating: 5, comment: 'Worth the long cook time.' }]
  },
  {
    title: 'Chicken Korma',
    description: 'Mild and creamy Indian curry with tender chicken in a rich, nutty sauce. Perfect for those who prefer less heat.',
    ingredients: [
      { name: 'Chicken', quantity: '600g, cut into pieces' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Heavy cream', quantity: '1/2 cup' },
      { name: 'Cashews', quantity: '1/4 cup' },
      { name: 'Onion', quantity: '2, diced' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Cardamom', quantity: '4 pods' },
      { name: 'Ghee', quantity: '3 tbsp' }
    ],
    instructions: [
      'Soak cashews in warm water 30 minutes. Blend to paste.',
      'Marinate chicken in yogurt and spices 1 hour.',
      'Heat ghee, cook onions until golden.',
      'Add ginger-garlic paste, cook 2 minutes.',
      'Add chicken, cook until sealed.',
      'Add cashew paste and cream.',
      'Simmer 20 minutes until chicken is tender.',
      'Garnish with cilantro and serve with rice.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['chicken', 'indian', 'curry', 'creamy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Creamy and delicious!' }, { rating: 5, comment: 'Perfect mild curry.' }]
  },
  {
    title: 'Beef Tacos',
    description: 'Classic Mexican tacos with seasoned ground beef, fresh toppings, and warm tortillas. A family favorite!',
    ingredients: [
      { name: 'Ground beef', quantity: '500g' },
      { name: 'Taco seasoning', quantity: '1 packet' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Taco shells', quantity: '12' },
      { name: 'Lettuce', quantity: '2 cups, shredded' },
      { name: 'Tomato', quantity: '2, diced' },
      { name: 'Cheddar cheese', quantity: '1 cup, shredded' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Salsa', quantity: '1/2 cup' }
    ],
    instructions: [
      'Brown ground beef in large skillet.',
      'Add onion and garlic, cook until soft.',
      'Add taco seasoning and water, simmer 5 minutes.',
      'Warm taco shells according to package.',
      'Fill shells with beef mixture.',
      'Top with lettuce, tomato, cheese, sour cream, and salsa.',
      'Serve immediately.'
    ],
    cookingTime: 25,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['beef', 'mexican', 'quick', 'family-friendly'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Kids love it!' }, { rating: 4, comment: 'Quick and easy.' }]
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Creamy, aromatic Indian curry with tender chicken pieces. A restaurant favorite you can make at home!',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g, cubed' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Garam masala', quantity: '2 tsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Heavy cream', quantity: '1 cup' },
      { name: 'Tomato puree', quantity: '1 cup' },
      { name: 'Onion', quantity: '1 large, diced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Butter', quantity: '2 tbsp' }
    ],
    instructions: [
      'Marinate chicken in yogurt, garam masala, and turmeric for at least 2 hours.',
      'Heat butter in a large pan and sauté onions until golden brown.',
      'Add garlic and ginger, cook for 1 minute until fragrant.',
      'Add tomato puree and cook for 5 minutes until oil separates.',
      'Add marinated chicken and cook until chicken is done, about 10 minutes.',
      'Pour in heavy cream and simmer for 5 minutes.',
      'Garnish with fresh cilantro and serve with basmati rice or naan.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['curry', 'indian', 'chicken', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Absolutely delicious! Better than restaurant quality.' }, { rating: 5, comment: 'My family loved it! Will make again.' }]
  },
  {
    title: 'Spaghetti Carbonara',
    description: 'Creamy Italian pasta with eggs, cheese, pancetta, and black pepper. A Roman classic that\'s simple yet elegant.',
    ingredients: [
      { name: 'Spaghetti', quantity: '400g' },
      { name: 'Eggs', quantity: '4 large' },
      { name: 'Parmesan cheese', quantity: '1 cup, grated' },
      { name: 'Pancetta', quantity: '200g, diced' },
      { name: 'Black pepper', quantity: '1 tsp, freshly ground' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Cook spaghetti in salted boiling water until al dente.',
      'While pasta cooks, whisk eggs with parmesan and black pepper.',
      'Cook pancetta in a large pan until crispy.',
      'Add garlic and cook for 30 seconds.',
      'Drain pasta, reserving some pasta water.',
      'Add hot pasta to the pan with pancetta.',
      'Remove from heat and quickly toss with egg mixture.',
      'Add pasta water if needed to create creamy sauce.',
      'Serve immediately with extra parmesan and black pepper.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['pasta', 'italian', 'quick', 'classic'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect carbonara!' }, { rating: 4, comment: 'Delicious and creamy.' }]
  },
  {
    title: 'Beef Bourguignon',
    description: 'Classic French stew with tender beef braised in red wine with vegetables. Elegant and hearty.',
    ingredients: [
      { name: 'Beef chuck', quantity: '1kg, cubed' },
      { name: 'Red wine', quantity: '750ml' },
      { name: 'Bacon', quantity: '200g, diced' },
      { name: 'Carrots', quantity: '3, chopped' },
      { name: 'Onion', quantity: '1, chopped' },
      { name: 'Mushrooms', quantity: '300g, quartered' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Tomato paste', quantity: '2 tbsp' },
      { name: 'Beef stock', quantity: '2 cups' },
      { name: 'Thyme', quantity: '2 sprigs' }
    ],
    instructions: [
      'Marinate beef in wine overnight.',
      'Preheat oven to 325°F (160°C).',
      'Cook bacon until crispy. Remove.',
      'Brown beef in bacon fat. Remove.',
      'Cook vegetables until soft.',
      'Add tomato paste, cook 1 minute.',
      'Return beef and bacon, add stock and wine.',
      'Cover and braise in oven 3 hours.',
      'Add mushrooms, cook 30 more minutes.',
      'Serve with mashed potatoes.'
    ],
    cookingTime: 240,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'French',
    tags: ['beef', 'french', 'stew', 'wine'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Worth the wait!' }, { rating: 5, comment: 'Perfect for special occasions.' }]
  },
  {
    title: 'Chicken Teriyaki',
    description: 'Sweet and savory Japanese-style chicken glazed with homemade teriyaki sauce. Quick and delicious!',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Mirin', quantity: '2 tbsp' },
      { name: 'Sake', quantity: '2 tbsp' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Cornstarch', quantity: '1 tsp' },
      { name: 'Sesame seeds', quantity: '1 tbsp' },
      { name: 'Green onions', quantity: '2, sliced' }
    ],
    instructions: [
      'Mix soy sauce, mirin, sake, and sugar for sauce.',
      'Marinate chicken in half the sauce for 30 minutes.',
      'Heat pan over medium-high heat.',
      'Cook chicken skin-side down until crispy, about 6 minutes.',
      'Flip and cook until done, about 5 minutes.',
      'Add remaining sauce, simmer until thick.',
      'Garnish with sesame seeds and green onions.',
      'Serve over rice.'
    ],
    cookingTime: 35,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Japanese',
    tags: ['chicken', 'japanese', 'teriyaki', 'quick'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect glaze!' }, { rating: 5, comment: 'Better than takeout.' }]
  },
  {
    title: 'Ratatouille',
    description: 'Provençal vegetable stew with eggplant, zucchini, bell peppers, and tomatoes. Healthy and colorful!',
    ingredients: [
      { name: 'Eggplant', quantity: '1 large, diced' },
      { name: 'Zucchini', quantity: '2, sliced' },
      { name: 'Bell peppers', quantity: '2, diced' },
      { name: 'Tomato', quantity: '4, chopped' },
      { name: 'Onion', quantity: '1, sliced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'Herbs de Provence', quantity: '1 tbsp' },
      { name: 'Basil', quantity: '1/4 cup, chopped' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Heat olive oil in large pot over medium heat.',
      'Cook onion until soft, about 5 minutes.',
      'Add garlic, cook 1 minute.',
      'Add eggplant, cook 5 minutes.',
      'Add zucchini and peppers, cook 5 minutes.',
      'Add tomatoes and herbs, simmer 20 minutes.',
      'Stir in basil, season with salt.',
      'Serve warm or cold.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'French',
    tags: ['vegetarian', 'french', 'healthy', 'vegetables'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'So fresh and healthy!' }, { rating: 4, comment: 'Great side dish.' }]
  },
  {
    title: 'Penne Arrabbiata',
    description: 'Spicy Italian pasta with tomatoes, garlic, and red chili peppers. Simple but full of flavor!',
    ingredients: [
      { name: 'Penne pasta', quantity: '400g' },
      { name: 'Tomatoes', quantity: '800g, canned' },
      { name: 'Garlic', quantity: '4 cloves, sliced' },
      { name: 'Red chili peppers', quantity: '2, chopped' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'White wine', quantity: '1/4 cup' },
      { name: 'Parsley', quantity: '1/4 cup, chopped' },
      { name: 'Parmesan cheese', quantity: '1/2 cup, grated' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Cook penne according to package directions.',
      'Heat olive oil in large pan.',
      'Add garlic and chili, cook 1 minute.',
      'Add tomatoes, break up with spoon.',
      'Add wine, simmer 15 minutes.',
      'Season with salt.',
      'Toss with pasta and parsley.',
      'Serve with parmesan cheese.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Italian',
    tags: ['pasta', 'italian', 'spicy', 'quick'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfectly spicy!' }, { rating: 4, comment: 'Quick and delicious.' }]
  },
  {
    title: 'Chicken Adobo',
    description: 'Filipino chicken braised in soy sauce, vinegar, and garlic. Tangy, savory, and incredibly flavorful.',
    ingredients: [
      { name: 'Chicken thighs', quantity: '800g' },
      { name: 'Soy sauce', quantity: '1/2 cup' },
      { name: 'White vinegar', quantity: '1/2 cup' },
      { name: 'Garlic', quantity: '8 cloves, crushed' },
      { name: 'Bay leaves', quantity: '3' },
      { name: 'Black peppercorns', quantity: '1 tsp' },
      { name: 'Brown sugar', quantity: '1 tbsp' },
      { name: 'Water', quantity: '1 cup' },
      { name: 'Oil', quantity: '2 tbsp' }
    ],
    instructions: [
      'Combine soy sauce, vinegar, garlic, bay leaves, and peppercorns.',
      'Marinate chicken 30 minutes.',
      'Heat oil in large pot.',
      'Brown chicken on both sides.',
      'Add marinade and water.',
      'Bring to boil, reduce heat, simmer 30 minutes.',
      'Add sugar, cook 10 more minutes.',
      'Serve with rice.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Filipino',
    tags: ['chicken', 'filipino', 'tangy', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic Filipino flavor!' }, { rating: 5, comment: 'Family favorite.' }]
  },
  {
    title: 'Beef Stroganoff',
    description: 'Tender beef strips in a rich, creamy mushroom sauce. Served over egg noodles for ultimate comfort.',
    ingredients: [
      { name: 'Beef sirloin', quantity: '500g, sliced' },
      { name: 'Mushrooms', quantity: '300g, sliced' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Garlic', quantity: '3 cloves, minced' },
      { name: 'Beef broth', quantity: '1 cup' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Flour', quantity: '2 tbsp' },
      { name: 'Butter', quantity: '3 tbsp' },
      { name: 'Worcestershire sauce', quantity: '1 tbsp' },
      { name: 'Egg noodles', quantity: '400g' }
    ],
    instructions: [
      'Cook egg noodles according to package directions.',
      'Season beef with salt and pepper, dust with flour.',
      'Heat butter in large skillet, brown beef. Remove and set aside.',
      'Add more butter, sauté mushrooms and onion until soft.',
      'Add garlic, cook 1 minute.',
      'Add beef broth and Worcestershire, bring to boil.',
      'Return beef to pan, simmer 5 minutes.',
      'Remove from heat, stir in sour cream.',
      'Serve over noodles.'
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Russian',
    tags: ['beef', 'comfort-food', 'creamy', 'classic'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Creamy and delicious!' }, { rating: 4, comment: 'Perfect comfort food.' }]
  },
  {
    title: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella. A classic Italian-American favorite.',
    ingredients: [
      { name: 'Chicken breast', quantity: '4 (6oz each)' },
      { name: 'Breadcrumbs', quantity: '1 cup' },
      { name: 'Parmesan cheese', quantity: '1/2 cup, grated' },
      { name: 'Eggs', quantity: '2, beaten' },
      { name: 'Flour', quantity: '1/2 cup' },
      { name: 'Marinara sauce', quantity: '2 cups' },
      { name: 'Mozzarella cheese', quantity: '200g, shredded' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Pound chicken breasts to even thickness.',
      'Season with salt and pepper.',
      'Dredge in flour, then egg, then breadcrumb-parmesan mixture.',
      'Heat olive oil in large skillet over medium-high heat.',
      'Cook chicken 3-4 minutes per side until golden.',
      'Place in baking dish, top with marinara and mozzarella.',
      'Bake 15-20 minutes until cheese is bubbly.',
      'Serve over pasta.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['chicken', 'italian', 'baked', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Restaurant quality!' }, { rating: 5, comment: 'Family favorite.' }]
  },
  {
    title: 'Beef Tacos',
    description: 'Classic Mexican tacos with seasoned ground beef, fresh toppings, and warm tortillas. A family favorite!',
    ingredients: [
      { name: 'Ground beef', quantity: '500g' },
      { name: 'Taco seasoning', quantity: '1 packet' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Taco shells', quantity: '12' },
      { name: 'Lettuce', quantity: '2 cups, shredded' },
      { name: 'Tomato', quantity: '2, diced' },
      { name: 'Cheddar cheese', quantity: '1 cup, shredded' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Salsa', quantity: '1/2 cup' }
    ],
    instructions: [
      'Brown ground beef in large skillet.',
      'Add onion and garlic, cook until soft.',
      'Add taco seasoning and water, simmer 5 minutes.',
      'Warm taco shells according to package.',
      'Fill shells with beef mixture.',
      'Top with lettuce, tomato, cheese, sour cream, and salsa.',
      'Serve immediately.'
    ],
    cookingTime: 25,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['beef', 'mexican', 'quick', 'family-friendly'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Kids love it!' }, { rating: 4, comment: 'Quick and easy.' }]
  },
  {
    title: 'Chicken Curry',
    description: 'Aromatic Indian curry with tender chicken pieces in a rich, spiced tomato-based sauce.',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g, bone-in' },
      { name: 'Onion', quantity: '2, diced' },
      { name: 'Tomatoes', quantity: '3, chopped' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Garlic', quantity: '5 cloves, minced' },
      { name: 'Curry powder', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Cumin', quantity: '1 tsp' },
      { name: 'Coconut milk', quantity: '1 cup' },
      { name: 'Vegetable oil', quantity: '3 tbsp' }
    ],
    instructions: [
      'Heat oil in large pot, brown chicken. Remove and set aside.',
      'Add onion, cook until golden, about 8 minutes.',
      'Add ginger and garlic, cook 1 minute.',
      'Add spices, stir 30 seconds.',
      'Add tomatoes, cook until soft, about 5 minutes.',
      'Return chicken, add coconut milk, bring to boil.',
      'Reduce heat, simmer 30 minutes until chicken is tender.',
      'Serve with rice or naan.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['chicken', 'curry', 'indian', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic and delicious!' }, { rating: 4, comment: 'Great curry recipe.' }]
  },
  {
    title: 'French Onion Soup',
    description: 'Rich, caramelized onion soup topped with melted Gruyère cheese and crusty bread. A French bistro classic.',
    ingredients: [
      { name: 'Yellow onions', quantity: '6 large, sliced' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Beef broth', quantity: '6 cups' },
      { name: 'White wine', quantity: '1/2 cup' },
      { name: 'Thyme', quantity: '1 tsp, dried' },
      { name: 'Bay leaf', quantity: '2' },
      { name: 'Gruyère cheese', quantity: '200g, grated' },
      { name: 'French bread', quantity: '4 slices' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Black pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Melt butter in large pot over low heat.',
      'Add onions, cook slowly 45 minutes until caramelized.',
      'Add wine, cook 2 minutes.',
      'Add broth, thyme, bay leaf. Simmer 30 minutes.',
      'Season with salt and pepper.',
      'Toast bread slices.',
      'Ladle soup into bowls, top with bread and cheese.',
      'Broil until cheese is bubbly and golden.'
    ],
    cookingTime: 90,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'French',
    tags: ['soup', 'french', 'cheese', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfectly caramelized!' }, { rating: 5, comment: 'Restaurant quality soup.' }]
  },
  {
    title: 'Sushi Rolls',
    description: 'Fresh sushi rolls with your choice of fillings. Learn to make restaurant-quality sushi at home!',
    ingredients: [
      { name: 'Sushi rice', quantity: '2 cups' },
      { name: 'Rice vinegar', quantity: '3 tbsp' },
      { name: 'Sugar', quantity: '1 tbsp' },
      { name: 'Nori sheets', quantity: '4' },
      { name: 'Fresh fish', quantity: '200g, sliced' },
      { name: 'Cucumber', quantity: '1, julienned' },
      { name: 'Avocado', quantity: '1, sliced' },
      { name: 'Soy sauce', quantity: 'for serving' },
      { name: 'Wasabi', quantity: 'for serving' },
      { name: 'Pickled ginger', quantity: 'for serving' }
    ],
    instructions: [
      'Cook rice according to package directions.',
      'Mix vinegar and sugar, fold into warm rice.',
      'Place nori on bamboo mat.',
      'Spread rice on nori, leaving top edge bare.',
      'Add fillings in center.',
      'Roll tightly using mat.',
      'Slice into pieces with sharp knife.',
      'Serve with soy sauce, wasabi, and ginger.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'Japanese',
    tags: ['sushi', 'japanese', 'seafood', 'healthy'],
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Fun to make!' }, { rating: 4, comment: 'Great instructions.' }]
  },
  {
    title: 'Greek Moussaka',
    description: 'Layered casserole with eggplant, spiced meat, and creamy béchamel. A Greek comfort food masterpiece.',
    ingredients: [
      { name: 'Eggplant', quantity: '2 large, sliced' },
      { name: 'Ground lamb', quantity: '500g' },
      { name: 'Onion', quantity: '1, diced' },
      { name: 'Tomatoes', quantity: '2, chopped' },
      { name: 'Cinnamon', quantity: '1/2 tsp' },
      { name: 'Allspice', quantity: '1/2 tsp' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Flour', quantity: '3 tbsp' },
      { name: 'Milk', quantity: '2 cups' },
      { name: 'Parmesan cheese', quantity: '1/2 cup, grated' }
    ],
    instructions: [
      'Salt eggplant slices, let sit 30 minutes. Rinse and pat dry.',
      'Fry eggplant until golden. Set aside.',
      'Cook lamb with onion until browned.',
      'Add tomatoes and spices, simmer 15 minutes.',
      'Make béchamel: melt butter, add flour, whisk in milk.',
      'Cook until thick, season with salt and nutmeg.',
      'Layer: eggplant, meat, repeat. Top with béchamel and cheese.',
      'Bake at 375°F (190°C) for 45 minutes until golden.'
    ],
    cookingTime: 120,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Greek',
    tags: ['lamb', 'greek', 'baked', 'casserole'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Authentic Greek dish!' }, { rating: 4, comment: 'Worth the effort.' }]
  },
  {
    title: 'Beef Bourguignon',
    description: 'Classic French stew with tender beef braised in red wine with vegetables. Elegant and hearty.',
    ingredients: [
      { name: 'Beef chuck', quantity: '1kg, cubed' },
      { name: 'Red wine', quantity: '750ml' },
      { name: 'Bacon', quantity: '200g, diced' },
      { name: 'Carrots', quantity: '3, chopped' },
      { name: 'Onion', quantity: '1, chopped' },
      { name: 'Mushrooms', quantity: '300g, quartered' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Tomato paste', quantity: '2 tbsp' },
      { name: 'Beef stock', quantity: '2 cups' },
      { name: 'Thyme', quantity: '2 sprigs' }
    ],
    instructions: [
      'Marinate beef in wine overnight.',
      'Preheat oven to 325°F (160°C).',
      'Cook bacon until crispy. Remove.',
      'Brown beef in bacon fat. Remove.',
      'Cook vegetables until soft.',
      'Add tomato paste, cook 1 minute.',
      'Return beef and bacon, add stock and wine.',
      'Cover and braise in oven 3 hours.',
      'Add mushrooms, cook 30 more minutes.',
      'Serve with mashed potatoes.'
    ],
    cookingTime: 240,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'French',
    tags: ['beef', 'french', 'stew', 'wine'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Worth the wait!' }, { rating: 5, comment: 'Perfect for special occasions.' }]
  },
  {
    title: 'Chicken Teriyaki',
    description: 'Sweet and savory Japanese-style chicken glazed with homemade teriyaki sauce. Quick and delicious!',
    ingredients: [
      { name: 'Chicken thighs', quantity: '600g' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Mirin', quantity: '2 tbsp' },
      { name: 'Sake', quantity: '2 tbsp' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Ginger', quantity: '1 inch, grated' },
      { name: 'Garlic', quantity: '2 cloves, minced' },
      { name: 'Cornstarch', quantity: '1 tsp' },
      { name: 'Sesame seeds', quantity: '1 tbsp' },
      { name: 'Green onions', quantity: '2, sliced' }
    ],
    instructions: [
      'Mix soy sauce, mirin, sake, and sugar for sauce.',
      'Marinate chicken in half the sauce for 30 minutes.',
      'Heat pan over medium-high heat.',
      'Cook chicken skin-side down until crispy, about 6 minutes.',
      'Flip and cook until done, about 5 minutes.',
      'Add remaining sauce, simmer until thick.',
      'Garnish with sesame seeds and green onions.',
      'Serve over rice.'
    ],
    cookingTime: 35,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Japanese',
    tags: ['chicken', 'japanese', 'teriyaki', 'quick'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'Perfect glaze!' }, { rating: 5, comment: 'Better than takeout.' }]
  },
  {
    title: 'Ratatouille',
    description: 'Provençal vegetable stew with eggplant, zucchini, bell peppers, and tomatoes. Healthy and colorful!',
    ingredients: [
      { name: 'Eggplant', quantity: '1 large, diced' },
      { name: 'Zucchini', quantity: '2, sliced' },
      { name: 'Bell peppers', quantity: '2, diced' },
      { name: 'Tomato', quantity: '4, chopped' },
      { name: 'Onion', quantity: '1, sliced' },
      { name: 'Garlic', quantity: '4 cloves, minced' },
      { name: 'Olive oil', quantity: '3 tbsp' },
      { name: 'Herbs de Provence', quantity: '1 tbsp' },
      { name: 'Basil', quantity: '1/4 cup, chopped' },
      { name: 'Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Heat olive oil in large pot over medium heat.',
      'Cook onion until soft, about 5 minutes.',
      'Add garlic, cook 1 minute.',
      'Add eggplant, cook 5 minutes.',
      'Add zucchini and peppers, cook 5 minutes.',
      'Add tomatoes and herbs, simmer 20 minutes.',
      'Stir in basil, season with salt.',
      'Serve warm or cold.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'French',
    tags: ['vegetarian', 'french', 'healthy', 'vegetables'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    reviews: [{ rating: 5, comment: 'So fresh and healthy!' }, { rating: 4, comment: 'Great side dish.' }]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipehub');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Recipe.deleteMany({});
    console.log('Cleared existing data');

    // Create users
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

    // Create recipes with authors
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

