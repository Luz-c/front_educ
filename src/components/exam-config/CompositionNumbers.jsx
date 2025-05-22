import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../../hook/use-toast";
import { UserPlus, Download, Copy, RefreshCw, Trash2 } from "lucide-react";

const CompositionNumbers = () => {
  const { toast } = useToast();
  const [compositionNumbers, setCompositionNumbers] = useState([]);
  const [requireStudentInfo, setRequireStudentInfo] = useState(true);
  const [prefix, setPrefix] = useState("EXAM");
  const [quantity, setQuantity] = useState(10);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  
  // Generate random composition numbers
  const generateCompositionNumbers = () => {
    const newNumbers = [];
    
    for (let i = 0; i < quantity; i++) {
      // Generate a random 6-digit number
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const number = `${prefix}-${randomNum}`;
      
      newNumbers.push({
        id: `comp-${Date.now()}-${i}`,
        number,
        used: false
      });
    }
    
    setCompositionNumbers([...compositionNumbers, ...newNumbers]);
    
    toast({
      title: "Numéros de composition générés",
      description: `${quantity} nouveaux numéros ont été générés avec succès.`
    });
  };
  
  const handleDeleteNumber = (id) => {
    setCompositionNumbers(compositionNumbers.filter(n => n.id !== id));
  };
  
  const handleCopyNumber = (number) => {
    navigator.clipboard.writeText(number);
    
    toast({
      title: "Copié dans le presse-papier",
      description: `Le numéro ${number} a été copié.`
    });
  };
  
  // Preview of the student registration form
  const StudentRegistrationForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="student-name">Nom</Label>
        <Input id="student-name" placeholder="Entrez votre nom" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="student-firstname">Prénom</Label>
        <Input id="student-firstname" placeholder="Entrez votre prénom" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="student-email">Adresse email</Label>
        <Input id="student-email" type="email" placeholder="Entrez votre email" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="composition-number">Numéro de composition</Label>
        <Input id="composition-number" placeholder="Entrez votre numéro de composition" />
      </div>
    </div>
  );
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Numéros de composition
          </CardTitle>
          <CardDescription>
            Générez des numéros de composition que les étudiants utiliseront pour accéder à l'examen
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-info">Demander les informations d'identification</Label>
              <p className="text-sm text-muted-foreground">
                Les étudiants devront saisir leur nom, prénom et email avant d'accéder à l'examen
              </p>
            </div>
            <Switch 
              id="require-info" 
              checked={requireStudentInfo} 
              onCheckedChange={setRequireStudentInfo}
            />
          </div>
          
          <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Aperçu du formulaire d'identification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Formulaire d'identification</DialogTitle>
                <DialogDescription>
                  Les étudiants devront remplir ce formulaire avant d'accéder à l'examen.
                </DialogDescription>
              </DialogHeader>
              
              <StudentRegistrationForm />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setRegistrationDialogOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prefix">Préfixe</Label>
              <Input
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="EXAM"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 10)}
              />
            </div>
          </div>
          
          <Button onClick={generateCompositionNumbers} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Générer des numéros de composition
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des numéros de composition</CardTitle>
          <CardDescription>
            {compositionNumbers.length === 0 
              ? "Aucun numéro généré pour l'instant" 
              : `${compositionNumbers.length} numéros générés (${compositionNumbers.filter(n => n.used).length} utilisés)`}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {compositionNumbers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numéro</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Utilisé par</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {compositionNumbers.map((compNumber) => (
                    <TableRow key={compNumber.id}>
                      <TableCell className="font-mono">{compNumber.number}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          compNumber.used 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {compNumber.used ? "Utilisé" : "Disponible"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {compNumber.usedBy 
                          ? `${compNumber.usedBy} (${compNumber.email})` 
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleCopyNumber(compNumber.number)}
                            title="Copier"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteNumber(compNumber.id)}
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Aucun numéro de composition généré</p>
              <p className="text-sm mt-2">Utilisez le formulaire ci-dessus pour générer des numéros</p>
            </div>
          )}
        </CardContent>
        
        {compositionNumbers.length > 0 && (
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter en CSV
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => setCompositionNumbers([])}
            >
              Effacer tous les numéros
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default CompositionNumbers;
