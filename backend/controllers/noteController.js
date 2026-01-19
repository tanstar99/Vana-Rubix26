import Note from "../models/Note.js";

export const addNote = async (req, res) => {
  try {
    const { plant, content } = req.body;

    const note = await Note.create({
      user: req.user._id,
      plant,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { plant } = req.query;

    const notes = await Note.find({
      user: req.user._id,
      plant,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
