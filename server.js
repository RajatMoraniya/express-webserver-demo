const fs = require("fs");
const path = require('path')
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const productArr = data.products;

const express = require('express');
const morgan = require('morgan');

const server = express();

//Morgan Middleware third party request logger 
server.use(morgan('dev'))
//MiddleWare
//Create custom middleware : logger
server.use((req,res,next)=>{
  console.log(req.method , req.ip ,new Date(), req.hostname);
  next();  
})


//Auth middleware initialze and called later down
const authForGet = (req,res,next)=>{
  if(req.query.password=='123'){
    next();
  }else{
    res.sendStatus(401);
  }
}
// server.use(auth);

// express.urlencoded() middlware used for reading form data from request
// server.use(express.urlencoded());

// express.static() is use for make an folder as static hosting and we can use that folder (public : folderName) files directly and it is default searching index.html if we use static hosting;
// if  server.use(express.static('public')) written first in server file then public/index.html view in browser otherwise up to down requests handled
// if index.html is missing in publicFolder then NO public/INDEX.HTML will preview
server.use(express.static('publicFOLDER'));

//For using JSON Body of request by POST request need bodyParser OR inbuilt express.json() middleware to use
server.use(express.json());

const authForPost = (req,res,next)=>{
  if(req.body.password=='123'){
    next();
  }else{
    res.sendStatus(401);
  }
}

//in upper auth function you see how to get data from request =>
// 1 req.query = abcd.com?pass=123
// 2 req.body = JSON BODY { "pas" = "123"} puting in postman req.body
// 2 req.params = abcd.com/:id => return whole object => {"id" : "5"}


//API - Endpoint - Route |  GET POST PUT DELETE PATCH
server.get('/',authForGet,(req,res)=>{
  res.send({type: 'GET'})
})
server.get('/products/:id',(req,res)=>{
  console.log(req.params); // { id: '1' }
  res.send({type: 'ID from req.params', id: req.params})
})
server.post('/',authForPost,(req,res)=>{
  res.send({type: 'POST'})
})
server.delete('/',(req,res)=>{
  res.send({type: 'DELETE'})
})
server.put('/',(req,res)=>{
  res.send({type: 'PUT'})
})
server.patch('/',(req,res)=>{
  res.send({type: 'PATCH'})
})



//Demo 
server.get('/demo',(req,res)=>{
  // res.send('hello');
  // res.sendFile("C:/Users/DELL/Desktop/Co/express-webserver/index.html");
  // res.sendStatus(404);
  // res.json(data);
  res.status(201).send('<h1>hello<h1>');

})


server.listen(8080, ()=>{
  console.log('server started');
});
