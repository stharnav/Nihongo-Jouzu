import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

export default function QuestionCard({ question, onAnswer, showResult, selectedAnswer }) {
  const [selected, setSelected] = useState(null);
  const { settings } = useSettings();
  const { language } = settings;

  const handleSelect = (index) => {
    if (showResult) return;
    setSelected(index);
    onAnswer(index === question.correctAnswer, index);
  };

  const displayQuestion = language === 'en' ? question.question : (question.questionNp || question.question);
  const displayOptions = language === 'en' ? question.options : (question.optionsNp || question.options);

  return (
    <div className="animate-fade-in">
      {/* Question */}
      <div className="card mb-6 text-center">
        <div className="text-sm text-duolingo-text-secondary mb-3 font-semibold">
          {language === 'en' ? 'Choose the correct answer' : 'सही उत्तर छान्नुहोस्'}
        </div>
        <h2 className="text-xl font-bold text-duolingo-text-primary leading-relaxed">
          {displayQuestion}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {displayOptions.map((option, index) => {
          let btnClass = 'btn-option';

          if (showResult) {
            if (index === question.correctAnswer) {
              btnClass = 'btn-option-correct';
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              btnClass = 'btn-option-wrong';
            } else {
              btnClass = 'btn-option opacity-50';
            }
          } else if (selected === index) {
            btnClass = 'btn-option border-duolingo-blue bg-blue-50';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={btnClass}
              disabled={showResult}
            >
              <span className="text-base">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className={`mt-6 p-4 rounded-2xl text-center font-bold animate-slide-up ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 text-duolingo-green-dark'
            : 'bg-red-50 text-duolingo-red'
        }`}>
          {selectedAnswer === question.correctAnswer ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              {language === 'en' ? 'Correct!' : 'सही!'}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">😅</span>
              {language === 'en'
                ? `Incorrect — the answer was: "${displayOptions[question.correctAnswer]}"`
                : `गलत — सही उत्तर थियो: "${displayOptions[question.correctAnswer]}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
