const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Mongodb connection error, Please make sure db is running');
        console.error(error);
        process.exit(1); 
    }
}

module.exports = connect;
