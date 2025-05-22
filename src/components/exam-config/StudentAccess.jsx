import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Mail, Plus, Trash2, FileText } from "lucide-react";
import { useToast } from "../../hook/use-toast";

const StudentAccess = () => {
  const { toast } = useToast();
  const [studentEmails, setStudentEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [emailSubject, setEmailSubject] = useState("Invitation à l'examen");
  const [emailTemplate, setEmailTemplate] = useState(`Bonjour,

Vous êtes invité(e) à passer l'examen [NOM_EXAMEN].

Date: [DATE_EXAMEN]
Durée: [DUREE_EXAMEN] minutes

Veuillez cliquer sur le lien ci-dessous pour accéder à l'examen:
[LIEN_EXAMEN]

Cordialement,
L'équipe pédagogique`);

  const handleAddEmail = () => {
    if (!newEmail.trim()) return;
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez saisir une adresse email valide.",
        variant: "destructive"
      });
      return;
    }
    
    if (studentEmails.includes(newEmail)) {
      toast({
        title: "Email déjà ajouté",
        description: "Cette adresse est déjà dans la liste.",
        variant: "destructive"
      });
      return;
    }
    
    setStudentEmails([...studentEmails, newEmail]);
    setNewEmail("");
  };

  const handleRemoveEmail = (emailToRemove) => {
    setStudentEmails(studentEmails.filter(email => email !== emailToRemove));
  };

  const handleProcessBulkEmails = () => {
    if (!bulkEmails.trim()) return;
    
    const emailList = bulkEmails
      .split(/[\n,;]/) // Split by newline, comma or semicolon
      .map(e => e.trim())
      .filter(e => e !== "");
    
    // Simple email validation for each
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmails = emailList.filter(email => emailRegex.test(email));
    
    // Add only new emails
    const newEmails = validEmails.filter(email => !studentEmails.includes(email));
    
    if (newEmails.length > 0) {
      setStudentEmails([...studentEmails, ...newEmails]);
      setBulkEmails("");
      
      toast({
        title: "Emails ajoutés avec succès",
        description: `${newEmails.length} nouvelles adresses ont été ajoutées.`
      });
    } else {
      toast({
        title: "Aucun nouvel email",
        description: "Aucune nouvelle adresse email valide n'a été trouvée.",
        variant: "destructive"
      });
    }
  };

  const handleSendInvitations = () => {
    if (studentEmails.length === 0) {
      toast({
        title: "Aucun destinataire",
        description: "Veuillez ajouter au moins une adresse email.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulation de l'envoi
    toast({
      title: "Invitations envoyées",
      description: `${studentEmails.length} invitations ont été envoyées avec succès.`
    });
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Liste des étudiants
          </CardTitle>
          <CardDescription>
            Ajoutez les adresses email des étudiants qui peuvent accéder à l'examen
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Adresse email de l'étudiant"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
            />
            <Button onClick={handleAddEmail}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
          
          <div className="rounded-md border p-2 h-40 overflow-y-auto">
            {studentEmails.length > 0 ? (
              <ul className="space-y-1">
                {studentEmails.map((email, index) => (
                  <li key={index} className="flex justify-between items-center py-1 px-2 hover:bg-muted/50 rounded">
                    <span>{email}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveEmail(email)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Aucune adresse email ajoutée
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Import par lots
          </CardTitle>
          <CardDescription>
            Copiez-collez plusieurs adresses email à la fois (séparées par des virgules, des points-virgules ou des sauts de ligne)
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Textarea
            placeholder="exemple1@email.com, exemple2@email.com, exemple3@email.com..."
            value={bulkEmails}
            onChange={(e) => setBulkEmails(e.target.value)}
            className="h-32"
          />
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleProcessBulkEmails}>
            Traiter les emails
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Modèle d'email d'invitation</CardTitle>
          <CardDescription>
            Personnalisez le message qui sera envoyé aux étudiants
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-subject">Sujet de l'email</Label>
            <Input
              id="email-subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email-template">Contenu de l'email</Label>
            <Textarea
              id="email-template"
              value={emailTemplate}
              onChange={(e) => setEmailTemplate(e.target.value)}
              className="h-48 font-mono text-sm"
            />
          </div>
          
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">Variables disponibles:</p>
            <ul className="text-xs mt-1 space-y-1">
              <li>[NOM_EXAMEN] - Le nom de l'examen</li>
              <li>[DATE_EXAMEN] - La date de l'examen</li>
              <li>[DUREE_EXAMEN] - La durée de l'examen en minutes</li>
              <li>[LIEN_EXAMEN] - Lien unique pour accéder à l'examen</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleSendInvitations}>
            Envoyer les invitations ({studentEmails.length})
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default StudentAccess;