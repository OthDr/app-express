const express = require('express');
const newsController = require('./controllers/newsController');
const bParser = require('body-parser');

const router = express.Router();

router.use(bParser.json());    // Parse the POST body json
router.use(bParser.urlencoded({extended : true}));  //Parse POST urlencoded 


//  --------------------GET Latest 10 articles ---------------
router.get('/api/news',newsController.get_news_latest);


//---------------------- GET by country -----------------
router.get('/api/news/country=:c_code',newsController.get_by_country);

//------------------------ GET by category --------------
router.get('/api/news/category=:cat_code',newsController.get_by_category);

//------------------------ GET by ID --------------
router.get('/api/news/:id',newsController.get_by_id);

//--------------------  POST request  --------------------------
router.post('/api/add_news',newsController.post_create_article);

//---------------------------------  PUT request  ----------------------------
router.patch('/api/news/:id',newsController.patch_article);

 //---------------------------------  DELETE request  ----------------------------
router.delete('/api/news/:id',newsController.delete_article_by_id);


module.exports = router;
