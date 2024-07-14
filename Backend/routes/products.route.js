const express = require("express");
const { ProductModel } = require("../models/Product.model");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        const products = await ProductModel.find();
        console.log('Products:', products);
        res.send(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
});

productRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const new_product = new ProductModel(payload);
        await new_product.save();
        res.send({ "msg": "Product created successfully" });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).send({ "err": "Something went wrong" });
    }
});

module.exports = { productRouter };
