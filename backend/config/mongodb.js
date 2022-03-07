import mongoose from "mongoose";

const user = 'user1'
const password = 'user1'
const database = 'data_fajri'

// mongoose.connect('mongodb://localhost:27017'); //this code is for trying to connect without user
mongoose.connect(`mongodb://${user}:${password}@localhost:27017/${database}?authSource=admin`);

mongoose.connection
    .once('open', () => console.log(`Server mongodb database '${database}' : connected`))
    .on('error', (error) => console.log(`Error: ${error}`));

