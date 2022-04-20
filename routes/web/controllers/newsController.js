const Article = require('../../../models/article');
const article = require('../../../models/article');
const path = require('path');

const categories =['business','entertaiment','general','health','science','sports','technologie'];

//  --------------------GET Latest 10 articles ---------------
const get_news_latest = (req,res)=>{ 
    //res.sendFile(path.resolve(__dirname+'../../../../views/index.html')); //static html file
    try{
        let query = article.find().sort({ _id: -1 }).limit(10);
        query.exec((err, posts) => {
            let resultArray = new Array() ;
            resultArray = posts;
            if( resultArray.length < 1 ){
                res.status(404).json({
                    'error':true,
                    'message':"empty ressource"
                });
            }else{
                res.render('index',{result:resultArray});
                console.log(resultArray);
            }
        });
    }
    catch (e){
        res.status(204).json({
            'error':true,
            'message':"empty ressource"
        });
        console.log(e);
    }

}


//---------------------- GET by country -----------------
const get_by_country = (req,res)=>{

    let code = req.params.c_code;
    try{
        let query = article.find({country:req.params.c_code});
        query.exec((err, articles) => {
            let resultArray = new Array() ;
            resultArray = articles;
            if( resultArray.length < 1 ){
                res.status(404).json({
                    'error':true,
                    'message':"empty ressource"
                });
            }else{
                res.render('index',{result:resultArray});
                console.log(resultArray);
            }
        });
    }
    catch (e){
        res.status(404).json({
            'error':true,
            'message':"empty ressource"
        });
        console.log(e);
    }
}


//------------------------ GET by category --------------
const get_by_category = (req,res)=>{

    let code = req.params.cat_code;
    let resultArray =new Array() ;
    try{
        let query = article.find({category:code});
        query.exec((err,articles)=>{
            resultArray = articles;
            if( resultArray.length < 1 ){
                res.status(404).json({
                    'error':true,
                    'message':"empty ressource"
                });
            }else{
                res.render('index',{result:resultArray});
                console.log(resultArray);
            }
        });
    }
    catch(e){
        console.log(e);
    }  
}

//------------------------ GET by ID --------------
const get_by_id = async (req,res)=>{

    let id = req.params.id;
    let result = await article.findOne({_id:id});
    if(result){
        res.render('article',{result:result});
    }else{
        res.render('404');
    }
    console.log(result);

}



//--------------------  POST request  --------------------------
const post_create_article =async(req,res)=>{

    // -----  Request body valid schema ---
    const schema =Joi.object({              
        author: Joi.string().min(4).required(),
        title: Joi.string().min(4).required(),
        description: Joi.string().min(4).required(),
        url: Joi.string().uri(),
        urlToImage: Joi.string().uri(),
        content: Joi.string().min(4).required(),
        category: Joi.string().min(4).required(),
        country: Joi.string().min(2).max(2).required()
    });

    if(req.body){ //request body isn't empty

        validation_data = schema.validate(req.body); // reslut of request body validation
        
        if(!validation_data.error)
        {   
            let article = new Article(req.body);

            await article.save().then((result)=>{ // ***** saving to mongodb
                res.send(result);
                console.log(result);
            }).catch((err)=>{
                console.log('db error',err);
            });

        }else{
                res.status(401);
                res.json({
                    'error':true,
                    'message':`${validation_data.error.message}`
                });
                console.log(validation_data.error.message);
        }
    }else{
        res.json({
            'error':true,
            'message':"ressource body is missing"
        });
        console.log('ressource body is missing');
    }
    
}



//---------------------------------  PUT request  ----------------------------
const patch_article = async (req,res)=>{

    let id = req.params.id;
    try{
        let pub = await article.findOne({_id:id});
        res.send('found');
    }
    catch{
        console.log('error: ressource not found');
        res.status(404).json({
            error:true,
            messsage:'post not found'
        });
    }
}


 //---------------------------------  DELETE request  ----------------------------
const delete_article_by_id = async(req,res)=>{
    let id = req.params.id;
    try{
        await article.deleteOne({_id:id});
        res.json({
            error:false,
            messsage:'post successfully deleted'
        }) ;
    }
    catch{
        console.log('error: ressource not found');
        res.status(404).json({
            error:true,
            messsage:'post not found'
        });
    }
    
}




module.exports = {
    get_news_latest,
    get_by_country,
    get_by_category,
    get_by_id,
    post_create_article,
    patch_article,
    delete_article_by_id,


}