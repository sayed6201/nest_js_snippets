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