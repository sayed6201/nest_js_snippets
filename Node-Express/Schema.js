const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

//------------------------------------------------
//Endpoint body to receive the payload
//------------------------------------------------
/*

{
    "userId": "632079d920c76ab26c370bc4",
    "products": [
      {
        "productId": "6320778bfc5b59af1a0cb87e",
        "quantity": "4"
      }
    ]
}

*/



const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

//------------------------------------------------
//Endpoint body to receive the payload
//------------------------------------------------
/*
{
    "userId": "632072f6ad7bf2b99cd02395",
    "products": [
      {
        "productId": "6320778bfc5b59af1a0cb87e",
        "quantity": "5"
      }
    ],
    "amount": "300",
    "address": "dhaka, bangladesh",
    "status": "paid"
  }

*/

//------------------------------------------------
//you can also pass an object in address field ...
//------------------------------------------------
/*
{
  "userId": "632072f6ad7bf2b99cd02395",
  "products": [
    {
      "productId": "6320778bfc5b59af1a0cb87e",
      "quantity": "5"
    }
  ],
  "amount": "300",
  "address": {
      "road": "312",
      "city" : "dhaka"
  },
  "status": "paid"
}
*/



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


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

//------------------------------------------------
// Api body
//------------------------------------------------
/*
{
    "username" : "sayed321",
    "email" : "sayed321@gmail.com",
    "password" : "123456",
    "isAdmin" : true
}
*/