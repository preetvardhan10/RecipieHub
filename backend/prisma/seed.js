const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.review.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'chefmaria',
      email: 'maria@example.com',
      password: hashedPassword,
      role: 'USER',
      bio: 'Passionate home chef sharing family recipes from Italy',
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'cookingpro',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'USER',
      bio: 'Professional chef with 10+ years of experience',
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'veggielover',
      email: 'sarah@example.com',
      password: hashedPassword,
      role: 'USER',
      bio: 'Vegetarian food enthusiast and recipe creator',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  });

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@recipehub.com',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'RecipeHub Administrator'
    }
  });

  // Create recipes
  console.log('🍳 Creating recipes...');

  const recipe1 = await prisma.recipe.create({
    data: {
      title: 'Classic Spaghetti Carbonara',
      description: 'A traditional Italian pasta dish made with eggs, cheese, bacon, and black pepper. This creamy, rich pasta is a favorite in Roman cuisine.',
      ingredients: [
        { name: 'spaghetti', quantity: '400', unit: 'g' },
        { name: 'eggs', quantity: '4', unit: '' },
        { name: 'pancetta', quantity: '200', unit: 'g' },
        { name: 'parmesan cheese', quantity: '100', unit: 'g' },
        { name: 'black pepper', quantity: '1', unit: 'tsp' },
        { name: 'salt', quantity: 'to taste', unit: '' }
      ],
      instructions: [
        { step: 1, instruction: 'Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente.' },
        { step: 2, instruction: 'While pasta cooks, cut pancetta into small cubes and fry in a large pan until crispy.' },
        { step: 3, instruction: 'In a bowl, whisk together eggs, grated parmesan, and black pepper.' },
        { step: 4, instruction: 'Drain pasta, reserving some pasta water. Add hot pasta to the pan with pancetta, remove from heat, and quickly mix in egg mixture. Add pasta water if needed for creaminess. Serve immediately.' }
      ],
      cuisine: 'Italian',
      difficulty: 'Medium',
      cookingTime: 25,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
      tags: ['pasta', 'italian', 'quick', 'dinner'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 4 }
      ],
      averageRating: 4.67,
      reviewCount: 3,
      authorId: user1.id
    }
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      title: 'Chicken Tikka Masala',
      description: 'A popular Indian curry dish with tender chicken pieces in a creamy, spiced tomato sauce. Perfect served with basmati rice or naan bread.',
      ingredients: [
        { name: 'chicken breast', quantity: '500', unit: 'g' },
        { name: 'yogurt', quantity: '200', unit: 'ml' },
        { name: 'tomatoes', quantity: '400', unit: 'g' },
        { name: 'onion', quantity: '1', unit: 'large' },
        { name: 'garlic', quantity: '4', unit: 'cloves' },
        { name: 'ginger', quantity: '2', unit: 'cm' },
        { name: 'heavy cream', quantity: '200', unit: 'ml' },
        { name: 'garam masala', quantity: '2', unit: 'tsp' },
        { name: 'cumin', quantity: '1', unit: 'tsp' },
        { name: 'turmeric', quantity: '1', unit: 'tsp' }
      ],
      instructions: [
        { step: 1, instruction: 'Cut chicken into bite-sized pieces and marinate in yogurt with half the spices for at least 2 hours.' },
        { step: 2, instruction: 'Heat oil in a large pan and cook marinated chicken until golden. Remove and set aside.' },
        { step: 3, instruction: 'In the same pan, sauté onions, garlic, and ginger until fragrant. Add remaining spices and cook for 1 minute.' },
        { step: 4, instruction: 'Add tomatoes and cook until they break down. Blend to a smooth sauce, return to pan, add cream and chicken. Simmer for 15 minutes. Serve hot.' }
      ],
      cuisine: 'Indian',
      difficulty: 'Hard',
      cookingTime: 60,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800',
      tags: ['indian', 'curry', 'chicken', 'spicy'],
      ratings: [
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 5.0,
      reviewCount: 2,
      authorId: user2.id
    }
  });

  const recipe3 = await prisma.recipe.create({
    data: {
      title: 'Vegetarian Buddha Bowl',
      description: 'A healthy, colorful bowl packed with roasted vegetables, quinoa, chickpeas, and a tahini dressing. Perfect for a nutritious lunch or dinner.',
      ingredients: [
        { name: 'quinoa', quantity: '200', unit: 'g' },
        { name: 'sweet potato', quantity: '2', unit: 'medium' },
        { name: 'chickpeas', quantity: '400', unit: 'g' },
        { name: 'broccoli', quantity: '200', unit: 'g' },
        { name: 'red bell pepper', quantity: '1', unit: '' },
        { name: 'avocado', quantity: '1', unit: '' },
        { name: 'tahini', quantity: '3', unit: 'tbsp' },
        { name: 'lemon juice', quantity: '2', unit: 'tbsp' },
        { name: 'olive oil', quantity: '2', unit: 'tbsp' }
      ],
      instructions: [
        { step: 1, instruction: 'Cook quinoa according to package directions and let cool.' },
        { step: 2, instruction: 'Preheat oven to 200°C. Cut sweet potato into cubes and roast with chickpeas for 25 minutes.' },
        { step: 3, instruction: 'Steam broccoli and slice bell pepper. Arrange all vegetables over quinoa in a bowl.' },
        { step: 4, instruction: 'Mix tahini, lemon juice, olive oil, and water to make dressing. Drizzle over bowl and top with sliced avocado.' }
      ],
      cuisine: 'Mediterranean',
      difficulty: 'Easy',
      cookingTime: 35,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      tags: ['vegetarian', 'healthy', 'bowl', 'quinoa'],
      ratings: [
        { user: user1.id, rating: 4 },
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 4.67,
      reviewCount: 3,
      authorId: user3.id
    }
  });

  const recipe4 = await prisma.recipe.create({
    data: {
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade chocolate chip cookies that are crispy on the edges and chewy in the middle. The perfect comfort dessert!',
      ingredients: [
        { name: 'all-purpose flour', quantity: '250', unit: 'g' },
        { name: 'butter', quantity: '115', unit: 'g' },
        { name: 'brown sugar', quantity: '100', unit: 'g' },
        { name: 'white sugar', quantity: '50', unit: 'g' },
        { name: 'eggs', quantity: '1', unit: '' },
        { name: 'vanilla extract', quantity: '1', unit: 'tsp' },
        { name: 'baking soda', quantity: '1', unit: 'tsp' },
        { name: 'chocolate chips', quantity: '200', unit: 'g' },
        { name: 'salt', quantity: '0.5', unit: 'tsp' }
      ],
      instructions: [
        { step: 1, instruction: 'Preheat oven to 180°C. Cream together butter and both sugars until light and fluffy.' },
        { step: 2, instruction: 'Beat in egg and vanilla extract. Mix in flour, baking soda, and salt until just combined.' },
        { step: 3, instruction: 'Fold in chocolate chips. Drop rounded tablespoons of dough onto baking sheet.' },
        { step: 4, instruction: 'Bake for 10-12 minutes until edges are golden. Let cool on baking sheet for 5 minutes before transferring.' }
      ],
      cuisine: 'American',
      difficulty: 'Easy',
      cookingTime: 25,
      servings: 24,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
      tags: ['dessert', 'cookies', 'baking', 'sweet'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 5.0,
      reviewCount: 2,
      authorId: user1.id
    }
  });

  const recipe5 = await prisma.recipe.create({
    data: {
      title: 'Beef Stir Fry',
      description: 'Quick and flavorful beef stir fry with vegetables in a savory sauce. Ready in under 20 minutes!',
      ingredients: [
        { name: 'beef sirloin', quantity: '400', unit: 'g' },
        { name: 'bell peppers', quantity: '2', unit: '' },
        { name: 'broccoli', quantity: '200', unit: 'g' },
        { name: 'carrots', quantity: '2', unit: '' },
        { name: 'soy sauce', quantity: '3', unit: 'tbsp' },
        { name: 'ginger', quantity: '2', unit: 'cm' },
        { name: 'garlic', quantity: '3', unit: 'cloves' },
        { name: 'cornstarch', quantity: '1', unit: 'tbsp' },
        { name: 'sesame oil', quantity: '1', unit: 'tbsp' }
      ],
      instructions: [
        { step: 1, instruction: 'Slice beef into thin strips and marinate in soy sauce and cornstarch for 15 minutes.' },
        { step: 2, instruction: 'Heat oil in a wok or large pan over high heat. Stir-fry beef until browned, then remove.' },
        { step: 3, instruction: 'Add vegetables and stir-fry for 3-4 minutes until crisp-tender.' },
        { step: 4, instruction: 'Return beef to pan, add remaining sauce ingredients, and toss everything together. Serve immediately over rice.' }
      ],
      cuisine: 'Asian',
      difficulty: 'Medium',
      cookingTime: 20,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
      tags: ['beef', 'stir-fry', 'quick', 'asian'],
      ratings: [
        { user: user2.id, rating: 4 },
        { user: user3.id, rating: 4 }
      ],
      averageRating: 4.0,
      reviewCount: 2,
      authorId: user2.id
    }
  });

  const recipe6 = await prisma.recipe.create({
    data: {
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil. Simple, fresh, and delicious!',
      ingredients: [
        { name: 'pizza dough', quantity: '500', unit: 'g' },
        { name: 'tomato sauce', quantity: '200', unit: 'ml' },
        { name: 'fresh mozzarella', quantity: '250', unit: 'g' },
        { name: 'fresh basil', quantity: '20', unit: 'leaves' },
        { name: 'olive oil', quantity: '2', unit: 'tbsp' },
        { name: 'garlic', quantity: '2', unit: 'cloves' },
        { name: 'salt', quantity: 'to taste', unit: '' }
      ],
      instructions: [
        { step: 1, instruction: 'Preheat oven to 250°C. Roll out pizza dough on a floured surface.' },
        { step: 2, instruction: 'Spread tomato sauce evenly over dough, leaving a border for the crust.' },
        { step: 3, instruction: 'Tear mozzarella into pieces and distribute over sauce. Drizzle with olive oil.' },
        { step: 4, instruction: 'Bake for 10-12 minutes until crust is golden. Top with fresh basil leaves before serving.' }
      ],
      cuisine: 'Italian',
      difficulty: 'Medium',
      cookingTime: 30,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
      tags: ['pizza', 'italian', 'vegetarian', 'dinner'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 5.0,
      reviewCount: 2,
      authorId: user1.id
    }
  });

  const recipe7 = await prisma.recipe.create({
    data: {
      title: 'Pad Thai',
      description: 'Authentic Thai stir-fried noodles with tamarind, fish sauce, and your choice of protein. A perfect balance of sweet, sour, and savory.',
      ingredients: [
        { name: 'rice noodles', quantity: '200', unit: 'g' },
        { name: 'shrimp', quantity: '300', unit: 'g' },
        { name: 'eggs', quantity: '2', unit: '' },
        { name: 'bean sprouts', quantity: '100', unit: 'g' },
        { name: 'tamarind paste', quantity: '2', unit: 'tbsp' },
        { name: 'fish sauce', quantity: '2', unit: 'tbsp' },
        { name: 'palm sugar', quantity: '2', unit: 'tbsp' },
        { name: 'lime', quantity: '1', unit: '' },
        { name: 'peanuts', quantity: '50', unit: 'g' }
      ],
      instructions: [
        { step: 1, instruction: 'Soak rice noodles in warm water for 30 minutes until pliable. Drain and set aside.' },
        { step: 2, instruction: 'Mix tamarind paste, fish sauce, and palm sugar to make the sauce.' },
        { step: 3, instruction: 'Heat oil in a wok. Add shrimp and cook until pink. Push aside, scramble eggs in the same pan.' },
        { step: 4, instruction: 'Add noodles and sauce. Toss everything together. Add bean sprouts and serve with lime wedges and crushed peanuts.' }
      ],
      cuisine: 'Thai',
      difficulty: 'Hard',
      cookingTime: 40,
      servings: 3,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
      tags: ['thai', 'noodles', 'seafood', 'stir-fry'],
      ratings: [
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 4 }
      ],
      averageRating: 4.5,
      reviewCount: 2,
      authorId: user2.id
    }
  });

  const recipe8 = await prisma.recipe.create({
    data: {
      title: 'Caesar Salad',
      description: 'Crisp romaine lettuce with homemade Caesar dressing, parmesan cheese, and croutons. A classic that never goes out of style.',
      ingredients: [
        { name: 'romaine lettuce', quantity: '2', unit: 'heads' },
        { name: 'parmesan cheese', quantity: '50', unit: 'g' },
        { name: 'croutons', quantity: '100', unit: 'g' },
        { name: 'anchovies', quantity: '4', unit: 'fillets' },
        { name: 'garlic', quantity: '2', unit: 'cloves' },
        { name: 'lemon juice', quantity: '2', unit: 'tbsp' },
        { name: 'olive oil', quantity: '4', unit: 'tbsp' },
        { name: 'egg yolk', quantity: '1', unit: '' },
        { name: 'worcestershire sauce', quantity: '1', unit: 'tsp' }
      ],
      instructions: [
        { step: 1, instruction: 'Wash and dry romaine lettuce. Tear into bite-sized pieces and place in a large bowl.' },
        { step: 2, instruction: 'Make dressing by mashing anchovies and garlic, then whisking with lemon juice, olive oil, egg yolk, and Worcestershire sauce.' },
        { step: 3, instruction: 'Toss lettuce with dressing until well coated.' },
        { step: 4, instruction: 'Top with grated parmesan cheese and croutons. Serve immediately.' }
      ],
      cuisine: 'American',
      difficulty: 'Easy',
      cookingTime: 15,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
      tags: ['salad', 'healthy', 'quick', 'vegetarian'],
      ratings: [
        { user: user1.id, rating: 4 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 4.5,
      reviewCount: 2,
      authorId: user3.id
    }
  });

  const recipe9 = await prisma.recipe.create({
    data: {
      title: 'Beef Tacos',
      description: 'Seasoned ground beef in warm tortillas with fresh toppings. A crowd-pleasing Mexican favorite!',
      ingredients: [
        { name: 'ground beef', quantity: '500', unit: 'g' },
        { name: 'taco seasoning', quantity: '1', unit: 'packet' },
        { name: 'tortillas', quantity: '8', unit: '' },
        { name: 'lettuce', quantity: '100', unit: 'g' },
        { name: 'tomatoes', quantity: '2', unit: 'medium' },
        { name: 'cheddar cheese', quantity: '150', unit: 'g' },
        { name: 'sour cream', quantity: '100', unit: 'ml' },
        { name: 'onion', quantity: '1', unit: 'medium' },
        { name: 'cilantro', quantity: '20', unit: 'g' }
      ],
      instructions: [
        { step: 1, instruction: 'Brown ground beef in a large pan over medium-high heat, breaking it up as it cooks.' },
        { step: 2, instruction: 'Add taco seasoning and water according to package directions. Simmer until thickened.' },
        { step: 3, instruction: 'Warm tortillas in a dry pan or microwave.' },
        { step: 4, instruction: 'Fill tortillas with beef, then top with lettuce, tomatoes, cheese, sour cream, onion, and cilantro.' }
      ],
      cuisine: 'Mexican',
      difficulty: 'Easy',
      cookingTime: 25,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1565299585323-38174c0d0a1e?w=800',
      tags: ['mexican', 'beef', 'quick', 'dinner'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user2.id, rating: 4 }
      ],
      averageRating: 4.5,
      reviewCount: 2,
      authorId: user1.id
    }
  });

  const recipe10 = await prisma.recipe.create({
    data: {
      title: 'Chicken Caesar Wrap',
      description: 'Grilled chicken, crisp romaine, and Caesar dressing wrapped in a soft tortilla. Perfect for lunch on the go!',
      ingredients: [
        { name: 'chicken breast', quantity: '400', unit: 'g' },
        { name: 'romaine lettuce', quantity: '200', unit: 'g' },
        { name: 'caesar dressing', quantity: '4', unit: 'tbsp' },
        { name: 'parmesan cheese', quantity: '50', unit: 'g' },
        { name: 'tortilla wraps', quantity: '4', unit: 'large' },
        { name: 'croutons', quantity: '50', unit: 'g' },
        { name: 'black pepper', quantity: 'to taste', unit: '' }
      ],
      instructions: [
        { step: 1, instruction: 'Season chicken breast with salt and pepper. Grill or pan-fry until cooked through, then slice.' },
        { step: 2, instruction: 'Wash and chop romaine lettuce into bite-sized pieces.' },
        { step: 3, instruction: 'Warm tortillas slightly to make them pliable.' },
        { step: 4, instruction: 'Layer lettuce, chicken, dressing, cheese, and croutons in each tortilla. Roll tightly and cut in half.' }
      ],
      cuisine: 'American',
      difficulty: 'Easy',
      cookingTime: 20,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800',
      tags: ['chicken', 'wrap', 'lunch', 'quick'],
      ratings: [
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 4 }
      ],
      averageRating: 4.5,
      reviewCount: 2,
      authorId: user2.id
    }
  });

  const recipe11 = await prisma.recipe.create({
    data: {
      title: 'Vegetable Curry',
      description: 'A hearty mix of vegetables in a creamy coconut curry sauce. Warm, comforting, and full of flavor.',
      ingredients: [
        { name: 'potatoes', quantity: '300', unit: 'g' },
        { name: 'cauliflower', quantity: '200', unit: 'g' },
        { name: 'carrots', quantity: '2', unit: 'medium' },
        { name: 'peas', quantity: '100', unit: 'g' },
        { name: 'coconut milk', quantity: '400', unit: 'ml' },
        { name: 'curry powder', quantity: '2', unit: 'tbsp' },
        { name: 'turmeric', quantity: '1', unit: 'tsp' },
        { name: 'onion', quantity: '1', unit: 'large' },
        { name: 'garlic', quantity: '3', unit: 'cloves' },
        { name: 'ginger', quantity: '2', unit: 'cm' }
      ],
      instructions: [
        { step: 1, instruction: 'Cut vegetables into bite-sized pieces. Heat oil in a large pot and sauté onion, garlic, and ginger until fragrant.' },
        { step: 2, instruction: 'Add curry powder and turmeric, cook for 1 minute. Add vegetables and stir to coat.' },
        { step: 3, instruction: 'Pour in coconut milk and bring to a simmer. Cook for 20-25 minutes until vegetables are tender.' },
        { step: 4, instruction: 'Season with salt and serve hot over rice or with naan bread.' }
      ],
      cuisine: 'Indian',
      difficulty: 'Medium',
      cookingTime: 35,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
      tags: ['vegetarian', 'curry', 'indian', 'healthy'],
      ratings: [
        { user: user1.id, rating: 4 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 4.5,
      reviewCount: 2,
      authorId: user3.id
    }
  });

  const recipe12 = await prisma.recipe.create({
    data: {
      title: 'Salmon Teriyaki',
      description: 'Pan-seared salmon glazed with homemade teriyaki sauce. Sweet, savory, and perfectly cooked.',
      ingredients: [
        { name: 'salmon fillets', quantity: '4', unit: 'pieces' },
        { name: 'soy sauce', quantity: '4', unit: 'tbsp' },
        { name: 'mirin', quantity: '2', unit: 'tbsp' },
        { name: 'brown sugar', quantity: '2', unit: 'tbsp' },
        { name: 'ginger', quantity: '2', unit: 'cm' },
        { name: 'garlic', quantity: '2', unit: 'cloves' },
        { name: 'sesame seeds', quantity: '1', unit: 'tbsp' },
        { name: 'green onions', quantity: '2', unit: 'stalks' }
      ],
      instructions: [
        { step: 1, instruction: 'Mix soy sauce, mirin, brown sugar, grated ginger, and minced garlic to make teriyaki sauce.' },
        { step: 2, instruction: 'Heat oil in a pan over medium-high heat. Season salmon and cook skin-side down for 4-5 minutes.' },
        { step: 3, instruction: 'Flip salmon and cook for another 3-4 minutes. Pour teriyaki sauce over and let it glaze.' },
        { step: 4, instruction: 'Serve salmon with sauce, garnished with sesame seeds and sliced green onions.' }
      ],
      cuisine: 'Japanese',
      difficulty: 'Medium',
      cookingTime: 25,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
      tags: ['salmon', 'japanese', 'seafood', 'healthy'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user2.id, rating: 5 }
      ],
      averageRating: 5.0,
      reviewCount: 2,
      authorId: user2.id
    }
  });

  const recipe13 = await prisma.recipe.create({
    data: {
      title: 'French Onion Soup',
      description: 'Rich, caramelized onion soup topped with melted Gruyère cheese and crusty bread. A French bistro classic.',
      ingredients: [
        { name: 'onions', quantity: '6', unit: 'large' },
        { name: 'butter', quantity: '50', unit: 'g' },
        { name: 'beef broth', quantity: '1', unit: 'liter' },
        { name: 'white wine', quantity: '200', unit: 'ml' },
        { name: 'gruyère cheese', quantity: '200', unit: 'g' },
        { name: 'baguette', quantity: '1', unit: 'loaf' },
        { name: 'thyme', quantity: '2', unit: 'sprigs' },
        { name: 'bay leaf', quantity: '1', unit: '' }
      ],
      instructions: [
        { step: 1, instruction: 'Slice onions thinly. Melt butter in a large pot and cook onions over low heat for 45 minutes until deeply caramelized.' },
        { step: 2, instruction: 'Add wine and scrape up any browned bits. Add broth, thyme, and bay leaf. Simmer for 30 minutes.' },
        { step: 3, instruction: 'Slice baguette and toast. Ladle soup into oven-safe bowls, top with bread and grated cheese.' },
        { step: 4, instruction: 'Broil until cheese is bubbly and golden. Serve hot.' }
      ],
      cuisine: 'French',
      difficulty: 'Medium',
      cookingTime: 90,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
      tags: ['french', 'soup', 'vegetarian', 'comfort'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user3.id, rating: 4 }
      ],
      averageRating: 4.5,
      reviewCount: 2,
      authorId: user1.id
    }
  });

  const recipe14 = await prisma.recipe.create({
    data: {
      title: 'Chicken Fajitas',
      description: 'Sizzling strips of marinated chicken with bell peppers and onions, served with warm tortillas and all the fixings.',
      ingredients: [
        { name: 'chicken breast', quantity: '500', unit: 'g' },
        { name: 'bell peppers', quantity: '3', unit: 'mixed colors' },
        { name: 'onion', quantity: '1', unit: 'large' },
        { name: 'lime juice', quantity: '3', unit: 'tbsp' },
        { name: 'cumin', quantity: '1', unit: 'tsp' },
        { name: 'chili powder', quantity: '1', unit: 'tsp' },
        { name: 'tortillas', quantity: '8', unit: '' },
        { name: 'sour cream', quantity: '100', unit: 'ml' },
        { name: 'guacamole', quantity: '200', unit: 'g' }
      ],
      instructions: [
        { step: 1, instruction: 'Slice chicken into strips. Marinate with lime juice, cumin, chili powder, and salt for at least 30 minutes.' },
        { step: 2, instruction: 'Slice bell peppers and onion into strips.' },
        { step: 3, instruction: 'Heat oil in a large skillet. Cook chicken until done, then remove. Add vegetables and cook until tender-crisp.' },
        { step: 4, instruction: 'Return chicken to pan, toss everything together. Serve with warm tortillas, sour cream, and guacamole.' }
      ],
      cuisine: 'Mexican',
      difficulty: 'Easy',
      cookingTime: 30,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
      tags: ['chicken', 'mexican', 'fajitas', 'dinner'],
      ratings: [
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 5.0,
      reviewCount: 2,
      authorId: user2.id
    }
  });

  const recipe15 = await prisma.recipe.create({
    data: {
      title: 'Chocolate Brownies',
      description: 'Fudgy, rich chocolate brownies with a crackly top. The perfect dessert for chocolate lovers!',
      ingredients: [
        { name: 'dark chocolate', quantity: '200', unit: 'g' },
        { name: 'butter', quantity: '150', unit: 'g' },
        { name: 'sugar', quantity: '200', unit: 'g' },
        { name: 'eggs', quantity: '3', unit: '' },
        { name: 'all-purpose flour', quantity: '100', unit: 'g' },
        { name: 'cocoa powder', quantity: '30', unit: 'g' },
        { name: 'vanilla extract', quantity: '1', unit: 'tsp' },
        { name: 'salt', quantity: '0.5', unit: 'tsp' }
      ],
      instructions: [
        { step: 1, instruction: 'Preheat oven to 180°C. Melt chocolate and butter together in a double boiler or microwave.' },
        { step: 2, instruction: 'Whisk sugar and eggs until pale and fluffy. Gradually mix in melted chocolate mixture and vanilla.' },
        { step: 3, instruction: 'Sift in flour, cocoa powder, and salt. Fold gently until just combined.' },
        { step: 4, instruction: 'Pour into a lined 20cm square pan. Bake for 25-30 minutes until set but still fudgy. Let cool before cutting.' }
      ],
      cuisine: 'American',
      difficulty: 'Easy',
      cookingTime: 40,
      servings: 16,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
      tags: ['dessert', 'chocolate', 'baking', 'sweet'],
      ratings: [
        { user: user1.id, rating: 5 },
        { user: user2.id, rating: 5 },
        { user: user3.id, rating: 5 }
      ],
      averageRating: 5.0,
      reviewCount: 3,
      authorId: user1.id
    }
  });

  // Create reviews
  console.log('📝 Creating reviews...');

  await prisma.review.create({
    data: {
      recipeId: recipe1.id,
      userId: user2.id,
      rating: 5,
      comment: 'Absolutely delicious! The carbonara was creamy and perfectly seasoned. Will definitely make this again!'
    }
  });

  await prisma.review.create({
    data: {
      recipeId: recipe1.id,
      userId: user3.id,
      rating: 4,
      comment: 'Great recipe! I added a bit more pepper for extra flavor. Very authentic taste.'
    }
  });

  await prisma.review.create({
    data: {
      recipeId: recipe3.id,
      userId: user1.id,
      rating: 4,
      comment: 'Healthy and filling! The tahini dressing is amazing. Perfect for meal prep.'
    }
  });

  await prisma.review.create({
    data: {
      recipeId: recipe3.id,
      userId: user2.id,
      rating: 5,
      comment: 'Love this bowl! So colorful and nutritious. The combination of flavors is perfect.'
    }
  });

  await prisma.review.create({
    data: {
      recipeId: recipe4.id,
      userId: user3.id,
      rating: 5,
      comment: 'Best chocolate chip cookies I\'ve ever made! They came out perfectly chewy and golden.'
    }
  });

  // Update user favorites
  console.log('⭐ Adding favorites...');

  await prisma.user.update({
    where: { id: user1.id },
    data: {
      favorites: [recipe3.id, recipe4.id]
    }
  });

  await prisma.user.update({
    where: { id: user2.id },
    data: {
      favorites: [recipe1.id, recipe2.id, recipe5.id]
    }
  });

  await prisma.user.update({
    where: { id: user3.id },
    data: {
      favorites: [recipe3.id, recipe4.id]
    }
  });

  // Add followers
  console.log('👥 Adding followers...');

  await prisma.user.update({
    where: { id: user2.id },
    data: {
      followers: [user1.id, user3.id],
      following: [user1.id]
    }
  });

  await prisma.user.update({
    where: { id: user1.id },
    data: {
      following: [user2.id, user3.id]
    }
  });

  // Create meal plans
  console.log('📅 Creating meal plans...');

  const mealPlan1 = await prisma.mealPlan.create({
    data: {
      name: 'Week 1 Healthy Meal Plan',
      description: 'A balanced week of nutritious meals',
      startDate: new Date('2024-12-09'),
      endDate: new Date('2024-12-15'),
      meals: [
        {
          date: '2024-12-09',
          mealType: 'Breakfast',
          recipe: recipe4.id
        },
        {
          date: '2024-12-09',
          mealType: 'Lunch',
          recipe: recipe3.id
        },
        {
          date: '2024-12-09',
          mealType: 'Dinner',
          recipe: recipe1.id
        },
        {
          date: '2024-12-10',
          mealType: 'Dinner',
          recipe: recipe2.id
        }
      ],
      userId: user1.id
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${4} users created`);
  console.log(`   - ${15} recipes created`);
  console.log(`   - ${5} reviews created`);
  console.log(`   - ${1} meal plan created`);
  console.log('\n🔑 Test Credentials:');
  console.log('   Email: maria@example.com | Password: password123');
  console.log('   Email: john@example.com | Password: password123');
  console.log('   Email: sarah@example.com | Password: password123');
  console.log('   Email: admin@recipehub.com | Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

