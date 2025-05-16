import React from "react";
import { 
    MessageCircle, 
    List, 
    AlignJustify, 
    FileText, 
    Paperclip
} from "lucide-react";

const QuestionType = ({ icon, label, automated = false, onClick }) => (
    <div 
        className="flex flex-col items-center p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
        onClick={onClick}
    >
        <div className="relative">
            {automated && (
                <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#2a333d] text-white text-xs flex items-center justify-center rounded">
                    A
                </div>
            )}
            <div className="w-12 h-12 rounded flex items-center justify-center">
                {icon}
            </div>
        </div>
        <span className="text-sm mt-2 text-center">{label}</span>
    </div>
);

const QuestionTypeSelector = ({ onSelectType }) => {
    return (
        <div className="p-6 border-t border-gray-200">
            <h2 className="text-lg font-medium mb-6">Nouvelle question</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <QuestionType 
                    icon={<MessageCircle className="w-6 h-6 text-gray-600" />} 
                    label="Bloc d'information" 
                    onClick={() => onSelectType("info-block")}
                />
                <QuestionType 
                    icon={<List className="w-6 h-6 text-gray-600" />} 
                    label="Choix multiple" 
                    automated={true}
                    onClick={() => onSelectType("multiple-choice")}
                />
                <QuestionType 
                    icon={<AlignJustify className="w-6 h-6 text-gray-600" />} 
                    label="Simple réponse" 
                    automated={true}
                    onClick={() => onSelectType("single-answer")}
                />
                <QuestionType 
                    icon={<FileText className="w-6 h-6 text-gray-600" />} 
                    label="Texte libre" 
                    onClick={() => onSelectType("free-text")}
                />
                <QuestionType 
                    icon={<Paperclip className="w-6 h-6 text-gray-600" />} 
                    label="L'élève répond avec une pièce jointe" 
                    onClick={() => onSelectType("attachment")}
                />
            </div>
        </div>
    );
};

export default QuestionTypeSelector;
