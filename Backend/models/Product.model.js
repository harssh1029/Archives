const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    gender: String,
    name : String,
    price : String,
    image : String,
    image1: String,
    image2: String,
    quanty: Number,
    size: String,
    materialdesc: String,
    materialtype : String,
    care : String,
    origin : String,
    color : String,
    id: String,
    type: String,
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = { productSchema,ProductModel }