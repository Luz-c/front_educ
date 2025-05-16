import React from "react";
import { Edit, Trash, Check, FileText, Paperclip, MessageCircle, Settings } from "lucide-react";
import { Button } from "./ui/button";

const QuestionList = ({ questions, onEdit, onDelete, onGradeSettings }) => {
    const getQuestionTypeLabel = (type) => {
        switch (type) {
            case "multiple-choice":
                return "Choix multiple";
            case "single-answer":
                return "Simple réponse";
            case "free-text":
                return "Texte libre";
            case "attachment":
                return "Pièce jointe";
            case "info-block":
                return "Bloc d'information";
            default:
                return type;
        }
    };

    const getQuestionTypeIcon = (type) => {
        switch (type) {
            case "multiple-choice":
            case "single-answer":
                return <Check className="h-4 w-4" />;
            case "free-text":
                return <FileText className="h-4 w-4" />;
            case "attachment":
                return <Paperclip className="h-4 w-4" />;
            case "info-block":
                return <MessageCircle className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const getTotalPoints = () => {
        return questions.reduce((sum, question) => 
            question.type !== "info-block" ? (sum + (question.points || 0)) : sum, 0);
    };

    if (questions.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                Aucune question ajoutée. Sélectionnez un type de question pour commencer.
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Questions ({questions.length})</h2>
                <div className="flex items-center gap-4">
                    <div className="text-sm">
                        <span className="font-medium">Total des points: </span>
                        <span>{getTotalPoints()}</span>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={onGradeSettings}
                    >
                        <Settings className="h-4 w-4" />
                        <span>Configuration des notes</span>
                    </Button>
                </div>
            </div>
            
            {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-100 p-1 rounded">
                                {getQuestionTypeIcon(question.type)}
                            </div>
                            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                                {getQuestionTypeLabel(question.type)}
                            </span>
                            <span className="text-sm text-gray-500">Question {index + 1}</span>
                            {question.type !== "info-block" && (
                                <span className="text-sm font-medium">
                                    {question.points} point{question.points !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => onEdit(question.id)}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => onDelete(question.id)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm">{question.text}</p>
                    
                    {question.options && question.options.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2 text-sm">
                                    <input 
                                        type={question.type === "multiple-choice" ? "checkbox" : "radio"} 
                                        checked={question.correctAnswers?.includes(optIndex) || false}
                                        readOnly
                                        className="rounded"
                                    />
                                    <span>{option}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.type === "attachment" && question.allowedFileTypes && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500">Types de fichiers acceptés: </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {question.allowedFileTypes.map(type => (
                                    <span 
                                        key={type} 
                                        className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                                    >
                                        .{type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
