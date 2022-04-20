const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    first_name:String,
    last_name:String,
    nb_pubs:Number
},{ timestamps:true });

const author = mongoose.model('author',authorSchema);

module.exports = author;