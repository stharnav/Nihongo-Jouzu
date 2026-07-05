const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Get quiz for a specific lesson
router.get('/:lessonId', (req, res) => {
  const lessonId = req.params.lessonId.padStart(2, '0');
  const filePath = path.join(__dirname, '..', 'data', 'lessons', `lesson-${lessonId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json({
    lessonId: data.lessonNumber,
    questions: data.quiz || [],
  });
});

// Submit quiz answers and get score
router.post('/submit', (req, res) => {
  const { lessonId, answers } = req.body;

  if (!lessonId || !answers) {
    return res.status(400).json({ error: 'lessonId and answers are required' });
  }

  const paddedId = String(lessonId).padStart(2, '0');
  const filePath = path.join(__dirname, '..', 'data', 'lessons', `lesson-${paddedId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Lesson not found' });
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const questions = data.quiz || [];

  let score = 0;
  const results = questions.map((q, index) => {
    const userAnswer = answers[index];
    const correct = userAnswer === q.correctAnswer;
    if (correct) score++;
    return {
      questionId: q.id,
      correct,
      correctAnswer: q.correctAnswer,
    };
  });

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  res.json({
    score,
    total,
    percentage,
    passed: percentage >= 60,
    results,
  });
});

module.exports = router;
