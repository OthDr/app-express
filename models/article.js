const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:String,
    author:String,
    description:String,
    url:String,
    urlToImage:String,
    publishedAt:{ 
        type: Date,
        default: Date.now() 
    },
    content:String,
    category:{
        type:String,
        enum:['business','entertaiment','general','health','science','sports','technologie']
    },
    country:{
        type:String,
        enum:['dz','us','fr','ru','in','de','tr','eg','br','ca','cz','it','ua']
    },
},{ timestamps:true });

const article = mongoose.model('article',articleSchema);

module.exports = article;