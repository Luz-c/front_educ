import React from "react";
import Navbar from "../../navbar/Navbar";

export const Help = () => (
    <div className="space-y-4">
        <p className="text-gray-600">
            En tant que professeur, vous pouvez créer de nouveaux examens, gérer les examens existants, 
            et consulter les résultats des étudiants.
        </p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Utilisez "Nouvel examen" pour créer un examen</li>
            <li>Consultez "Examens" pour voir tous vos examens</li>
            <li>Gérez votre profil dans la section "Profil"</li>
        </ul>
    </div>
);

export const TeacherHelp = () => (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-4">Aide et Support</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">Comment utiliser la plateforme</h2>
                <p className="text-gray-600">
                    Cette section vous guide à travers les fonctionnalités principales de la plateforme.
                    </p>
                <div className="mt-4">
                    <Help />
                </div>
            </div>
        </div>
    </div>
);

export default TeacherHelp;