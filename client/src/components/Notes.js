import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./styles/Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [create, setCreate] = useState(false);

  const fetchNotes = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes`, {
      withCredentials: true,
    });
    setNotes(res.data);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
  }
};

const addNote = async () => {
  if (!content) return;
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/notes`,
      { content },
      {
        withCredentials: true,
      }
    );
    setNotes([...notes, res.data]);
    setContent("");
    setCreate(false);
  } catch (error) {
    console.error("Failed to add note:", error);
  }
};

const deleteNote = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
      withCredentials: true,
    });
    setNotes(notes.filter((note) => note._id !== id));
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
}
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes">
      {create ? (
        <div class="add-note">
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="New Note"
          />
          <Button onClick={addNote} variant="contained">
            Add
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={() => setCreate(true)}>
          Create Note
        </Button>
      )}

      <h3>Notes</h3>

        {notes.map((note) => (
          <p key={note._id} className="note">
            {note.content}
            <span onClick={() => deleteNote(note._id)}>❌</span>
          </p>
        ))}
    </div>
  );
};

export default Notes;
