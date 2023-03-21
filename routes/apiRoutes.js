const fs = require ("fs");
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', async (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json","utf8"));
  res.json(notes);
});

router.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json","utf8"));
  const addNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  notes.push(addNote);
  fs.writeFileSync("./db/db.json",JSON.stringify(notes));
  res.json(notes);
});

// router.delete('/api/notes/:id', (req, res) => {
//   let data = fs.readFileSync("./db/db.json", "utf8");
//   const dataJSON =  JSON.parse(data);
//   const newNotes = dataJSON.filter((note) => { 
//     return note.id !== req.params.id;
//   });
//   fs.writeFileSync("./db/db.json",JSON.stringify(newNotes));
//   res.json("Note deleted.");
// });

module.exports = router; 