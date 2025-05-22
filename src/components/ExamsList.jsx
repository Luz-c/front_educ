import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Clock, User, Settings, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mockExams = [
    {
        id: "1",
        title: "Introduction à la Programmation",
        createdAt: "2025-05-10T10:30:00",
        questions: 15,
        duration: 60,
        submissions: 24
    },
    {
        id: "2",
        title: "Mathématiques Fondamentales",
        createdAt: "2025-05-05T14:15:00",
        questions: 20,
        duration: 90,
        submissions: 18
    },
    {
        id: "3",
        title: "Bases de Données SQL",
        createdAt: "2025-04-28T09:00:00",
        questions: 12,
        duration: 45,
        submissions: 22
    },
    {
        id: "4",
        title: "Algorithmes et Structures de Données",
        createdAt: "2025-04-20T13:45:00",
        questions: 25,
        duration: 120,
        submissions: 20
    }
];

const ExamsList = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);

    useEffect(() => {
        // In a real application, we would fetch the professor's exams from the backend
        // For now, we'll use mock data or localStorage
        const storedExams = localStorage.getItem('professorExams');
        
        if (!storedExams) {
            // Initialize localStorage with mock data if it doesn't exist
            localStorage.setItem('professorExams', JSON.stringify(mockExams));
            setExams(mockExams);
        } else {
            // Load exams from localStorage
            setExams(JSON.parse(storedExams));
        }
    }, []);

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleExamDetails = (examId) => {
        navigate(`/grade-exam/${examId}`);
    };

    const handleEditExam = (examId) => {
        navigate(`/exam-config/${examId}`);
    };

    const handlePreviewExam = (examId) => {
        navigate(`/exam/${examId}`);
    };

    const handleCreateNewExam = () => {
        navigate('/teacher-dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Mes examens</h1>
                        <p className="text-gray-600">Gérez vos examens et consultez les soumissions.</p>
                    </div>
                    <Button onClick={handleCreateNewExam} className="bg-[#00b334]">
                        Créer un nouvel examen
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map((exam) => (
                        <Card key={exam.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">{exam.title}</CardTitle>
                                <CardDescription className="pt-2">
                                    Créé le {getFormattedDate(exam.createdAt)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-sm mb-4">
                                    <div>
                                        <p className="text-gray-500">Questions</p>
                                        <p className="font-medium">{exam.questions}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Durée</p>
                                        <p className="font-medium">{exam.duration} minutes</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Soumissions</p>
                                        <p className="font-medium">{exam.submissions}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleExamDetails(exam.id)}
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    Soumissions
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditExam(exam.id)}
                                >
                                    <Settings className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handlePreviewExam(exam.id)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExamsList;
