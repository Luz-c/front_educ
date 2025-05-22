import React from "react";
import Navbar from "../../navbar/NavbarStudent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { User } from "lucide-react";


export const ProfileStudent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Profil Étudiant</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <CardTitle>Alex KOUASSI</CardTitle>
                <CardDescription>Étudiant en L3</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span>etudiant@universite.bj</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Identifiant:</span>
                  <span>ETU-54321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Promotion:</span>
                  <span>2024-2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Résultats académiques</CardTitle>
              <CardDescription>Aperçu de vos performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Introduction à la Programmation</div>
                    <div className="text-sm text-gray-500">Mai 2025</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">A</div>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Mathématiques Fondamentales</div>
                    <div className="text-sm text-gray-500">Avril 2025</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">B+</div>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Bases de Données SQL</div>
                    <div className="text-sm text-gray-500">Mars 2025</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">A-</div>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Algorithmes et Structures de Données</div>
                    <div className="text-sm text-gray-500">Février 2025</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">A</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

