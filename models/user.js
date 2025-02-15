const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: null,
    },
    websiteUrl: {
      type: String,
      default: null,
    },
    registrationType: {
      type: String,
      enum: ["Google", "Email"],
      default: "Email",
    },
    aboutAsaliMunafaa: {
      type: String,
      default: null,
    },
    sellingProduct: {
      type: String,
      default: null,
    },
    monthlyRevenue: {
      type: String,
      default: null,
    },
    goal: {
      type: String,
      default: null,
    },
    futureRevenue: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    onboardingSteps: {
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
    },
    token: {
      type: {
        type: String,
        enum: ["Access", "Denied"],
      },
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
    },
    forgotPassword: {
      createdAt: {
        type: Date,
        default: null,
      },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
