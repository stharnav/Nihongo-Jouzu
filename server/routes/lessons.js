const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Get all lessons (summary)
router.get('/', (req, res) => {
  const dataDir = path.join(__dirname, '..', 'data', 'lessons');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();

  const lessons = files.map((file, index) => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
    return {
      id: index + 1,
      lessonNumber: data.lessonNumber,
      title: data.title,
      titleEn: data.titleEn,
      wordCount: data.words?.length || 0,
      grammarCount: data.grammar?.length || 0,
      quizCount: data.quiz?.length || 0,
    };
  });

  res.json(lessons);
});

// Get single lesson
router.get('/:id', (req, res) => {
  const lessonId = req.params.id.padStart(2, '0');
  const filePath = path.join(__dirname, '..', 'data', 'lessons', `lesson-${lessonId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

module.exports = router;
