import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { useToast } from "../hook/use-toast";
import { Clock, AlertTriangle } from "lucide-react";

const mockQuestions = [
  {
    id: "q1",
    text: "Quelle est la différence entre let et var en JavaScript?",
    type: "free-text",
  },
  {
    id: "q2",
    text: "Quel est le principal avantage de TypeScript par rapport à JavaScript?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Typing statique" },
      { id: "b", text: "Meilleure performance" },
      { id: "c", text: "Plus de fonctionnalités" },
      { id: "d", text: "Support multiplateforme" }
    ]
  },
  {
    id: "q3",
    text: "SQL est un langage de...",
    type: "single-answer",
    options: [
      { id: "a", text: "Programmation orientée objet" },
      { id: "b", text: "Manipulation de données" },
      { id: "c", text: "Balisage" },
      { id: "d", text: "Script côté client" }
    ]
  },
  {
    id: "q4",
    text: "Soumettez votre code pour l'exercice de tri fusion.",
    type: "attachment",
  }
];

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load exam from localStorage
    const examsData = localStorage.getItem('exams');
    if (examsData) {
      const exams = JSON.parse(examsData);
      const currentExam = exams.find(e => e.id === examId);
      
      if (currentExam) {
        setExam(currentExam);
        
        // If this is a real exam, we would load its questions
        // For now, use mock questions
        setQuestions(mockQuestions);
        
        // Set timer based on the exam duration
        setRemainingTime(currentExam.duration * 60); // convert to seconds
        
        // Update exam status to in-progress in localStorage if it was upcoming
        if (currentExam.status === 'upcoming') {
          const updatedExams = exams.map(e => {
            if (e.id === examId) {
              return { ...e, status: 'in-progress' };
            }
            return e;
          });
          localStorage.setItem('exams', JSON.stringify(updatedExams));
        }
      }
    }
  }, [examId]);

  // Timer countdown
  useEffect(() => {
    if (remainingTime <= 0 || !exam) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, exam]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleFileChange = (questionId, event) => {
    const file = event.target.files?.[0] || null;
    handleAnswerChange(questionId, file);
  };

  const handleSubmit = () => {
    if (!exam) return;

    setIsSubmitting(true);
    
    // Save answers to localStorage
    const examsData = localStorage.getItem('exams');
    if (examsData) {
      const exams = JSON.parse(examsData);
      const updatedExams = exams.map(e => {
        if (e.id === examId) {
          return { ...e, status: 'completed' };
        }
        return e;
      });
      localStorage.setItem('exams', JSON.stringify(updatedExams));
    }

    // In a real application, we would submit answers to the server
    
    // Show success toast
    toast({
      title: "Examen soumis",
      description: "Votre examen a été soumis avec succès.",
    });

    // Navigate back to the dashboard
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 1500);
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options?.map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${question.id}-${option.id}`}
                  className="mr-2"
                  checked={Array.isArray(answers[question.id]) && (answers[question.id])?.includes(option.id)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(answers[question.id]) ? [...answers[question.id]] : [];
                    if (e.target.checked) {
                      handleAnswerChange(question.id, [...currentAnswers, option.id]);
                    } else {
                      handleAnswerChange(question.id, currentAnswers.filter(a => a !== option.id));
                    }
                  }}
                />
                <label htmlFor={`${question.id}-${option.id}`}>{option.text}</label>
              </div>
            ))}
          </div>
        );
      
      case 'single-answer':
        return (
          <div className="space-y-2">
            {question.options?.map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={`${question.id}-${option.id}`}
                  name={`question-${question.id}`}
                  className="mr-2"
                  checked={answers[question.id] === option.id}
                  onChange={() => handleAnswerChange(question.id, option.id)}
                />
                <label htmlFor={`${question.id}-${option.id}`}>{option.text}</label>
              </div>
            ))}
          </div>
        );
      
      case 'free-text':
        return (
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="Votre réponse..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        );
      
      case 'attachment':
        return (
          <div>
            <input
              type="file"
              onChange={(e) => handleFileChange(question.id, e)}
            />
            {answers[question.id] && (
              <p className="text-sm text-green-600 mt-1">
                Fichier joint: {answers[question.id].name}
              </p>
            )}
          </div>
        );
      
      default:
        return <p>Type de question non supporté</p>;
    }
  };

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <p>Chargement de l'examen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{exam.title}</h1>
            <p className="text-gray-600">Durée: {exam.duration} minutes</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <span className="text-xl font-medium">
              {formatTime(remainingTime)}
            </span>
          </div>
        </div>

        {remainingTime < 300 && remainingTime > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Il vous reste moins de 5 minutes pour terminer l'examen!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1}: {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderQuestion(question, index)}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Soumission..." : "Soumettre l'examen"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
