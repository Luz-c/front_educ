import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Eye, Camera, Clock } from "lucide-react";

const MonitoringOptions = () => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [preventCopy, setPreventCopy] = useState(false);
  const [preventTabSwitch, setPreventTabSwitch] = useState(false);
  const [requireFullScreen, setRequireFullScreen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Options de surveillance
        </CardTitle>
        <CardDescription>
          Définissez les paramètres de surveillance pour votre examen
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Capture vidéo et écran</h3>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="webcam">Activer la webcam</Label>
              <p className="text-sm text-muted-foreground">
                Les étudiants devront autoriser l'accès à leur webcam
              </p>
            </div>
            <Switch 
              id="webcam" 
              checked={webcamEnabled} 
              onCheckedChange={setWebcamEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screenshare">Partage d'écran</Label>
              <p className="text-sm text-muted-foreground">
                Les étudiants devront partager leur écran pendant l'examen
              </p>
            </div>
            <Switch 
              id="screenshare" 
              checked={screenShareEnabled} 
              onCheckedChange={setScreenShareEnabled}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Limites de temps</h3>
          <Separator />
          
          <div className="grid gap-2">
            <Label htmlFor="time-limit">Durée de l'examen (minutes)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="time-limit"
                type="number"
                min={1}
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 60)}
              />
              <Select defaultValue="minutes">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Unité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sécurité</h3>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="shuffle">Mélanger les questions</Label>
              <p className="text-sm text-muted-foreground">
                L'ordre des questions sera différent pour chaque étudiant
              </p>
            </div>
            <Switch 
              id="shuffle" 
              checked={shuffleQuestions} 
              onCheckedChange={setShuffleQuestions}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="prevent-copy">Empêcher le copier/coller</Label>
              <p className="text-sm text-muted-foreground">
                Les étudiants ne pourront pas copier ou coller du contenu
              </p>
            </div>
            <Switch 
              id="prevent-copy" 
              checked={preventCopy} 
              onCheckedChange={setPreventCopy}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="prevent-tab-switch">Empêcher le changement d'onglet</Label>
              <p className="text-sm text-muted-foreground">
                L'examen se met en pause si l'étudiant change d'onglet ou de fenêtre
              </p>
            </div>
            <Switch 
              id="prevent-tab-switch" 
              checked={preventTabSwitch} 
              onCheckedChange={setPreventTabSwitch}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="full-screen">Mode plein écran obligatoire</Label>
              <p className="text-sm text-muted-foreground">
                L'examen doit être effectué en mode plein écran
              </p>
            </div>
            <Switch 
              id="full-screen" 
              checked={requireFullScreen} 
              onCheckedChange={setRequireFullScreen}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringOptions;