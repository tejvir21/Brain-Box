const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createNote = async (req, res) => {
  const { content } = req.body;
  try {
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const note = await Note.create({ userId: req.user.id, content });
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }
    const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
