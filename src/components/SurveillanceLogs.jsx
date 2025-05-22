import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Logs, Search, ClipboardList } from "lucide-react";
import { Badge } from "./ui/badge";

const SurveillanceLogs = ({ studentId, examId }) => {
    const mockLogs = [
        {
            id: "log1",
            timestamp: "2025-05-15T14:32:10",
            type: "info",
            message: "L'étudiant a commencé l'examen"
        },
        {
            id: "log2",
            timestamp: "2025-05-15T14:35:22",
            type: "warning",
            message: "Changement d'onglet détecté"
        },
        {
            id: "log3",
            timestamp: "2025-05-15T14:40:15",
            type: "warning",
            message: "Copier/coller détecté dans la zone de réponse"
        },
        {
            id: "log4",
            timestamp: "2025-05-15T14:45:45",
            type: "info",
            message: "Capture d'écran périodique enregistrée"
        },
        {
            id: "log5",
            timestamp: "2025-05-15T14:50:12",
            type: "error",
            message: "Perte de la connexion webcam pendant 15 secondes"
        },
        {
            id: "log6",
            timestamp: "2025-05-15T15:10:30",
            type: "info",
            message: "50% de l'examen complété"
        },
        {
            id: "log7",
            timestamp: "2025-05-15T15:30:45",
            type: "warning",
            message: "Détection d'une autre personne dans le champ de la webcam"
        },
        {
            id: "log8",
            timestamp: "2025-05-15T16:15:00",
            type: "info",
            message: "L'étudiant a soumis l'examen"
        }
    ];

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getLogIcon = (type) => {
        switch (type) {
            case "warning":
                return <Search className="h-4 w-4 text-amber-500" />;
            case "error":
                return <ClipboardList className="h-4 w-4 text-red-500" />;
            default:
                return <Logs className="h-4 w-4 text-blue-500" />;
        }
    };

    const getLogColor = (type) => {
        switch (type) {
            case "warning":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "error":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-blue-50 text-blue-700 border-blue-200";
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Logs className="h-5 w-5" />
                    Journal de surveillance
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {mockLogs.map((log) => (
                    <Alert key={log.id} className={`border ${getLogColor(log.type)}`}>
                        <div className="flex justify-between items-start">
                            <AlertTitle className="flex items-center gap-2">
                                {getLogIcon(log.type)}
                                <span className="font-medium">{log.type === "warning" ? "Avertissement" : log.type === "error" ? "Alerte" : "Information"}</span>
                            </AlertTitle>
                            <Badge variant="outline" className="text-xs font-normal">
                                {formatTime(log.timestamp)}
                            </Badge>
                        </div>
                        <AlertDescription className="mt-1">
                            {log.message}
                        </AlertDescription>
                    </Alert>
                ))}
            </CardContent>
        </Card>
    );
};

export default SurveillanceLogs;
