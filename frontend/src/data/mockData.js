// Mock data for standalone frontend - no backend needed

export const mockRecipes = [
  {
    _id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A timeless Italian classic with fresh tomatoes, mozzarella, and basil. Simple ingredients that create an unforgettable flavor.',
    ingredients: [
      { name: 'Pizza dough', quantity: '1 ball (300g)' },
      { name: 'Tomato sauce', quantity: '1/2 cup' },
      { name: 'Fresh mozzarella', quantity: '200g' },
      { name: 'Fresh basil leaves', quantity: '10-12 leaves' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Salt', quantity: '1 tsp' }
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
    averageRating: 4.8,
    reviews: [
      { rating: 5, comment: 'Perfect recipe! The crust came out crispy and delicious.', author: { name: 'John Doe' } },
      { rating: 4, comment: 'Great instructions, easy to follow.', author: { name: 'Jane Smith' } }
    ],
    author: { name: 'Chef Mario', _id: 'user1' },
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    _id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy, aromatic Indian curry with tender chicken pieces. A restaurant favorite you can make at home.',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Garam masala', quantity: '2 tbsp' },
      { name: 'Tomato puree', quantity: '400g' },
      { name: 'Heavy cream', quantity: '1/2 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Ginger', quantity: '1 inch piece' }
    ],
    instructions: [
      'Marinate chicken in yogurt and spices for at least 1 hour.',
      'Cook marinated chicken in a pan until golden brown.',
      'In a separate pan, sauté onions, garlic, and ginger until fragrant.',
      'Add tomato puree and spices, cook until oil separates.',
      'Add cooked chicken and cream, simmer for 15 minutes.',
      'Garnish with fresh cilantro and serve with naan or rice.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['curry', 'indian', 'spicy', 'chicken'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [
      { rating: 5, comment: 'Absolutely delicious! Better than restaurant quality.', author: { name: 'Sarah Johnson' } }
    ],
    author: { name: 'Chef Priya', _id: 'user2' },
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    _id: '3',
    title: 'Beef Tacos',
    description: 'Classic Mexican tacos with seasoned ground beef and fresh toppings. Quick and delicious!',
    ingredients: [
      { name: 'Ground beef', quantity: '500g' },
      { name: 'Taco seasoning', quantity: '1 packet' },
      { name: 'Taco shells', quantity: '8-10' },
      { name: 'Lettuce', quantity: '2 cups' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Cheese', quantity: '1 cup shredded' },
      { name: 'Sour cream', quantity: '1/2 cup' }
    ],
    instructions: [
      'Brown ground beef in a large pan over medium-high heat.',
      'Add taco seasoning and follow package directions.',
      'Warm taco shells according to package instructions.',
      'Fill shells with beef and top with lettuce, tomatoes, cheese, and sour cream.',
      'Serve immediately with your favorite hot sauce.'
    ],
    cookingTime: 25,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['mexican', 'spicy', 'quick', 'beef'],
    image: 'https://images.unsplash.com/photo-1565299585323-38174c6f7c7b?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Carlos', _id: 'user3' },
    createdAt: new Date('2024-01-18').toISOString()
  },
  {
    _id: '4',
    title: 'Pad Thai',
    description: 'Authentic Thai stir-fried noodles with tamarind and fish sauce. Sweet, sour, and savory all in one dish.',
    ingredients: [
      { name: 'Rice noodles', quantity: '200g' },
      { name: 'Shrimp', quantity: '200g' },
      { name: 'Bean sprouts', quantity: '1 cup' },
      { name: 'Tamarind paste', quantity: '2 tbsp' },
      { name: 'Fish sauce', quantity: '2 tbsp' },
      { name: 'Palm sugar', quantity: '2 tbsp' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Peanuts', quantity: '1/4 cup' }
    ],
    instructions: [
      'Soak rice noodles in warm water for 30 minutes until soft.',
      'Make sauce by mixing tamarind paste, fish sauce, and palm sugar.',
      'Stir-fry shrimp until cooked, set aside.',
      'Scramble eggs in the same pan, add noodles and sauce.',
      'Add shrimp, bean sprouts, and peanuts.',
      'Serve with lime wedges and extra peanuts.'
    ],
    cookingTime: 30,
    servings: 2,
    difficulty: 'medium',
    cuisine: 'Thai',
    tags: ['thai', 'spicy', 'noodles', 'shrimp'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Nok', _id: 'user4' },
    createdAt: new Date('2024-01-22').toISOString()
  },
  {
    _id: '5',
    title: 'Chocolate Chip Cookies',
    description: 'Soft, chewy cookies loaded with chocolate chips. The perfect comfort dessert.',
    ingredients: [
      { name: 'Butter', quantity: '1 cup' },
      { name: 'Brown sugar', quantity: '3/4 cup' },
      { name: 'White sugar', quantity: '3/4 cup' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Vanilla extract', quantity: '2 tsp' },
      { name: 'Flour', quantity: '2 1/4 cups' },
      { name: 'Baking soda', quantity: '1 tsp' },
      { name: 'Chocolate chips', quantity: '2 cups' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Cream together butter and both sugars until fluffy.',
      'Beat in eggs and vanilla extract.',
      'Mix in flour, baking soda, and salt.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons onto ungreased baking sheets.',
      'Bake for 9-11 minutes until golden brown.',
      'Cool on baking sheet for 2 minutes before transferring.'
    ],
    cookingTime: 30,
    servings: 24,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['dessert', 'american', 'sweet', 'baking'],
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    averageRating: 5.0,
    reviews: [
      { rating: 5, comment: 'Best cookies I\'ve ever made!', author: { name: 'Tom Brown' } }
    ],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-01-10').toISOString()
  },
  {
    _id: '6',
    title: 'Grilled Salmon with Lemon',
    description: 'Perfectly grilled salmon fillets with a zesty lemon butter sauce. Healthy and flavorful.',
    ingredients: [
      { name: 'Salmon fillets', quantity: '4 (6oz each)' },
      { name: 'Lemon', quantity: '2' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Dill', quantity: '2 tbsp fresh' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Salt and pepper', quantity: 'to taste' }
    ],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Season salmon fillets with salt and pepper.',
      'Grill salmon skin-side down for 5-6 minutes.',
      'Flip and grill for another 4-5 minutes.',
      'Melt butter with lemon juice, garlic, and dill.',
      'Drizzle sauce over salmon and serve immediately.'
    ],
    cookingTime: 15,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['healthy', 'american', 'seafood', 'grilled'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-01-25').toISOString()
  },
  {
    _id: '7',
    title: 'French Onion Soup',
    description: 'Rich, caramelized onion soup topped with melted Gruyère cheese. A French bistro classic.',
    ingredients: [
      { name: 'Yellow onions', quantity: '6 large' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Beef broth', quantity: '8 cups' },
      { name: 'Dry white wine', quantity: '1/2 cup' },
      { name: 'Gruyère cheese', quantity: '2 cups shredded' },
      { name: 'French bread', quantity: '8 slices' },
      { name: 'Thyme', quantity: '1 tsp' }
    ],
    instructions: [
      'Slice onions thinly and caramelize in butter over low heat for 45 minutes.',
      'Add wine and deglaze the pan.',
      'Add beef broth and thyme, simmer for 30 minutes.',
      'Ladle soup into oven-safe bowls.',
      'Top with bread slices and cheese.',
      'Broil until cheese is bubbly and golden.'
    ],
    cookingTime: 90,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'French',
    tags: ['french', 'soup', 'comfort-food', 'vegetarian'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop',
    averageRating: 4.5,
    reviews: [],
    author: { name: 'Chef Pierre', _id: 'user6' },
    createdAt: new Date('2024-01-12').toISOString()
  },
  {
    _id: '8',
    title: 'Sushi Rolls',
    description: 'Fresh sushi rolls with your choice of fillings. Master the art of Japanese cuisine.',
    ingredients: [
      { name: 'Sushi rice', quantity: '2 cups' },
      { name: 'Rice vinegar', quantity: '1/4 cup' },
      { name: 'Nori sheets', quantity: '4' },
      { name: 'Raw fish (tuna/salmon)', quantity: '200g' },
      { name: 'Cucumber', quantity: '1' },
      { name: 'Avocado', quantity: '1' },
      { name: 'Wasabi', quantity: 'to taste' },
      { name: 'Soy sauce', quantity: 'for dipping' }
    ],
    instructions: [
      'Cook sushi rice and season with rice vinegar while warm.',
      'Place nori sheet on bamboo mat, shiny side down.',
      'Spread rice evenly, leaving 1 inch border at top.',
      'Add fillings (fish, cucumber, avocado) in a line.',
      'Roll tightly using the bamboo mat.',
      'Slice into 8 pieces and serve with wasabi and soy sauce.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'Japanese',
    tags: ['japanese', 'healthy', 'seafood', 'raw'],
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [],
    author: { name: 'Chef Hiroshi', _id: 'user7' },
    createdAt: new Date('2024-01-28').toISOString()
  },
  {
    _id: '9',
    title: 'Chicken Fajitas',
    description: 'Sizzling strips of marinated chicken with bell peppers and onions. Perfect for family dinners.',
    ingredients: [
      { name: 'Chicken breast', quantity: '600g' },
      { name: 'Bell peppers', quantity: '3 (various colors)' },
      { name: 'Onion', quantity: '1 large' },
      { name: 'Fajita seasoning', quantity: '2 tbsp' },
      { name: 'Lime', quantity: '2' },
      { name: 'Flour tortillas', quantity: '8' },
      { name: 'Sour cream', quantity: '1/2 cup' }
    ],
    instructions: [
      'Slice chicken into strips and marinate with fajita seasoning and lime juice.',
      'Slice bell peppers and onions into strips.',
      'Cook chicken in a hot pan until done, set aside.',
      'Cook peppers and onions until tender-crisp.',
      'Return chicken to pan and toss everything together.',
      'Serve with warm tortillas and your favorite toppings.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['mexican', 'spicy', 'quick', 'chicken'],
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Carlos', _id: 'user3' },
    createdAt: new Date('2024-01-16').toISOString()
  },
  {
    _id: '10',
    title: 'Beef Stroganoff',
    description: 'Tender beef strips in a rich, creamy mushroom sauce. A Russian classic that\'s comfort food perfection.',
    ingredients: [
      { name: 'Beef sirloin', quantity: '500g' },
      { name: 'Mushrooms', quantity: '300g' },
      { name: 'Onion', quantity: '1 medium' },
      { name: 'Sour cream', quantity: '1 cup' },
      { name: 'Beef broth', quantity: '1 cup' },
      { name: 'Flour', quantity: '2 tbsp' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Egg noodles', quantity: '400g' }
    ],
    instructions: [
      'Slice beef into thin strips and season with salt and pepper.',
      'Brown beef in butter, remove from pan.',
      'Cook mushrooms and onions in the same pan.',
      'Add flour and stir, then add beef broth.',
      'Return beef to pan and simmer until tender.',
      'Stir in sour cream just before serving.',
      'Serve over cooked egg noodles.'
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'American',
    tags: ['american', 'comfort-food', 'beef', 'creamy'],
    image: 'https://images.unsplash.com/photo-1609621838510-5ad474b7d25d?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-01-19').toISOString()
  },
  {
    _id: '11',
    title: 'Spaghetti Carbonara',
    description: 'Creamy Italian pasta with eggs, cheese, pancetta, and black pepper. Simple yet sophisticated.',
    ingredients: [
      { name: 'Spaghetti', quantity: '400g' },
      { name: 'Pancetta', quantity: '150g' },
      { name: 'Eggs', quantity: '4 large' },
      { name: 'Parmesan cheese', quantity: '1 cup grated' },
      { name: 'Black pepper', quantity: '1 tsp freshly ground' },
      { name: 'Garlic', quantity: '2 cloves' }
    ],
    instructions: [
      'Cook spaghetti according to package directions.',
      'In a pan, cook pancetta until crispy.',
      'Whisk eggs with parmesan and black pepper.',
      'Drain pasta, reserving some pasta water.',
      'Quickly toss hot pasta with pancetta.',
      'Remove from heat and stir in egg mixture.',
      'Add pasta water if needed to create creamy sauce.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['pasta', 'italian', 'quick', 'creamy'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Mario', _id: 'user1' },
    createdAt: new Date('2024-02-01').toISOString()
  },
  {
    _id: '12',
    title: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken and caramelized onions. A royal Indian dish.',
    ingredients: [
      { name: 'Basmati rice', quantity: '2 cups' },
      { name: 'Chicken', quantity: '1 kg' },
      { name: 'Onions', quantity: '4 large' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Biryani masala', quantity: '3 tbsp' },
      { name: 'Saffron', quantity: '1/2 tsp' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Mint leaves', quantity: '1/2 cup' }
    ],
    instructions: [
      'Marinate chicken in yogurt, spices, and ginger-garlic paste for 2 hours.',
      'Soak rice for 30 minutes, then parboil.',
      'Caramelize onions until golden brown.',
      'Layer rice and chicken in a heavy-bottomed pot.',
      'Add saffron milk and fried onions between layers.',
      'Cover and cook on low heat for 45 minutes.',
      'Garnish with mint and serve hot.'
    ],
    cookingTime: 90,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Indian',
    tags: ['indian', 'rice', 'spicy', 'festive'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [],
    author: { name: 'Chef Priya', _id: 'user2' },
    createdAt: new Date('2024-02-03').toISOString()
  },
  {
    _id: '13',
    title: 'Vegetable Lasagna',
    description: 'Layers of pasta, rich tomato sauce, creamy béchamel, and fresh vegetables. Comfort food at its finest.',
    ingredients: [
      { name: 'Lasagna noodles', quantity: '12 sheets' },
      { name: 'Eggplant', quantity: '2 medium' },
      { name: 'Zucchini', quantity: '2 medium' },
      { name: 'Mushrooms', quantity: '300g' },
      { name: 'Ricotta cheese', quantity: '500g' },
      { name: 'Mozzarella', quantity: '400g' },
      { name: 'Tomato sauce', quantity: '3 cups' },
      { name: 'Parmesan cheese', quantity: '1 cup' }
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Slice vegetables and roast until tender.',
      'Cook lasagna noodles according to package.',
      'Layer noodles, vegetables, ricotta, and sauce.',
      'Repeat layers, ending with mozzarella and parmesan.',
      'Bake covered for 45 minutes, then uncovered for 15 minutes.',
      'Let rest 15 minutes before serving.'
    ],
    cookingTime: 90,
    servings: 8,
    difficulty: 'hard',
    cuisine: 'Italian',
    tags: ['vegetarian', 'italian', 'pasta', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Mario', _id: 'user1' },
    createdAt: new Date('2024-02-05').toISOString()
  },
  {
    _id: '14',
    title: 'Kung Pao Chicken',
    description: 'Spicy Chinese stir-fry with peanuts and vegetables. Bold flavors in every bite.',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g' },
      { name: 'Bell peppers', quantity: '2' },
      { name: 'Peanuts', quantity: '1/2 cup' },
      { name: 'Soy sauce', quantity: '3 tbsp' },
      { name: 'Rice vinegar', quantity: '2 tbsp' },
      { name: 'Hoisin sauce', quantity: '1 tbsp' },
      { name: 'Sichuan peppercorns', quantity: '1 tsp' },
      { name: 'Dried chilies', quantity: '10-15' }
    ],
    instructions: [
      'Cut chicken into cubes and marinate in soy sauce.',
      'Toast peanuts until golden, set aside.',
      'Heat oil and stir-fry chicken until cooked.',
      'Add bell peppers and dried chilies.',
      'Add sauce mixture and stir-fry quickly.',
      'Toss in peanuts and Sichuan peppercorns.',
      'Serve hot over steamed rice.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Chinese',
    tags: ['chinese', 'spicy', 'stir-fry', 'chicken'],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Li', _id: 'user8' },
    createdAt: new Date('2024-02-07').toISOString()
  },
  {
    _id: '15',
    title: 'Guacamole',
    description: 'Fresh avocado dip with lime, cilantro, and spices. Perfect for dipping or topping.',
    ingredients: [
      { name: 'Avocados', quantity: '4 ripe' },
      { name: 'Lime', quantity: '2' },
      { name: 'Tomato', quantity: '1 medium' },
      { name: 'Red onion', quantity: '1/4 cup diced' },
      { name: 'Cilantro', quantity: '1/4 cup' },
      { name: 'Jalapeño', quantity: '1' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Garlic', quantity: '1 clove minced' }
    ],
    instructions: [
      'Cut avocados in half, remove pit, and scoop out flesh.',
      'Mash avocados with a fork to desired consistency.',
      'Dice tomato and jalapeño finely.',
      'Mix in lime juice, salt, and garlic.',
      'Add diced vegetables and cilantro.',
      'Taste and adjust seasoning.',
      'Serve immediately with tortilla chips.'
    ],
    cookingTime: 10,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['mexican', 'appetizer', 'vegetarian', 'quick'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [],
    author: { name: 'Chef Carlos', _id: 'user3' },
    createdAt: new Date('2024-02-09').toISOString()
  },
  {
    _id: '16',
    title: 'Chicken Teriyaki',
    description: 'Sweet and savory Japanese-style chicken glazed with teriyaki sauce. Tender and flavorful.',
    ingredients: [
      { name: 'Chicken thighs', quantity: '6 pieces' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Mirin', quantity: '2 tbsp' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Sake', quantity: '2 tbsp' },
      { name: 'Ginger', quantity: '1 inch grated' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Green onions', quantity: '2 stalks' }
    ],
    instructions: [
      'Mix soy sauce, mirin, sugar, and sake for teriyaki sauce.',
      'Marinate chicken in half the sauce for 30 minutes.',
      'Grill or pan-fry chicken until golden brown.',
      'Add remaining sauce and cook until thick and glossy.',
      'Garnish with green onions and sesame seeds.',
      'Serve over steamed rice with vegetables.'
    ],
    cookingTime: 35,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Japanese',
    tags: ['japanese', 'chicken', 'sweet', 'grilled'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Hiroshi', _id: 'user7' },
    createdAt: new Date('2024-02-11').toISOString()
  },
  {
    _id: '17',
    title: 'Caesar Salad',
    description: 'Classic Caesar salad with homemade dressing and parmesan cheese. Crisp and refreshing.',
    ingredients: [
      { name: 'Romaine lettuce', quantity: '2 heads' },
      { name: 'Parmesan cheese', quantity: '1/2 cup grated' },
      { name: 'Croutons', quantity: '1 cup' },
      { name: 'Anchovies', quantity: '4 fillets' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Lemon juice', quantity: '2 tbsp' },
      { name: 'Olive oil', quantity: '1/4 cup' },
      { name: 'Egg yolk', quantity: '1' }
    ],
    instructions: [
      'Wash and chop romaine lettuce into bite-sized pieces.',
      'Make dressing by mashing anchovies and garlic.',
      'Whisk in lemon juice, egg yolk, and olive oil.',
      'Add parmesan to dressing and mix well.',
      'Toss lettuce with dressing until coated.',
      'Top with croutons and extra parmesan.',
      'Serve immediately.'
    ],
    cookingTime: 15,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['salad', 'american', 'healthy', 'quick'],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    averageRating: 4.5,
    reviews: [],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-02-13').toISOString()
  },
  {
    _id: '18',
    title: 'Beef Bulgogi',
    description: 'Korean marinated beef that\'s sweet, savory, and incredibly tender. A barbecue favorite.',
    ingredients: [
      { name: 'Beef sirloin', quantity: '600g' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Pear', quantity: '1/2 grated' },
      { name: 'Brown sugar', quantity: '2 tbsp' },
      { name: 'Sesame oil', quantity: '1 tbsp' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Green onions', quantity: '3 stalks' }
    ],
    instructions: [
      'Slice beef very thinly against the grain.',
      'Mix marinade with soy sauce, pear, sugar, and spices.',
      'Marinate beef for at least 2 hours or overnight.',
      'Grill or pan-fry marinated beef until caramelized.',
      'Garnish with green onions and sesame seeds.',
      'Serve with steamed rice and kimchi.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Korean',
    tags: ['korean', 'beef', 'marinated', 'grilled'],
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d09a?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Min', _id: 'user9' },
    createdAt: new Date('2024-02-15').toISOString()
  },
  {
    _id: '19',
    title: 'Ramen',
    description: 'Japanese noodle soup with rich broth and various toppings. Comfort in a bowl.',
    ingredients: [
      { name: 'Ramen noodles', quantity: '4 servings' },
      { name: 'Pork belly', quantity: '400g' },
      { name: 'Soft-boiled eggs', quantity: '4' },
      { name: 'Green onions', quantity: '4 stalks' },
      { name: 'Nori sheets', quantity: '4' },
      { name: 'Soy sauce', quantity: '1/4 cup' },
      { name: 'Miso paste', quantity: '2 tbsp' },
      { name: 'Chicken broth', quantity: '6 cups' }
    ],
    instructions: [
      'Cook pork belly until tender, then slice.',
      'Prepare ramen eggs by soft-boiling and marinating.',
      'Heat broth and add miso and soy sauce.',
      'Cook ramen noodles according to package.',
      'Assemble bowls with noodles and hot broth.',
      'Top with pork, egg, green onions, and nori.',
      'Serve immediately while hot.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Japanese',
    tags: ['japanese', 'soup', 'noodles', 'comfort-food'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Hiroshi', _id: 'user7' },
    createdAt: new Date('2024-02-17').toISOString()
  },
  {
    _id: '20',
    title: 'Greek Moussaka',
    description: 'Layered casserole with eggplant, spiced meat, and creamy béchamel. A Greek classic.',
    ingredients: [
      { name: 'Eggplant', quantity: '2 large' },
      { name: 'Ground lamb', quantity: '500g' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '400g canned' },
      { name: 'Flour', quantity: '4 tbsp' },
      { name: 'Milk', quantity: '2 cups' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Parmesan cheese', quantity: '1/2 cup' }
    ],
    instructions: [
      'Slice eggplant and fry until golden, set aside.',
      'Cook lamb with onions until browned.',
      'Add tomatoes and spices, simmer until thick.',
      'Make béchamel sauce with butter, flour, and milk.',
      'Layer eggplant, meat sauce, and béchamel.',
      'Top with parmesan and bake at 375°F for 45 minutes.',
      'Let cool 15 minutes before serving.'
    ],
    cookingTime: 120,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'Greek',
    tags: ['greek', 'casserole', 'lamb', 'baked'],
    image: 'https://images.unsplash.com/photo-1606926633983-005b8e39e4e2?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Sophia', _id: 'user10' },
    createdAt: new Date('2024-02-19').toISOString()
  },
  {
    _id: '21',
    title: 'Green Curry',
    description: 'Spicy Thai curry with coconut milk, green chilies, and vegetables. Aromatic and flavorful.',
    ingredients: [
      { name: 'Green curry paste', quantity: '3 tbsp' },
      { name: 'Coconut milk', quantity: '2 cans' },
      { name: 'Chicken', quantity: '500g' },
      { name: 'Thai eggplants', quantity: '4' },
      { name: 'Basil leaves', quantity: '1 cup' },
      { name: 'Fish sauce', quantity: '2 tbsp' },
      { name: 'Palm sugar', quantity: '1 tbsp' },
      { name: 'Kaffir lime leaves', quantity: '6' }
    ],
    instructions: [
      'Heat coconut milk and fry curry paste until fragrant.',
      'Add chicken and cook until opaque.',
      'Add remaining coconut milk and bring to boil.',
      'Add eggplants and simmer until tender.',
      'Season with fish sauce and palm sugar.',
      'Stir in basil and kaffir lime leaves.',
      'Serve hot with jasmine rice.'
    ],
    cookingTime: 35,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Thai',
    tags: ['thai', 'curry', 'spicy', 'coconut'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Nok', _id: 'user4' },
    createdAt: new Date('2024-02-21').toISOString()
  },
  {
    _id: '22',
    title: 'Mac and Cheese',
    description: 'Creamy pasta dish with melted cheese. The ultimate comfort food favorite.',
    ingredients: [
      { name: 'Macaroni', quantity: '400g' },
      { name: 'Cheddar cheese', quantity: '300g grated' },
      { name: 'Milk', quantity: '2 cups' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Flour', quantity: '4 tbsp' },
      { name: 'Breadcrumbs', quantity: '1/2 cup' },
      { name: 'Mustard powder', quantity: '1 tsp' },
      { name: 'Paprika', quantity: '1 tsp' }
    ],
    instructions: [
      'Cook macaroni according to package, drain.',
      'Make roux with butter and flour.',
      'Whisk in milk gradually until smooth.',
      'Add cheese and stir until melted.',
      'Mix in mustard and paprika.',
      'Combine pasta with cheese sauce.',
      'Top with breadcrumbs and bake at 350°F for 25 minutes.'
    ],
    cookingTime: 30,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['american', 'comfort-food', 'cheese', 'pasta'],
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-02-23').toISOString()
  },
  {
    _id: '23',
    title: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella. Italian-American favorite.',
    ingredients: [
      { name: 'Chicken breast', quantity: '4 pieces' },
      { name: 'Breadcrumbs', quantity: '1 cup' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Flour', quantity: '1/2 cup' },
      { name: 'Marinara sauce', quantity: '2 cups' },
      { name: 'Mozzarella cheese', quantity: '200g' },
      { name: 'Parmesan cheese', quantity: '1/2 cup' },
      { name: 'Spaghetti', quantity: '400g' }
    ],
    instructions: [
      'Pound chicken breasts to even thickness.',
      'Dredge in flour, egg, then breadcrumbs.',
      'Fry chicken until golden and cooked through.',
      'Top with marinara sauce and cheeses.',
      'Bake at 400°F until cheese is bubbly.',
      'Cook spaghetti according to package.',
      'Serve chicken over spaghetti with extra sauce.'
    ],
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['italian', 'chicken', 'fried', 'cheese'],
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Mario', _id: 'user1' },
    createdAt: new Date('2024-02-25').toISOString()
  },
  {
    _id: '24',
    title: 'Palak Paneer',
    description: 'Creamy spinach curry with Indian cheese cubes. Nutritious and delicious.',
    ingredients: [
      { name: 'Spinach', quantity: '500g' },
      { name: 'Paneer', quantity: '300g' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '2 medium' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Cream', quantity: '1/4 cup' },
      { name: 'Garam masala', quantity: '1 tbsp' }
    ],
    instructions: [
      'Blanch spinach and blend into smooth puree.',
      'Cube paneer and lightly fry until golden.',
      'Sauté onions, ginger, and garlic until soft.',
      'Add tomatoes and cook until mushy.',
      'Add spinach puree and simmer.',
      'Stir in cream and garam masala.',
      'Add paneer cubes and serve hot with naan.'
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Indian',
    tags: ['indian', 'vegetarian', 'spinach', 'paneer'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Priya', _id: 'user2' },
    createdAt: new Date('2024-02-27').toISOString()
  },
  {
    _id: '25',
    title: 'Ratatouille',
    description: 'Provençal vegetable stew with eggplant, zucchini, and bell peppers. Colorful and healthy.',
    ingredients: [
      { name: 'Eggplant', quantity: '1 medium' },
      { name: 'Zucchini', quantity: '2 medium' },
      { name: 'Bell peppers', quantity: '2' },
      { name: 'Tomatoes', quantity: '4 large' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Olive oil', quantity: '1/4 cup' },
      { name: 'Herbs de Provence', quantity: '1 tbsp' }
    ],
    instructions: [
      'Slice all vegetables into uniform pieces.',
      'Sauté onions and garlic until fragrant.',
      'Add bell peppers and cook until soft.',
      'Add tomatoes and let break down.',
      'Add eggplant and zucchini, season with herbs.',
      'Simmer covered for 30 minutes until tender.',
      'Serve warm or at room temperature.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'French',
    tags: ['french', 'vegetarian', 'healthy', 'stew'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    averageRating: 4.5,
    reviews: [],
    author: { name: 'Chef Pierre', _id: 'user6' },
    createdAt: new Date('2024-03-01').toISOString()
  },
  {
    _id: '26',
    title: 'BBQ Pulled Pork',
    description: 'Slow-cooked pork shoulder smothered in tangy BBQ sauce. Tender and fall-apart delicious.',
    ingredients: [
      { name: 'Pork shoulder', quantity: '2 kg' },
      { name: 'BBQ sauce', quantity: '2 cups' },
      { name: 'Brown sugar', quantity: '2 tbsp' },
      { name: 'Paprika', quantity: '2 tbsp' },
      { name: 'Garlic powder', quantity: '1 tbsp' },
      { name: 'Onion powder', quantity: '1 tbsp' },
      { name: 'Apple cider vinegar', quantity: '1/4 cup' },
      { name: 'Hamburger buns', quantity: '8' }
    ],
    instructions: [
      'Mix dry spices and rub all over pork.',
      'Place pork in slow cooker or Dutch oven.',
      'Cook on low for 8 hours until tender.',
      'Shred pork with two forks.',
      'Mix in BBQ sauce and vinegar.',
      'Cook for additional 30 minutes.',
      'Serve on buns with coleslaw.'
    ],
    cookingTime: 480,
    servings: 8,
    difficulty: 'easy',
    cuisine: 'American',
    tags: ['american', 'bbq', 'pork', 'slow-cooked'],
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-03-03').toISOString()
  },
  {
    _id: '27',
    title: 'Tiramisu',
    description: 'Italian dessert with coffee-soaked ladyfingers and mascarpone. Elegant and indulgent.',
    ingredients: [
      { name: 'Ladyfingers', quantity: '24' },
      { name: 'Mascarpone cheese', quantity: '500g' },
      { name: 'Eggs', quantity: '4 large' },
      { name: 'Sugar', quantity: '1/2 cup' },
      { name: 'Espresso', quantity: '2 cups' },
      { name: 'Cocoa powder', quantity: '2 tbsp' },
      { name: 'Dark rum', quantity: '2 tbsp' },
      { name: 'Vanilla extract', quantity: '1 tsp' }
    ],
    instructions: [
      'Brew strong espresso and let cool.',
      'Separate eggs and beat yolks with sugar.',
      'Fold in mascarpone until smooth.',
      'Whip egg whites and fold into mascarpone mix.',
      'Dip ladyfingers in coffee and layer in dish.',
      'Spread mascarpone mixture over each layer.',
      'Refrigerate 4 hours, dust with cocoa before serving.'
    ],
    cookingTime: 120,
    servings: 8,
    difficulty: 'medium',
    cuisine: 'Italian',
    tags: ['italian', 'dessert', 'coffee', 'no-bake'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [],
    author: { name: 'Chef Mario', _id: 'user1' },
    createdAt: new Date('2024-03-05').toISOString()
  },
  {
    _id: '28',
    title: 'Falafel',
    description: 'Deep-fried chickpea balls, typically served in pita. Crispy outside, fluffy inside.',
    ingredients: [
      { name: 'Chickpeas', quantity: '2 cups dried' },
      { name: 'Onions', quantity: '1 large' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Cilantro', quantity: '1/2 cup' },
      { name: 'Parsley', quantity: '1/2 cup' },
      { name: 'Cumin', quantity: '1 tbsp' },
      { name: 'Coriander', quantity: '1 tbsp' },
      { name: 'Baking soda', quantity: '1 tsp' }
    ],
    instructions: [
      'Soak chickpeas overnight, do not cook.',
      'Drain and process in food processor.',
      'Add onions, garlic, and herbs, pulse.',
      'Mix in spices and baking soda.',
      'Form into small balls or patties.',
      'Fry in hot oil until golden brown.',
      'Serve in pita with tahini sauce and vegetables.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'medium',
    cuisine: 'Middle Eastern',
    tags: ['middle-eastern', 'vegetarian', 'fried', 'chickpeas'],
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Samira', _id: 'user11' },
    createdAt: new Date('2024-03-07').toISOString()
  },
  {
    _id: '29',
    title: 'Beef Wellington',
    description: 'Tender beef fillet wrapped in puff pastry with mushroom duxelles. A show-stopping dish.',
    ingredients: [
      { name: 'Beef fillet', quantity: '1 kg' },
      { name: 'Puff pastry', quantity: '500g' },
      { name: 'Mushrooms', quantity: '400g' },
      { name: 'Parma ham', quantity: '8 slices' },
      { name: 'Dijon mustard', quantity: '2 tbsp' },
      { name: 'Egg', quantity: '1 for egg wash' },
      { name: 'Thyme', quantity: '2 tbsp' },
      { name: 'Shallots', quantity: '2' }
    ],
    instructions: [
      'Sear beef fillet on all sides until browned.',
      'Brush with mustard and let cool.',
      'Make mushroom duxelles by finely chopping and cooking.',
      'Wrap beef in Parma ham, then mushroom duxelles.',
      'Wrap everything in puff pastry.',
      'Brush with egg wash and bake at 400°F for 35 minutes.',
      'Rest 15 minutes before slicing.'
    ],
    cookingTime: 90,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'British',
    tags: ['british', 'beef', 'elegant', 'baked'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef James', _id: 'user12' },
    createdAt: new Date('2024-03-09').toISOString()
  },
  {
    _id: '30',
    title: 'Pad See Ew',
    description: 'Thai stir-fried wide rice noodles with soy sauce and Chinese broccoli. Simple and satisfying.',
    ingredients: [
      { name: 'Wide rice noodles', quantity: '400g' },
      { name: 'Chinese broccoli', quantity: '200g' },
      { name: 'Chicken', quantity: '300g' },
      { name: 'Dark soy sauce', quantity: '3 tbsp' },
      { name: 'Light soy sauce', quantity: '2 tbsp' },
      { name: 'Oyster sauce', quantity: '1 tbsp' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Eggs', quantity: '2' }
    ],
    instructions: [
      'Soak noodles until pliable, drain well.',
      'Cut broccoli into bite-sized pieces.',
      'Stir-fry chicken until cooked, set aside.',
      'Scramble eggs in the same pan.',
      'Add noodles and sauces, stir-fry quickly.',
      'Add broccoli and chicken, toss everything.',
      'Serve hot with lime wedges.'
    ],
    cookingTime: 25,
    servings: 3,
    difficulty: 'medium',
    cuisine: 'Thai',
    tags: ['thai', 'noodles', 'stir-fry', 'quick'],
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop&ixlib=rb-4.0.3&q=80',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Nok', _id: 'user4' },
    createdAt: new Date('2024-03-11').toISOString()
  },
  {
    _id: '31',
    title: 'Shakshuka',
    description: 'Poached eggs in a spicy tomato and pepper sauce. Perfect for breakfast or brunch.',
    ingredients: [
      { name: 'Tomatoes', quantity: '800g canned' },
      { name: 'Bell peppers', quantity: '2' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Eggs', quantity: '6' },
      { name: 'Cumin', quantity: '1 tbsp' },
      { name: 'Paprika', quantity: '1 tbsp' },
      { name: 'Chili flakes', quantity: '1 tsp' },
      { name: 'Feta cheese', quantity: '100g' }
    ],
    instructions: [
      'Sauté onions and bell peppers until soft.',
      'Add spices and cook until fragrant.',
      'Add tomatoes and simmer until thickened.',
      'Make wells in the sauce and crack eggs into them.',
      'Cover and cook until eggs are set.',
      'Crumble feta over the top.',
      'Serve hot with crusty bread.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Middle Eastern',
    tags: ['middle-eastern', 'breakfast', 'eggs', 'spicy'],
    image: 'https://images.unsplash.com/photo-1510693206972-dce098e9f3ab?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Samira', _id: 'user11' },
    createdAt: new Date('2024-03-13').toISOString()
  },
  {
    _id: '32',
    title: 'Chicken Curry',
    description: 'Aromatic Indian curry with tender chicken in a spiced tomato-based sauce. Hearty and flavorful.',
    ingredients: [
      { name: 'Chicken', quantity: '1 kg' },
      { name: 'Onions', quantity: '3 large' },
      { name: 'Tomatoes', quantity: '4 medium' },
      { name: 'Ginger-garlic paste', quantity: '2 tbsp' },
      { name: 'Turmeric', quantity: '1 tsp' },
      { name: 'Coriander powder', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tbsp' },
      { name: 'Yogurt', quantity: '1/2 cup' }
    ],
    instructions: [
      'Marinate chicken in yogurt and spices for 1 hour.',
      'Sauté onions until golden brown.',
      'Add ginger-garlic paste and cook until fragrant.',
      'Add tomatoes and cook until soft.',
      'Add spices and cook until oil separates.',
      'Add chicken and cook until tender.',
      'Garnish with cilantro and serve with rice.'
    ],
    cookingTime: 60,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Indian',
    tags: ['indian', 'curry', 'chicken', 'spicy'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Priya', _id: 'user2' },
    createdAt: new Date('2024-03-15').toISOString()
  },
  {
    _id: '33',
    title: 'Chicken Enchiladas',
    description: 'Rolled tortillas filled with chicken and covered in sauce. Cheesy and satisfying.',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g' },
      { name: 'Tortillas', quantity: '8' },
      { name: 'Enchilada sauce', quantity: '2 cups' },
      { name: 'Monterey Jack cheese', quantity: '300g' },
      { name: 'Onions', quantity: '1 large' },
      { name: 'Green chilies', quantity: '1 can' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Cilantro', quantity: '1/4 cup' }
    ],
    instructions: [
      'Cook and shred chicken, mix with onions and chilies.',
      'Warm tortillas to make pliable.',
      'Fill each tortilla with chicken mixture and cheese.',
      'Roll tightly and place seam-side down in baking dish.',
      'Cover with enchilada sauce and remaining cheese.',
      'Bake at 375°F for 25 minutes until bubbly.',
      'Garnish with sour cream and cilantro.'
    ],
    cookingTime: 45,
    servings: 6,
    difficulty: 'medium',
    cuisine: 'Mexican',
    tags: ['mexican', 'chicken', 'cheese', 'baked'],
    image: 'https://images.unsplash.com/photo-1615367423057-4d27f2ff78b4?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Carlos', _id: 'user3' },
    createdAt: new Date('2024-03-17').toISOString()
  },
  {
    _id: '34',
    title: 'Beef Bourguignon',
    description: 'Classic French stew with tender beef braised in red wine. Rich and hearty.',
    ingredients: [
      { name: 'Beef chuck', quantity: '1.5 kg' },
      { name: 'Red wine', quantity: '750ml' },
      { name: 'Bacon', quantity: '200g' },
      { name: 'Pearl onions', quantity: '20' },
      { name: 'Mushrooms', quantity: '400g' },
      { name: 'Carrots', quantity: '4 large' },
      { name: 'Beef stock', quantity: '2 cups' },
      { name: 'Tomato paste', quantity: '2 tbsp' }
    ],
    instructions: [
      'Cut beef into large chunks and season.',
      'Cook bacon until crisp, set aside.',
      'Sear beef in bacon fat until browned.',
      'Deglaze with red wine and add stock.',
      'Add vegetables, herbs, and tomato paste.',
      'Simmer covered for 3 hours until tender.',
      'Serve hot with crusty bread or potatoes.'
    ],
    cookingTime: 240,
    servings: 6,
    difficulty: 'hard',
    cuisine: 'French',
    tags: ['french', 'beef', 'wine', 'slow-cooked'],
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Pierre', _id: 'user6' },
    createdAt: new Date('2024-03-19').toISOString()
  },
  {
    _id: '35',
    title: 'Chana Masala',
    description: 'Spiced chickpea curry with tomatoes and aromatic spices. Protein-rich and satisfying.',
    ingredients: [
      { name: 'Chickpeas', quantity: '3 cups cooked' },
      { name: 'Tomatoes', quantity: '4 medium' },
      { name: 'Onions', quantity: '2 large' },
      { name: 'Ginger', quantity: '1 inch' },
      { name: 'Garlic', quantity: '4 cloves' },
      { name: 'Cumin seeds', quantity: '1 tsp' },
      { name: 'Coriander powder', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tbsp' }
    ],
    instructions: [
      'Sauté cumin seeds until fragrant.',
      'Add onions and cook until golden.',
      'Add ginger, garlic, and tomatoes.',
      'Cook until tomatoes break down.',
      'Add spices and cook until oil separates.',
      'Add chickpeas and simmer 20 minutes.',
      'Garnish with cilantro and serve with rice.'
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Indian',
    tags: ['indian', 'vegetarian', 'chickpeas', 'spicy'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Priya', _id: 'user2' },
    createdAt: new Date('2024-03-21').toISOString()
  },
  {
    _id: '36',
    title: 'Fish Tacos',
    description: 'Crispy fish in warm tortillas with fresh toppings. Light and refreshing.',
    ingredients: [
      { name: 'White fish fillets', quantity: '600g' },
      { name: 'Corn tortillas', quantity: '8' },
      { name: 'Cabbage', quantity: '2 cups shredded' },
      { name: 'Lime', quantity: '3' },
      { name: 'Cilantro', quantity: '1/2 cup' },
      { name: 'Avocado', quantity: '2' },
      { name: 'Sour cream', quantity: '1/2 cup' },
      { name: 'Flour', quantity: '1/2 cup' }
    ],
    instructions: [
      'Cut fish into strips and season.',
      'Dredge in flour and pan-fry until crispy.',
      'Warm tortillas in a dry pan.',
      'Make slaw with cabbage, lime, and cilantro.',
      'Mash avocado with lime juice and salt.',
      'Fill tortillas with fish and toppings.',
      'Serve immediately with lime wedges.'
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mexican',
    tags: ['mexican', 'seafood', 'healthy', 'quick'],
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&h=600&fit=crop',
    averageRating: 4.7,
    reviews: [],
    author: { name: 'Chef Carlos', _id: 'user3' },
    createdAt: new Date('2024-03-23').toISOString()
  },
  {
    _id: '37',
    title: 'Apple Pie',
    description: 'Classic American pie with spiced apples in a flaky crust. Warm and comforting.',
    ingredients: [
      { name: 'Pie crust', quantity: '2 sheets' },
      { name: 'Apples', quantity: '6-8 large' },
      { name: 'Sugar', quantity: '3/4 cup' },
      { name: 'Cinnamon', quantity: '1 tbsp' },
      { name: 'Nutmeg', quantity: '1/2 tsp' },
      { name: 'Butter', quantity: '2 tbsp' },
      { name: 'Lemon juice', quantity: '1 tbsp' },
      { name: 'Egg', quantity: '1 for egg wash' }
    ],
    instructions: [
      'Peel and slice apples into thin wedges.',
      'Mix apples with sugar, spices, and lemon juice.',
      'Line pie dish with bottom crust.',
      'Fill with apple mixture and dot with butter.',
      'Cover with top crust and seal edges.',
      'Brush with egg wash and cut vents.',
      'Bake at 425°F for 45 minutes until golden.'
    ],
    cookingTime: 75,
    servings: 8,
    difficulty: 'medium',
    cuisine: 'American',
    tags: ['american', 'dessert', 'baking', 'fruit'],
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Emma', _id: 'user5' },
    createdAt: new Date('2024-03-25').toISOString()
  },
  {
    _id: '38',
    title: 'Beef Stir Fry',
    description: 'Quick and flavorful Asian-inspired stir fry with tender beef. Ready in minutes.',
    ingredients: [
      { name: 'Beef sirloin', quantity: '500g' },
      { name: 'Bell peppers', quantity: '2' },
      { name: 'Broccoli', quantity: '200g' },
      { name: 'Soy sauce', quantity: '3 tbsp' },
      { name: 'Oyster sauce', quantity: '2 tbsp' },
      { name: 'Cornstarch', quantity: '1 tbsp' },
      { name: 'Garlic', quantity: '3 cloves' },
      { name: 'Ginger', quantity: '1 inch' }
    ],
    instructions: [
      'Slice beef thinly against the grain.',
      'Marinate in soy sauce and cornstarch.',
      'Heat wok or pan until very hot.',
      'Stir-fry beef quickly, remove when done.',
      'Stir-fry vegetables until crisp-tender.',
      'Return beef, add sauces, toss everything.',
      'Serve immediately over steamed rice.'
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Chinese',
    tags: ['chinese', 'beef', 'stir-fry', 'quick'],
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&h=600&fit=crop',
    averageRating: 4.6,
    reviews: [],
    author: { name: 'Chef Li', _id: 'user8' },
    createdAt: new Date('2024-03-27').toISOString()
  },
  {
    _id: '39',
    title: 'Crème Brûlée',
    description: 'Rich custard dessert with a caramelized sugar top. Elegant and creamy.',
    ingredients: [
      { name: 'Heavy cream', quantity: '2 cups' },
      { name: 'Egg yolks', quantity: '6' },
      { name: 'Sugar', quantity: '1/2 cup + 1/4 cup' },
      { name: 'Vanilla extract', quantity: '1 tbsp' },
      { name: 'Salt', quantity: 'pinch' }
    ],
    instructions: [
      'Heat cream with vanilla until steaming.',
      'Whisk egg yolks with 1/2 cup sugar.',
      'Temper yolks with hot cream.',
      'Strain mixture and pour into ramekins.',
      'Bake in water bath at 325°F for 40 minutes.',
      'Chill completely, at least 4 hours.',
      'Sprinkle with sugar and caramelize with torch.'
    ],
    cookingTime: 90,
    servings: 6,
    difficulty: 'medium',
    cuisine: 'French',
    tags: ['french', 'dessert', 'creamy', 'elegant'],
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop',
    averageRating: 4.9,
    reviews: [],
    author: { name: 'Chef Pierre', _id: 'user6' },
    createdAt: new Date('2024-03-29').toISOString()
  },
  {
    _id: '40',
    title: 'Hummus',
    description: 'Creamy chickpea dip with tahini and lemon. Smooth and flavorful.',
    ingredients: [
      { name: 'Chickpeas', quantity: '2 cups cooked' },
      { name: 'Tahini', quantity: '1/3 cup' },
      { name: 'Lemon juice', quantity: '1/4 cup' },
      { name: 'Garlic', quantity: '3 cloves' },
      { name: 'Olive oil', quantity: '1/4 cup' },
      { name: 'Cumin', quantity: '1 tsp' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Paprika', quantity: 'for garnish' }
    ],
    instructions: [
      'Drain and rinse chickpeas, reserve liquid.',
      'Process chickpeas in food processor until smooth.',
      'Add tahini, lemon juice, and garlic.',
      'Process while slowly adding olive oil.',
      'Add reserved liquid if too thick.',
      'Season with cumin and salt.',
      'Serve drizzled with olive oil and paprika.'
    ],
    cookingTime: 10,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'Middle Eastern',
    tags: ['middle-eastern', 'vegetarian', 'dip', 'quick'],
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=600&fit=crop',
    averageRating: 4.8,
    reviews: [],
    author: { name: 'Chef Samira', _id: 'user11' },
    createdAt: new Date('2024-03-31').toISOString()
  }
];

// Helper function to get recipe by ID
export const getRecipeById = (id) => {
  return mockRecipes.find(recipe => recipe._id === id);
};

// Helper function to filter recipes
export const filterRecipes = (filters) => {
  let filtered = [...mockRecipes];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(recipe => 
      recipe.title.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchLower))
    );
  }
  
  if (filters.cuisine) {
    filtered = filtered.filter(recipe => recipe.cuisine === filters.cuisine);
  }
  
  if (filters.difficulty) {
    filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
  }
  
  if (filters.sortBy === 'rating') {
    filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  } else if (filters.sortBy === 'time') {
    filtered.sort((a, b) => a.cookingTime - b.cookingTime);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  return filtered;
};

// Get all unique cuisines
export const getCuisines = () => {
  return [...new Set(mockRecipes.map(recipe => recipe.cuisine))];
};