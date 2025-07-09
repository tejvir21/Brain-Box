const express = require("express");
const router = express.Router();
const { getNotes, createNote, deleteNote } = require("../controllers/notesController");
const { verifyToken } = require("../utils/jwt");

router.use(verifyToken);
router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);

module.exports = router;
