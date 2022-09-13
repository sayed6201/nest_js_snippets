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
