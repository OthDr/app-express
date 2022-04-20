const express = require('express');
const newsController = require('./controllers/newsController');
const bParser = require('body-parser');

const router = express.Router();

router.use(bParser.json());    // Parse the POST body json
router.use(bParser.urlencoded({extended : true}));  //Parse POST urlencoded 


//  --------------------GET Latest 10 articles ---------------
router.get('/web/news',newsController.get_news_latest);


//---------------------- GET by country -----------------
router.get('/web/news/country=:c_code',newsController.get_by_country);

//------------------------ GET by category --------------
router.get('/web/news/category=:cat_code',newsController.get_by_category);

//------------------------ GET by ID --------------
router.get('/web/news/:id',newsController.get_by_id);

//--------------------  POST request  --------------------------
router.post('/web/add_news',newsController.post_create_article);

//---------------------------------  PUT request  ----------------------------
router.patch('/web/news/:id',newsController.patch_article);

 //---------------------------------  DELETE request  ----------------------------
router.delete('/web/news/:id',newsController.delete_article_by_id);

// ----------  status 404  ------------
router.use((req,res)=>{
    res.render('404');
});

module.exports = router;
