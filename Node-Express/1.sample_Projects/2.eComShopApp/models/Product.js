const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

//------------------------------------------------
// Api body
//------------------------------------------------
/*
{
    "title": "product 101",
    "desc": "product 1022 test desc",
    "img": "link/img",
    "categories": [
        "cat1",
        "cat2"
    ],
    "size": "XL",
    "color": "green",
    "price": 50,
    "_id": "6320778bfc5b59af1a0cb87e",
    "createdAt": "2022-09-13T12:28:59.954Z",
    "updatedAt": "2022-09-13T12:28:59.954Z",
    "__v": 0
}
*/