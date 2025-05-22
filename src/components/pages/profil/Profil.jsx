import React from "react";
import Navbar from "../../navbar/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { User } from "lucide-react";

export const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Profil Professeur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <CardTitle>Dr. Martin</CardTitle>
                <CardDescription>Département d'informatique</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span>prof@universite.bj</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Identifiant:</span>
                  <span>PROF-2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Statistiques d'examens</CardTitle>
              <CardDescription>Résumé de vos activités en tant que professeur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-500">Examens créés</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">342</div>
                  <div className="text-sm text-gray-500">Étudiants évalués</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-gray-500">Taux de réussite moyen</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600">4.2/5</div>
                  <div className="text-sm text-gray-500">Score de satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

