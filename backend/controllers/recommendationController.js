import Plant from "../models/Plant.js";
import Bookmark from "../models/BookMark.js";
import Note from "../models/Note.js";
import Tour from "../models/Tour.js";

// PERSONALIZED RECOMMENDATIONS
export const getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    let themeScore = {};

    // 1️⃣ Bookmarks → strongest signal
    const bookmarks = await Bookmark.find({ user: userId }).populate("plant");
    bookmarks.forEach((b) => {
      b.plant.themes?.forEach((theme) => {
        themeScore[theme] = (themeScore[theme] || 0) + 3;
      });
    });

    // 2️⃣ Notes → strong interest signal
    const notes = await Note.find({ user: userId }).populate("plant");
    notes.forEach((n) => {
      n.plant.themes?.forEach((theme) => {
        themeScore[theme] = (themeScore[theme] || 0) + 3;
      });
    });

    // 3️⃣ If no activity → fallback
    if (Object.keys(themeScore).length === 0) {
      const popularPlants = await Plant.find().limit(5);
      return res.status(200).json({
        message: "Showing popular plants",
        plants: popularPlants,
        tours: [],
      });
    }

    // 4️⃣ Sort themes by interest
    const sortedThemes = Object.entries(themeScore)
      .sort((a, b) => b[1] - a[1])
      .map((t) => t[0]);

    // 5️⃣ Recommend plants
    const recommendedPlants = await Plant.find({
      themes: { $in: sortedThemes },
    }).limit(6);

    // 6️⃣ Recommend tours
    const recommendedTours = await Tour.find({
      theme: { $in: sortedThemes },
      isPublished: true,
    }).limit(3);

    res.status(200).json({
      interests: sortedThemes,
      plants: recommendedPlants,
      tours: recommendedTours,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
