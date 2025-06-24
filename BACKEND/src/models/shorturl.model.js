import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true, 
  },
  short_url: {
    type: String,
    required: true,
    index: true,
    unique: true, // Ensure that short URLs are unique
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  }
});

const urlSchema = mongoose.model("urlSchema", shortUrlSchema);

export default urlSchema;