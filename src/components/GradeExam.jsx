import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { FileText, ArrowRight, Logs } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useToast } from "../hook/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SurveillanceLogs from "./SurveillanceLogs";

// Mock data for students who submitted the exam
const mockStudentSubmissions = [
  { 
    id: "s1", 
    name: "Kossi Adjakou", 
    status: "submitted", 
    submittedAt: "2025-05-15T14:30:00" 
  },
  { 
    id: "s2", 
    name: "Aminata Houngbédji", 
    status: "submitted", 
    submittedAt: "2025-05-14T10:15:00" 
  },
  { 
    id: "s3", 
    name: "Yao Gnonlonfoun", 
    status: "graded", 
    submittedAt: "2025-05-13T09:45:00",
    grade: "B+"
  },
  { 
    id: "s4", 
    name: "Adjovi Zinsou", 
    status: "submitted", 
    submittedAt: "2025-05-15T16:20:00" 
  },
];

// Mock graded questions for demonstration
const mockGradedQuestions = [
  {
    id: "q1",
    text: "Quelle est la différence entre let et var en JavaScript?",
    type: "free-text",
    studentAnswer: "let a une portée de bloc alors que var a une portée de fonction.",
    correct: true,
    feedback: ""
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
    feedback: ""
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
    feedback: ""
  },
  {
    id: "q4",
    text: "Soumettez votre code pour l'exercice de tri fusion.",
    type: "attachment",
    studentAnswer: "mergeSort.js",
    correct: true,
    feedback: ""
  }
];

const GradeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState("responses");

  useEffect(() => {
    // Load exam from localStorage
    const examsData = localStorage.getItem('exams');
    if (examsData) {
      const exams = JSON.parse(examsData);
      const currentExam = exams.find(e => e.id === examId);
      
      if (currentExam) {
        setExam(currentExam);
        // In a real app, we would load the actual student submissions
        setStudents(mockStudentSubmissions);
      }
    }
  }, [examId]);

  const handleViewSubmission = (student) => {
    setSelectedStudent(student);
    // In a real app, we would load the specific student's answers
    setQuestions(mockGradedQuestions.map(q => ({...q, feedback: ""})));
    setDialogOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleOpenFeedback = (questionId, feedback) => {
    setCurrentFeedback({
      questionId,
      text: feedback
    });
  };

  const handleSaveFeedback = () => {
    if (!currentFeedback) return;
    
    setQuestions(questions.map(q => 
      q.id === currentFeedback.questionId 
        ? {...q, feedback: currentFeedback.text} 
        : q
    ));
    
    setCurrentFeedback(null);
  };

  const handleSubmitGrading = () => {
    // In a real app, we would save the graded questions to the database
    
    // Update the student status in our local state
    if (selectedStudent) {
      const updatedStudents = students.map(s => 
        s.id === selectedStudent.id 
          ? {...s, status: "graded", grade: "A"} 
          : s
      );
      setStudents(updatedStudents);
    }
    
    setDialogOpen(false);
    toast({
      title: "Évaluation soumise",
      description: "Les commentaires et la note ont été enregistrés.",
    });
  };

  const renderAnswer = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-1">
            <p className="font-medium">Réponse de l'étudiant:</p>
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
            <p className="font-medium">Réponse de l'étudiant:</p>
            <p>{question.options?.find(opt => opt.id === question.studentAnswer)?.text}</p>
            <p className="font-medium mt-2">Réponse correcte:</p>
            <p>{question.options?.find(opt => opt.id === question.answer)?.text}</p>
          </div>
        );
      
      case 'free-text':
        return (
          <div className="space-y-1">
            <p className="font-medium">Réponse de l'étudiant:</p>
            <div className="p-3 bg-gray-50 rounded-md">
              <p>{question.studentAnswer}</p>
            </div>
          </div>
        );
      
      case 'attachment':
        return (
          <div className="space-y-1">
            <p className="font-medium">Fichier soumis:</p>
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
          <p>Chargement des données de l'examen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{exam.title} - Correction</h1>
          <p className="text-gray-600">Évaluez les soumissions des étudiants et fournissez des commentaires.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Soumissions des étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Date de soumission</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{formatDate(student.submittedAt)}</TableCell>
                    <TableCell>
                      {student.status === "graded" ? (
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                          Corrigé
                        </span>
                      ) : (
                        <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">
                          À évaluer
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{student.grade || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewSubmission(student)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Évaluation de {selectedStudent?.name}
              </DialogTitle>
              <DialogDescription>
                Examinez les réponses et ajoutez des commentaires pour chaque question.
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="responses">
                  <FileText className="mr-2 h-4 w-4" />
                  Réponses
                </TabsTrigger>
                <TabsTrigger value="surveillance">
                  <Logs className="mr-2 h-4 w-4" />
                  Journal de surveillance
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="responses" className="space-y-6 py-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        {question.correct !== undefined && (
                          <div className={`flex items-center gap-1 ${question.correct ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"} px-2 py-1 rounded text-xs`}>
                            {question.correct ? "Correct" : "Incorrect"}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 mt-2">{question.text}</p>
                    </CardHeader>
                    <CardContent>
                      {renderAnswer(question)}
                      
                      <div className="mt-4">
                        {currentFeedback && currentFeedback.questionId === question.id ? (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Ajouter un commentaire pour l'étudiant..."
                              value={currentFeedback.text}
                              onChange={(e) => setCurrentFeedback({...currentFeedback, text: e.target.value})}
                              className="w-full"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setCurrentFeedback(null)}
                              >
                                Annuler
                              </Button>
                              <Button 
                                size="sm"
                                onClick={handleSaveFeedback}
                              >
                                Enregistrer
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="border rounded-md p-3">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">Commentaire:</p>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleOpenFeedback(question.id, question.feedback || "")}
                              >
                                Modifier
                              </Button>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {question.feedback || "Aucun commentaire ajouté."}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="surveillance" className="py-4">
                {selectedStudent && (
                  <SurveillanceLogs studentId={selectedStudent.id} examId={examId || ""} />
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Fermer
              </Button>
              <Button onClick={handleSubmitGrading}>
                Soumettre l'évaluation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GradeExam;