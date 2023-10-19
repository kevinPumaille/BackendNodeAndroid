const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log('Connected to MongoDB..!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  
  };
  
  module.exports = {
    dbConnection
  }