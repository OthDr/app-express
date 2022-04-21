# News_Express Application
## Express.JS REST API for news 
### **How to use:**
- `npm install` to install all node-modules.<br />
- `npm start` start server.<br />
- `npm test` run test.<br />

### HTTP : GET POST PATCH DELETE
- [x] **JSON request & response.**
- [x] **URlemncoded(*x-www-form-urlencoded*) requests.**

### Database Mongodb : with **mongoose**
- [x] **Collection 1: for news articles**
- [x] **Collection 2: for news authors**


### POST request body validation & Errors
using Joi object schema **`const Joi = require('joi')`**
- [x] **Used Joi package :** Created an object schema to validate the *req.body*.<br />
- [x] **Used mongoose schema :** mongoose ORM for Mongodb provided schema validation of db models.<br />
- [x] **Send back the error** on the response. <br/>
### **Middleware**
#### **body-parser `const bParser = require('body-parser')`:** To parse request body  *JSON or urlencoded* .

## **routes**
### GET : 
- #### GET('/news') *recent news* <br/>
- #### GET('/news/country=:c_code') *news based on country code* <br/>
- #### GET('/news/category=:cat_code') *news based on category* <br/>
- #### GET('/news/:id') *get a post by it's ID* <br/>
### POST :
- #### POST('/add_news') *create a new post* <br/>
### PATCH :
- #### PATCH('/add_news') *update an existing post in the database* <br/>
### DELETE :
- #### DELETE('/add_news') *delete a post from the databse* <br/>


## **testing**
### Mocha & chai
`"scripts": {
    "test": "mocha --exit"
}`
<br/>
**chai-http (request testing), should & expect (Assertions)**

