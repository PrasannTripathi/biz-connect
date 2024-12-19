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
  const { title, description, category, image } = req.body;

  // Validate required fields
  if (!title || !description || !category || !image) {
    return res.status(400).json({ 
      message: "Title, description, category, and image are required" 
    });
  }

  try {
    const news = new News({ 
      title, 
      description, 
      category, 
      image // Store base64 image directly
    });
    await news.save();
    res.status(201).json({ 
      message: "News item created successfully", 
      news 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating news item", 
      error 
    });
  }
};

// Controller to update a news item by ID
const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, image } = req.body;

  // Validate that at least one field is provided for update
  if (!title && !description && !category && !image) {
    return res.status(400).json({ 
      message: "At least one field is required to update" 
    });
  }

  try {
    // Find the existing news item
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ 
        message: "News item not found" 
      });
    }

    // Create an object with only the fields that are provided
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (image) updateData.image = image;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Returns the updated document
    );

    res.status(200).json({ 
      message: "News item updated successfully", 
      news: updatedNews 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating news item", 
      error 
    });
  }
};

// Controller to delete a news item by ID
const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ 
        message: "News item not found" 
      });
    }

    res.status(200).json({ 
      message: "News item deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting news item", 
      error 
    });
  }
};

export {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
};