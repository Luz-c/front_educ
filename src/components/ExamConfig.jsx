import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { useToast } from "../hook/use-toast";
import { FileText, Settings, User, UserPlus, Mail, Eye } from "lucide-react";
import MonitoringOptions from "./exam-config/MonitoringOptions";
import StudentAccess from "./exam-config/StudentAccess";
import CompositionNumbers from "./exam-config/CompositionNumbers";

const ExamConfig = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [examData, setExamData] = useState(null);
    const [activeTab, setActiveTab] = useState("monitoring");
    const [isLoading, setIsLoading] = useState(false);
    
    // Load exam data from localStorage
    useEffect(() => {
        if (examId) {
            const storedData = localStorage.getItem(`exam-draft-${examId}`);
            if (storedData) {
                setExamData(JSON.parse(storedData));
            }
        }
    }, [examId]);

    const handleSaveConfig = () => {
        setIsLoading(true);
        
        // Simulate saving configuration to backend
        setTimeout(() => {
            setIsLoading(false);
            
            toast({
                title: "Configuration enregistrée",
                description: "Les paramètres de l'examen ont été mis à jour avec succès.",
            });
            
            // Navigate back to exam creator
            navigate("/");
        }, 1000);
    };

    if (!examData) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto py-8 px-4">
                    <p>Chargement de la configuration...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{examData.title} - Configuration</h1>
                        <p className="text-gray-600 mt-1">Configurez les options de surveillance et d'accès pour votre examen</p>
                    </div>
                    <Button onClick={handleSaveConfig} disabled={isLoading}>
                        {isLoading ? "Enregistrement..." : "Enregistrer les paramètres"}
                    </Button>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="monitoring">
                            <Settings className="mr-2 h-4 w-4" />
                            Surveillance
                        </TabsTrigger>
                        <TabsTrigger value="students">
                            <Mail className="mr-2 h-4 w-4" />
                            Notification des élèves
                        </TabsTrigger>
                        <TabsTrigger value="access">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Numéros de composition
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="monitoring" className="space-y-4">
                        <MonitoringOptions />
                    </TabsContent>
                    
                    <TabsContent value="students" className="space-y-4">
                        <StudentAccess />
                    </TabsContent>
                    
                    <TabsContent value="access" className="space-y-4">
                        <CompositionNumbers />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ExamConfig;
