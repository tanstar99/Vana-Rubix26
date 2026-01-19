import Bookmark from "../models/BookMark.js";

// Add bookmark
export const addBookmark = async (req, res) => {
  try {
    const { plant } = req.body;

    const exists = await Bookmark.findOne({
      user: req.user._id,
      plant,
    });

    if (exists) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      plant,
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).populate(
      "plant",
    );

    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};