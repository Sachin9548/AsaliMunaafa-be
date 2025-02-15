const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
// Define a schema
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
        type: String
      },
      answer: {
        type: String
      }
    }
  ],
  product: {
    name: {
      type: String,
      default: null
    },
    sellingPrice: {
      type: Number,
      default: null
    },
    ManufacturingCost: {
      type: String,
      default: null
    },
  },
  businessDetailsSteps: {
    step1: {
      type: Boolean,
      default: false
    },
    step2: {
      type: Boolean,
      default: false
    },
    step3: {
      type: Boolean,
      default: false
    },
    step4: {
      type: Boolean,
      default: false
    },
    step5: {
      type: Boolean,
      default: false
    },
  },
});
module.exports = mongoose.model('BusinessDetails', BusinessDetailsSchema);