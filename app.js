////Old way to write api using node

// const http = require('http')

// const port = 8000;

// const server = http.createServer((req,res) => {

//     if(req.url == '/' || req.url == '/home'){
//         res.statusCode = 200
//         res.setHeader('Content-Type','text/html');
//         res.write("<h1>Home page</h1>");
//         res.end()
//     }else if(req.url == '/about'){
//         res.setHeader('Content-Type','text/html');
//         res.statusCode = 200
//         res.write("<h1>About page</h1>");
//         res.end()
//     }else{
//         res.setHeader('Content-Type','text/html');
//         res.statusCode = 400
//         res.write("<h1>404 page not found</h1>");
//         res.end()
//     }
// })

// server.listen(port,()=>{
//     console.log(`Server is running on port ${port}`)
// })

//// new way to write api using Express


const express = require('express');
const app = express();

const port = 8000

app.get('/',(req,res)=>{
    // res.send("welcome to hole page")
    res.status(200).send('welcome to home page')
})

app.get('/home',(req,res)=>{
    res.status(200).send('home page')
})

app.get('/about',(req,res)=>{
    // res.send("welcome to hole page")
    res.status(200).send('about page')
})

app.use((req,res,next)=>{
    res.status(400).send('404 page not found')
})

app.listen(port,()=>{
    console.log(`server listining on ${port}`)
})