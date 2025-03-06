const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const BusinessDetailsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
  },
  marketingPlatform: {
    type: Array,
  },
  industry: {
    type: Array,
  },
  shipping: {
    type: Array,
  },
  aboutBusiness: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
  products: [
    {
      productId: {
        type: String,
      },
      productName: {
        type: String,
      },
      productPrice: {
        type: Number,
      },
      manufacturingCost: {
        type: Number,
      },
    },
  ],
  businessDetailsSteps: {
    step1: {
      type: Boolean,
      default: false,
    },
    step2: {
      type: Boolean,
      default: false,
    },
    step3: {
      type: Boolean,
      default: false,
    },
    step4: {
      type: Boolean,
      default: false,
    },
    step5: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("BusinessDetails", BusinessDetailsSchema);