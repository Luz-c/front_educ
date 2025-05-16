import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import QuestionTypeSelector from "../QuestionTypeSelector";
import QuestionForm from "../QuestionForm";
import QuestionList from "../QuestionList";
import GradeSettingsDialog from "../GradeSettingsDialog";

const ExamCreator = () => {
    const [examName, setExamName] = useState("");
    const [selectedQuestionType, setSelectedQuestionType] = useState(null);
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

    // Handle selecting a question type
    const handleQuestionTypeSelect = (type) => {
        setSelectedQuestionType(type);
        setEditingQuestionId(null);
    };

    // Handle canceling question creation or editing
    const handleCancelQuestion = () => {
        setSelectedQuestionType(null);
        setEditingQuestionId(null);
    };

    // Handle saving a question (new or edited)
    const handleSaveQuestion = (question) => {
        if (editingQuestionId) {
            setQuestions(
                questions.map((q) =>
                    q.id === editingQuestionId ? question : q
                )
            );
        } else {
            setQuestions([...questions, question]);
        }
        setSelectedQuestionType(null);
        setEditingQuestionId(null);
    };

    // Handle editing an existing question
    const handleEditQuestion = (id) => {
        const questionToEdit = questions.find((q) => q.id === id);
        if (questionToEdit) {
            setSelectedQuestionType(questionToEdit.type);
            setEditingQuestionId(id);
        }
    };

    // Handle deleting a question
    const handleDeleteQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    // Calculate total points for all questions
    const getTotalPoints = () => {
        return questions.reduce(
            (sum, question) =>
                question.type !== "info-block"
                    ? sum + (question.points || 0)
                    : sum,
            0
        );
    };

    // Handle saving grade scale
    const handleSaveGradeScale = (newScale) => {
        setGradeScale(newScale);
        setGradeSettingsOpen(false);
    };

    // Determine the currently editing question
    const currentlyEditingQuestion = editingQuestionId
        ? questions.find((q) => q.id === editingQuestionId)
        : null;

    return (
        <div className="bg-gray-100 p-4 flex-1 min-h-[calc(100vh-3.5rem)]">
            <div className="max-w-5xl mx-auto bg-white rounded shadow-sm">
                {/* Header: Exam Name Input */}
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
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                        >
                            <Eye className="w-5 h-5 text-gray-600" />
                        </Button>
                        <Button className="flex items-center gap-2 bg-[#18222e] text-white">
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

                {/* Questions List */}
                {questions.length > 0 && (
                    <QuestionList
                        questions={questions}
                        onEdit={handleEditQuestion}
                        onDelete={handleDeleteQuestion}
                        onGradeSettings={() => setGradeSettingsOpen(true)}
                    />
                )}

                {/* New Question Section */}
                <div className="p-4 border-t mt-4">
                    {selectedQuestionType ? (
                        <QuestionForm
                            type={selectedQuestionType}
                            onCancel={handleCancelQuestion}
                            onSave={handleSaveQuestion}
                            initialData={currentlyEditingQuestion}
                        />
                    ) : (
                        <QuestionTypeSelector
                            onSelectType={handleQuestionTypeSelect}
                        />
                    )}
                </div>
            </div>

            {/* Grade Settings Dialog */}
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