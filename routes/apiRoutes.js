const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());

// Get request for saved notes from file
router.get('/api/notes', async (req, res) => {
  const notes = await JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(notes);
});

// Post request to create new note
router.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));

  const addNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  notes.push(addNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
});

// Delete request to remove existing note
router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync("./db/db.json");
  const dataJSON = JSON.parse(data);
  
  const deleteNotes = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });
  
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

module.exports = router; 