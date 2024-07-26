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
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
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


const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, req.file.path);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  try {
      // Update the database with data from the Excel file
      for (const item of data) {
          await ProductModel.updateOne({ id: item.id }, item, { upsert: true });
      }

      // Delete the uploaded file after processing
      fs.unlinkSync(filePath);

      res.status(200).send('File uploaded and database updated successfully.');
  } catch (error) {
      console.error('Error updating database:', error);
      res.status(500).send('Error updating database');
  }
});



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

