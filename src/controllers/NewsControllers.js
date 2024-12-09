import News from "../models/NewsModel.js";

// Controller to get all news items
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Controller to create a new news item
const createNews = async (req, res) => {
  const { image, description } = req.body;

  if (!image || !description) {
    return res.status(400).json({ message: "Image and description are required" });
  }

  try {
    const news = new News({ image, description });
    await news.save();
    res.status(201).json({ message: "News item created successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Error creating news item", error });
  }
};

// Controller to update a news item by ID
const updateNews = async (req, res) => {
  const { id } = req.params;
  const { image, description } = req.body;

  if (!image && !description) {
    return res
      .status(400)
      .json({ message: "At least one field (image or description) is required to update" });
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { image, description },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News item not found" });
    }

    res.status(200).json({ message: "News item updated successfully", updatedNews });
  } catch (error) {
    res.status(500).json({ message: "Error updating news item", error });
  }
};

// Controller to delete a news item by ID
const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News item not found" });
    }
    res.status(200).json({ message: "News item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news item", error });
  }
};

export  {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
};
