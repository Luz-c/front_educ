import React, { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const GradeSettingsDialog = ({
    open,
    onOpenChange,
    totalPoints,
    gradeScale,
    onSave
}) => {
    const [scales, setScales] = useState(gradeScale);

    const handleChange = (grade, value) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
            setScales({
                ...scales,
                [grade]: numValue
            });
        }
    };

    const handleSave = () => {
        // Validate that the scale is in descending order
        const { A, B, C, D, E } = scales;
        if (A > B && B > C && C > D && D > E) {
            onSave(scales);
            onOpenChange(false);
        } else {
            alert("Les pourcentages doivent être en ordre décroissant: A > B > C > D > E");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configuration des notes</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-gray-600 mb-4">
                        Définissez le pourcentage minimum requis pour chaque note. 
                        Total des points pour l'examen: <span className="font-bold">{totalPoints}</span>
                    </p>

                    {Object.keys(scales).map((grade) => (
                        <div key={grade} className="grid grid-cols-12 items-center gap-4 mb-3">
                            <Label className="col-span-1">{grade}:</Label>
                            <Input 
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={scales[grade]}
                                onChange={(e) => handleChange(grade, e.target.value)}
                                className="col-span-3"
                            />
                            <span className="col-span-1">%</span>
                            <div className="col-span-7 bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div 
                                    className="bg-primary h-full" 
                                    style={{ width: `${scales[grade]}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="mt-4 text-sm">
                        <p className="font-medium mb-1">Barème:</p>
                        <ul className="space-y-1 text-gray-600">
                            <li>A: ≥ {scales.A}% (≥ {Math.ceil(totalPoints * scales.A / 100)} points)</li>
                            <li>B: ≥ {scales.B}% (≥ {Math.ceil(totalPoints * scales.B / 100)} points)</li>
                            <li>C: ≥ {scales.C}% (≥ {Math.ceil(totalPoints * scales.C / 100)} points)</li>
                            <li>D: ≥ {scales.D}% (≥ {Math.ceil(totalPoints * scales.D / 100)} points)</li>
                            <li>E: ≥ {scales.E}% (≥ {Math.ceil(totalPoints * scales.E / 100)} points)</li>
                            <li>F: &lt; {scales.E}% (&lt; {Math.ceil(totalPoints * scales.E / 100)} points)</li>
                        </ul>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Annuler
                    </Button>
                    <Button onClick={handleSave}>
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GradeSettingsDialog;
