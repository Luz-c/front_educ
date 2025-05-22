import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, XCircle } from "lucide-react";

// Mock graded questions for demonstration
const mockGradedQuestions = [
  {
    id: "q1",
    text: "Quelle est la différence entre let et var en JavaScript?",
    type: "free-text",
    studentAnswer: "let a une portée de bloc alors que var a une portée de fonction.",
    correct: true,
    feedback: "Excellente explication des différences de portée!"
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
    ],
    studentAnswer: ["a", "c"],
    answer: ["a"],
    correct: false,
    feedback: "TypeScript offre principalement du typage statique."
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
    ],
    studentAnswer: "b",
    answer: "b",
    correct: true,
    feedback: "Correct!"
  },
  {
    id: "q4",
    text: "Soumettez votre code pour l'exercice de tri fusion.",
    type: "attachment",
    studentAnswer: "mergeSort.js",
    correct: true,
    feedback: "Bon travail sur l'implémentation du tri fusion."
  }
];

const ExamResults = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Load exam from localStorage
    const examsData = localStorage.getItem('exams');
    if (examsData) {
      const exams = JSON.parse(examsData);
      const currentExam = exams.find(e => e.id === examId);
      
      if (currentExam) {
        setExam(currentExam);
        // In a real app, we would load the actual graded questions
        setQuestions(mockGradedQuestions);
      }
    }
  }, [examId]);

  const renderAnswer = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-1">
            <p className="font-medium">Votre réponse:</p>
            <ul className="list-disc pl-5">
              {question.options?.filter(opt => 
                Array.isArray(question.studentAnswer) && 
                question.studentAnswer.includes(opt.id)
              ).map(opt => (
                <li key={opt.id}>{opt.text}</li>
              ))}
            </ul>
            <p className="font-medium mt-2">Réponse correcte:</p>
            <ul className="list-disc pl-5">
              {question.options?.filter(opt => 
                Array.isArray(question.answer) && 
                question.answer.includes(opt.id)
              ).map(opt => (
                <li key={opt.id}>{opt.text}</li>
              ))}
            </ul>
          </div>
        );
      
      case 'single-answer':
        return (
          <div className="space-y-1">
            <p className="font-medium">Votre réponse:</p>
            <p>{question.options?.find(opt => opt.id === question.studentAnswer)?.text}</p>
            <p className="font-medium mt-2">Réponse correcte:</p>
            <p>{question.options?.find(opt => opt.id === question.answer)?.text}</p>
          </div>
        );
      
      case 'free-text':
        return (
          <div className="space-y-1">
            <p className="font-medium">Votre réponse:</p>
            <div className="p-3 bg-gray-50 rounded-md">
              <p>{question.studentAnswer}</p>
            </div>
          </div>
        );
      
      case 'attachment':
        return (
          <div className="space-y-1">
            <p className="font-medium">Votre fichier soumis:</p>
            <p>{question.studentAnswer}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p>Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{exam.title} - Résultats</h1>
          <div className="flex items-center mt-2">
            <span className="text-lg font-medium mr-2">Note finale: </span>
            <span className="text-xl font-bold text-green-600">{exam.grade}</span>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  {question.correct ? (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded">
                      <CheckCircle className="h-4 w-4" />
                      <span>Correct</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded">
                      <XCircle className="h-4 w-4" />
                      <span>Incorrect</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mt-2">{question.text}</p>
              </CardHeader>
              <CardContent>
                {renderAnswer(question)}
                {question.feedback && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="font-medium">Commentaire du correcteur:</p>
                    <p>{question.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={() => navigate('/student-dashboard')}>
            Retourner au tableau de bord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
