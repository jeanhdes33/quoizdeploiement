import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Basketball() {
  const initialScore = parseInt(localStorage.getItem('score')) || 0;
  const [question, setQuestion] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(initialScore);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questionCount, setQuestionCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    fetchBasketballQuestion();
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !quizComplete) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !answered) {
      handleAnswerButtonClick(-1);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizComplete, answered]);

  const fetchBasketballQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:8000/questions/basketball/random');
      const newQuestion = response.data;

      // Vérifie si la nouvelle question est déjà dans la liste des questions posées
      if (answeredQuestions.some(q => q._id === newQuestion._id)) {
        // Si la question est déjà posée, récupère une nouvelle question
        fetchBasketballQuestion();
      } else {
        // Si la question est nouvelle, l'ajoute à la liste des questions posées
        setQuestion(newQuestion);
        setTimeLeft(10);
        setAnswered(false);
        setDisableButtons(false);
        setAnsweredQuestions([...answeredQuestions, newQuestion]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la question de basketball :', error);
    }
  };

  const handleAnswerButtonClick = async (selectedOptionIndex) => {
    const isCorrect = selectedOptionIndex === question.correctOptionIndex;
    let updatedScore = score;
    if (isCorrect) {
      updatedScore += 5 + timeLeft;
      setCorrectAnswers(correctAnswers + 1);
    } else if (selectedOptionIndex !== -1) {
      updatedScore -= 5;
    } else {
      updatedScore -= 10;
    }
    setScore(updatedScore);
    setAnswered(true);
    setDisableButtons(true);
    localStorage.setItem('score', updatedScore);
    
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.post('http://localhost:8000/update-score', { userId: userId, newScore: updatedScore });
      console.log('Score mis à jour côté serveur:', response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du score côté serveur:', error);
    }

    setTimeout(() => {
      if (questionCount < 4) {
        fetchBasketballQuestion();
        setQuestionCount(questionCount + 1);
        setDisableButtons(false);
      } else {
        console.log('Score final :', score);
        setQuizComplete(true);
      }
    }, 2000);
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=Mon%20nombre%20de%20bonnes%20réponses%20à%20Quoiz%20est%20de%20${correctAnswers}%20!%20Viens%20jouer%20!`;
    window.open(shareUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://example.com&quote=Mon%20nombre%20de%20bonnes%20réponses%20à%20Quoiz%20est%20de%20${correctAnswers}%20!%20Viens%20jouer%20!`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="quiz-container flex justify-center">
      <div className="quiz">
        <div className="quiz-content" style={{ maxWidth: '100%', width: '100%' }}>
          {quizComplete ? (
            <div>
              <div className="question-section tertiary-bg">
                <div className="question-text">
                  <h2 className="question">Quiz complet</h2>
                </div>
              </div>
              <div className="answer-section" style={{ opacity: quizComplete ? 1 : 0, transition: 'opacity 1s ease' }}>
                <button style={{ textAlign: 'center', cursor: 'default' }}><strong>Votre score global est : {score}</strong></button>
                <button style={{ textAlign: 'center', cursor: 'default' }}><strong>Nombre de bonnes réponses : {correctAnswers} / 5</strong></button>
                <button style={{ textAlign: 'center', cursor: 'default' }}><strong>Précision : {((correctAnswers / 5) * 100).toFixed(2)}%</strong></button>
                <button onClick={shareOnTwitter} className="question" style={{backgroundColor: 'transparent', border: '2px solid blue', color: 'blue'}}>Partager sur Twitter</button>
                <button onClick={shareOnFacebook} className="button share" style={{backgroundColor: 'transparent', border: '2px solid blue', color: 'blue'}}>Partager sur Facebook</button>
              </div>
              <div className="share-buttons flex justify-center mt-4"></div>
            </div>
          ) : !question ? (
            <div className="loading">Loading...</div>
          ) : (
            <div>
              <div className="question-section tertiary-bg">
                <div className="question-count white">Question</div>
                <div className="question-text">
                  <h2 className="question">{question.question}</h2>
                </div>
              </div>
              <div className="answer-section">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerButtonClick(index)}
                    className={answered && index === question.correctOptionIndex ? 'correct' : answered && index !== question.correctOptionIndex ? 'incorrect' : ''}
                    disabled={answered || disableButtons}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="time-left">Temps restant : {timeLeft} secondes</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Basketball;
