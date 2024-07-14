const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const { productRouter } = require("./routes/products.route");
const { cartRouter } = require("./routes/cart.route");
const { ProductModel } = require("./models/Product.model"); // Ensure this path is correct
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.post("/signup", async (req, res) => {
    const { email, password, name, number } = req.body;
    const userPresent = await UserModel.findOne({ email });
    if (userPresent) {
        return res.send("Try logging in, already exists");
    }
    try {
        bcrypt.hash(password, 4, async function (err, hash) {
            if (err) {
                return res.status(500).send("Error during password hashing");
            }
            const user = new UserModel({ email, password: hash, name, number });
            await user.save();
            res.send("Sign up successful");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong, please try again later");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });

        if (user.length > 0) {
            const hashed_password = user[0].password;
            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ "userID": user[0]._id }, 'hush');
                    res.send({ "msg": "Login successful", "token": token });
                } else {
                    res.send("Login failed");
                }
            });
        } else {
            res.send("Login failed");
        }
    } catch {
        res.status(500).send("Something went wrong, please try again later");
    }
});

// Route to get a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findOne({ id: req.params.id });
        console.log('Product:', product);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);


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

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB successfully");
    } catch (err) {
        console.log("Error connecting to DB");
        console.log(err);
    }
    console.log(`Listening on port ${PORT}`);
});
