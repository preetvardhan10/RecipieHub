// Quick test script to verify environment setup
console.log('=== Environment Check ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET (hidden)' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET (hidden)' : 'NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'NOT SET');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'SET (hidden)' : 'NOT SET');
console.log('=======================');
