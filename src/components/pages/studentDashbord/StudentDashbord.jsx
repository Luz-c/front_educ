import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { StudentNavbar } from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hook/use-toast";

const mockExams = [
    {
        id: "1",
        title: "Introduction à la Programmation",
        dueDate: "2025-05-20T23:59:59",
        status: "upcoming",
        questions: 15,
        duration: 60,
    },
    {
        id: "2",
        title: "Mathématiques Fondamentales",
        dueDate: "2025-05-18T23:59:59",
        status: "in-progress",
        questions: 20,
        duration: 90,
    },
    {
        id: "3",
        title: "Bases de Données SQL",
        dueDate: "2025-05-10T23:59:59",
        status: "completed",
        questions: 12,
        duration: 45,
    },
    {
        id: "4",
        title: "Algorithmes et Structures de Données",
        dueDate: "2025-05-05T23:59:59",
        status: "graded",
        questions: 25,
        duration: 120,
        grade: "A",
    },
];

const useExams = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const storedExams = localStorage.getItem("exams");
        if (!storedExams) {
            localStorage.setItem("exams", JSON.stringify(mockExams));
            setExams(mockExams);
        } else {
            setExams(JSON.parse(storedExams));
        }
    }, []);

    const updateExams = (updatedExams) => {
        setExams(updatedExams);
        localStorage.setItem("exams", JSON.stringify(updatedExams));
    };

    return { exams, updateExams };
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { exams, updateExams } = useExams();

    const getStatusBadge = (status) => {
        switch (status) {
            case "upcoming":
                return (
                    <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                        <Clock className="h-3 w-3" />
                        <span>À venir</span>
                    </div>
                );
            case "in-progress":
                return (
                    <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs">
                        <AlertTriangle className="h-3 w-3" />
                        <span>En cours</span>
                    </div>
                );
            case "completed":
                return (
                    <div className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-1 rounded text-xs">
                        <CheckCircle className="h-3 w-3" />
                        <span>Terminé</span>
                    </div>
                );
            case "graded":
                return (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                        <CheckCircle className="h-3 w-3" />
                        <span>Noté</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const handleStartExam = (exam) => {
        navigate(`/exam/${exam.id}`);
    };

    const handleContinueExam = (exam) => {
        navigate(`/exam/${exam.id}`);
    };

    const handleViewResults = (exam) => {
        navigate(`/exam-results/${exam.id}`);
    };

    const handleExamPreview = (exam) => {
        toast({
            title: "Aperçu de l'examen",
            description: `L'examen "${exam.title}" sera disponible le ${getFormattedDate(
                exam.dueDate
            )}.`,
        });
    };

    // Simulate auto-grading for completed exams
    const simulateGrading = () => {
        const updatedExams = exams.map((exam) => {
            if (exam.status === "completed") {
                const grades = ["A", "B", "C", "A-", "B+"];
                const randomGrade = grades[Math.floor(Math.random() * grades.length)];
                return { ...exam, status: "graded", grade: randomGrade };
            }
            return exam;
        });

        updateExams(updatedExams);

        toast({
            title: "Examens notés",
            description: "Les examens terminés ont été notés.",
        });
    };

    const getActionButton = (exam) => {
        switch (exam.status) {
            case "upcoming":
                return (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleExamPreview(exam)}
                    >
                        Aperçu
                    </Button>
                );
            case "in-progress":
                return (
                    <Button className="w-full" onClick={() => handleContinueExam(exam)}>
                        Continuer
                    </Button>
                );
            case "completed":
                return (
                    <Button disabled className="w-full">
                        En attente de notation
                    </Button>
                );
            case "graded":
                return (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleViewResults(exam)}
                    >
                        Voir les résultats
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <StudentNavbar />
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">
                            Tableau de bord étudiant
                        </h1>
                        <p className="text-gray-600">
                            Consultez vos examens à venir et vos résultats.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                const newExam = {
                                    id: `new-${Date.now()}`,
                                    title: "Nouvel Examen Test",
                                    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                                    status: "upcoming",
                                    questions: 10,
                                    duration: 45,
                                };

                                const updatedExams = [...exams, newExam];
                                updateExams(updatedExams);

                                toast({
                                    title: "Nouvel examen",
                                    description: "Un nouvel examen de test a été ajouté.",
                                });
                            }}
                        >
                            + Nouvel examen test
                        </Button>
                        <Button onClick={simulateGrading}>
                            Noter les examens terminés
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map((exam) => (
                        <Card key={exam.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                                    {getStatusBadge(exam.status)}
                                </div>
                                <CardDescription className="pt-2">
                                    À rendre le {getFormattedDate(exam.dueDate)}
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
                                        <p className="font-medium">
                                            {exam.duration} minutes
                                        </p>
                                    </div>
                                    {exam.grade && (
                                        <div>
                                            <p className="text-gray-500">Note</p>
                                            <p className="font-bold text-green-600">
                                                {exam.grade}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <FileText className="h-4 w-4 mr-2" />
                                    <span>Examen de cours</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                {getActionButton(exam)}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
