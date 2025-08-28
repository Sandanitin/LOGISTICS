require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB');
  process.exit(0);
})
.catch(error => {
  console.error('❌ MongoDB connection error:', error.message);
  process.exit(1);
});
