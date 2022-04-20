const express = require('express');
const routes = require('./routes/api/newsRoute');
const webRoutes = require('./routes/web/newsRoute');
const mongoose = require('mongoose');
const morgan = require('morgan');
const db = 'mongodb://127.0.0.1/newsdb';
const port = process.env.PORT || 3000 ; // dinamic port based on machine ports otherwise use 3000


const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.set('view engine' , 'ejs'); // set ejs as a view engine


// database connection 
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

    
}).catch((err)=>{
    console.log('failed to connect to db',err);
});




    

    app.listen(port, ()=>{
        console.log(`Server is listening on port: ${port}`);
    });
    console.log('db connection successeded');
    

    

 // ----------- HOME endpoint -------
    app.get('/',(req,res)=>{

        res.status(200)
        .json({
            error:false,
            message:'home endpoint'
        });
    });
    
//-----------  News routes  ----------
    app.use(routes);
    app.use(webRoutes);
    
    app.use((req,res)=>{
        res.status(404).json({
            'error':true,
            'message':"this ressource doesn't exists"
        });
        
    });    
    








module.exports = app ;