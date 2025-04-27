const express = require("express");
const router = express.Router();

let suggestions = [];

router.get("/", (req, res) => {
  res.status(200).json(suggestions);
});

router.post("/new", (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    const newId = Date.now();
    const newSuggestion = { id: newId, title, description };
    suggestions.push(newSuggestion);
    res.status(201).json(newSuggestion);
  } else {
    res.status(400).json({ error: "Title and description are required" });
  }
});

router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  const index = suggestions.findIndex(suggestion => suggestion.id.toString() === id);

  if (index !== -1) {
    suggestions.splice(index, 1);
    res.status(200).json({ message: "Suggestion deleted successfully" });
  } else {
    res.status(404).json({ error: "Suggestion not found" });
  }
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const index = suggestions.findIndex(suggestion => suggestion.id.toString() === id);

  if (index !== -1) {
    suggestions[index].title = title;
    suggestions[index].description = description;
    res.status(200).json(suggestions[index]);
  } else {
    res.status(404).json({ error: "Suggestion not found" });
  }
});

module.exports = router;
