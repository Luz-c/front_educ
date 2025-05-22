import React, { useState } from "react";
import { Eye, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import QuestionTypeSelector from "../QuestionTypeSelector";
import QuestionForm, { QuestionData } from "../QuestionForm";
import QuestionList from "../QuestionList";
import GradeSettingsDialog, { GradeScale } from "../GradeSettingsDialog";
import { useNavigate } from "react-router-dom";

const ExamCreator = () => {
    const navigate = useNavigate();
    const [examName, setExamName] = useState("");
    const [selectedQuestionType, setSelectedQuestionType] = useState(undefined);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [gradeSettingsOpen, setGradeSettingsOpen] = useState(false);
    const [gradeScale, setGradeScale] = useState({
        A: 90,
        B: 80,
        C: 70,
        D: 60,
        E: 50,
    });

    const handleQuestionTypeSelect = (type) => {
        setSelectedQuestionType(type);
        setEditingQuestionId(null);
    };

    const handleCancelQuestion = () => {
        setSelectedQuestionType(undefined);
        setEditingQuestionId(null);
    };

    const handleSaveQuestion = (question) => {
        if (editingQuestionId) {
            // Update existing question
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q.id === editingQuestionId ? question : q))
            );
        } else {
            // Add new question
            setQuestions((prevQuestions) => [...prevQuestions, question]);
        }

        setSelectedQuestionType(undefined);
        setEditingQuestionId(null);
    };

    const handleEditQuestion = (id) => {
        const questionToEdit = questions.find((q) => q.id === id);
        if (questionToEdit) {
            setSelectedQuestionType(questionToEdit.type);
            setEditingQuestionId(id);
        }
    };

    const handleDeleteQuestion = (id) => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    };

    const getTotalPoints = () => {
        return questions.reduce(
            (sum, question) =>
                question.type !== "info-block" ? sum + (question.points || 0) : sum,
            0
        );
    };

    const handleSaveGradeScale = (newScale) => {
        setGradeScale(newScale);
        setGradeSettingsOpen(false);
    };

    const handleNavigateToConfig = () => {
        const tempExamId = `temp-${Date.now()}`;

        const examData = {
            id: tempExamId,
            title: examName || "Nouvel examen",
            questions,
            gradeScale,
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem(`exam-draft-${tempExamId}`, JSON.stringify(examData));

        navigate(`/exam-config/${tempExamId}`);
    };

    const currentlyEditingQuestion = editingQuestionId
        ? questions.find((q) => q.id === editingQuestionId)
        : null;

    return (
        <div className="bg-gray-100 p-4 flex-1 min-h-[calc(100vh-3.5rem)]">
            <div className="max-w-5xl mx-auto bg-white rounded shadow-sm">
                <div className="p-4 flex items-center gap-4">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Saisir le nom de l'examen"
                            value={examName}
                            onChange={(e) => setExamName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Eye className="w-5 h-5 text-gray-600" />
                        </Button>
                        <Button
                            className="flex items-center gap-2 bg-[#18222e] text-white"
                            onClick={handleNavigateToConfig}
                        >
                            Configurer
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>
                </div>

                {!selectedQuestionType && questions.length > 0 && (
                    <QuestionList
                        questions={questions}
                        onEdit={handleEditQuestion}
                        onDelete={handleDeleteQuestion}
                        onGradeSettings={() => setGradeSettingsOpen(true)}
                    />
                )}

                {selectedQuestionType ? (
                    <QuestionForm
                        type={selectedQuestionType}
                        onCancel={handleCancelQuestion}
                        onSave={handleSaveQuestion}
                        initialData={currentlyEditingQuestion}
                    />
                ) : (
                    questions.length === 0 && (
                        <QuestionTypeSelector onSelectType={handleQuestionTypeSelect} />
                    )
                )}
            </div>

            <GradeSettingsDialog
                open={gradeSettingsOpen}
                onOpenChange={setGradeSettingsOpen}
                totalPoints={getTotalPoints()}
                gradeScale={gradeScale}
                onSave={handleSaveGradeScale}
            />
        </div>
    );
};

export default ExamCreator;
