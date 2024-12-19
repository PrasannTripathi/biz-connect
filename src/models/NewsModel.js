import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    image: {
      type: String, // Store the image as a Base64 string or as a URL if using cloud storage
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500, // Optional: Restrict description length
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

const News = mongoose.model("News", NewsSchema);

export default News;
