const fs = require ('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());

router.get('/api/notes', async (req, res) => {
  const notes = await JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(notes);
});

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

module.exports = router; 