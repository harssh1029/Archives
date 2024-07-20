const express = require("express")
const cors = require('cors');
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require('bcrypt');
require('dotenv').config()
bodyParser = require('body-parser')
const {connection} = require("./config/db")
const {productRouter} = require("./routes/products.route");
const {cartRouter} = require("./routes/cart.route");
const {userRouter} = require("./routes/user.route");
const app = express();

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(function(req, res, next) {
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') 
console.log(req.headers) 
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// app.use(function(req, res) {
//   res.status(404).send({ url: req.originalUrl + ' not found' })
// });



app.use("/products", productRouter)
app.use("/user", userRouter)
app.use("/cart", cartRouter)

app.listen(process.env.port, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`Listening on port ${process.env.port}`)
})

