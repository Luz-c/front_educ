
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "../lib/utils";

const QuestionForm = ({ 
  type, 
  onCancel, 
  onSave,
  initialData,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [points, setPoints] = useState(1);
  const [allowedFileTypes, setAllowedFileTypes] = useState(["pdf", "doc", "docx", "jpg", "png"]);

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      setQuestionText(initialData.text || "");
      setOptions(initialData.options || ["", ""]);
      setCorrectAnswers(initialData.correctAnswers || []);
      setPoints(initialData.points || 1);
      setAllowedFileTypes(initialData.allowedFileTypes || ["pdf", "doc", "docx", "jpg", "png"]);
    }
  }, [initialData]);

  const getQuestionTypeTitle = () => {
    switch (type) {
      case "multiple-choice":
        return "Choix multiple";
      case "single-answer":
        return "Simple réponse";
      case "free-text":
        return "Texte libre";
      case "attachment":
        return "L'élève répond avec une pièce jointe";
      case "info-block":
        return "Bloc d'information";
      default:
        return "Nouvelle question";
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    
    // Update correct answers if needed
    setCorrectAnswers(correctAnswers.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const toggleCorrectAnswer = (index) => {
    if (type === "multiple-choice") {
      // For multiple choice, we allow multiple correct answers
      if (correctAnswers.includes(index)) {
        setCorrectAnswers(correctAnswers.filter(i => i !== index));
      } else {
        setCorrectAnswers([...correctAnswers, index]);
      }
    } else {
      // For single answer, we only allow one correct answer
      setCorrectAnswers([index]);
    }
  };

  const toggleFileType = (fileType) => {
    if (allowedFileTypes.includes(fileType)) {
      setAllowedFileTypes(allowedFileTypes.filter(type => type !== fileType));
    } else {
      setAllowedFileTypes([...allowedFileTypes, fileType]);
    }
  };

  const handleSave = () => {
    // Validate the form
    if (questionText.trim() === "") {
      alert("Veuillez saisir le texte de la question.");
      return;
    }

    if ((type === "multiple-choice" || type === "single-answer") && 
        (options.some(opt => opt.trim() === "") || correctAnswers.length === 0)) {
      alert("Veuillez remplir toutes les options et sélectionner au moins une bonne réponse.");
      return;
    }

    if (type === "attachment" && allowedFileTypes.length === 0) {
      alert("Veuillez sélectionner au moins un type de fichier autorisé.");
      return;
    }

    onSave({
      id: initialData?.id || Date.now().toString(),
      type,
      text: questionText,
      options: type === "multiple-choice" || type === "single-answer" ? options : undefined,
      correctAnswers: type === "multiple-choice" || type === "single-answer" ? correctAnswers : undefined,
      points,
      allowedFileTypes: type === "attachment" ? allowedFileTypes : undefined
    });
  };

  const renderOptionFields = () => {
    if (type === "multiple-choice" || type === "single-answer") {
      return (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Options</p>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type={type === "multiple-choice" ? "checkbox" : "radio"}
                checked={correctAnswers.includes(index)}
                onChange={() => toggleCorrectAnswer(index)}
                className="rounded"
              />
              <Input 
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1"
              />
              {options.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeOption(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addOption} 
            className="mt-2"
          >
            Ajouter une option
          </Button>
        </div>
      );
    }

    if (type === "free-text") {
      return (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Aperçu de la réponse</p>
          <Textarea 
            disabled
            placeholder="L'étudiant pourra saisir sa réponse ici"
            className="bg-gray-50"
          />
        </div>
      );
    }

    if (type === "attachment") {
      const fileTypes = [
        { label: "PDF", value: "pdf" },
        { label: "Word (DOC)", value: "doc" },
        { label: "Word (DOCX)", value: "docx" },
        { label: "Image (JPG)", value: "jpg" },
        { label: "Image (PNG)", value: "png" },
        { label: "Excel (XLS)", value: "xls" },
        { label: "Excel (XLSX)", value: "xlsx" },
        { label: "PowerPoint (PPT)", value: "ppt" },
        { label: "PowerPoint (PPTX)", value: "pptx" },
      ];
      
      return (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Types de fichiers autorisés</p>
          <div className="flex flex-wrap gap-2">
            {fileTypes.map((type) => (
              <Button
                key={type.value}
                type="button"
                size="sm"
                variant={allowedFileTypes.includes(type.value) ? "default" : "outline"}
                onClick={() => toggleFileType(type.value)}
                className={cn(
                  "text-xs",
                  allowedFileTypes.includes(type.value) ? "bg-primary" : ""
                )}
              >
                {type.label}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">L'étudiant pourra téléverser un fichier du type sélectionné.</p>
          </div>
        </div>
      );
    }

    if (type === "info-block") {
      return null; // No options for info blocks
    }

    return null;
  };

  return (
    <div className="p-6 border-t border-gray-200">
      <h2 className="text-lg font-medium mb-4">{getQuestionTypeTitle()}</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Question</p>
          <Textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Saisissez le texte de votre question ici..."
            rows={3}
          />
        </div>
        
        {renderOptionFields()}
        
        {type !== "info-block" && (
          <div className="mt-4">
            <Label htmlFor="points" className="text-sm font-medium">Points</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id="points"
                type="number"
                min="0"
                step="0.5"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-500">point{points !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
