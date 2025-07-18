import express from 'express';
import auth from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

// Get all notes
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json(notes);
});

// Create note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ user: req.user.id, title, content });
  res.json(note);
});

// Update note
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(req.params.id, { title, content, updatedAt: Date.now() }, { new: true });
  res.json(note);
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Note deleted' });
});

export default router;
