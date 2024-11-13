const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mobility';

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
        });
        console.log('OK');
    } catch (err) {
        console.error('PAS OK:', err);
        process.exit(1);
    }
};
const mobilitySchema = new mongoose.Schema({
    Adresse: { type: String, required: true },
    Description: { type: String, required: true },
    Date: { type: String, required: true }
}, {
    collection: 'mobilitydb'
});
const DB = mongoose.model('Mobility', mobilitySchema);
module.exports = {connectDB,DB};

