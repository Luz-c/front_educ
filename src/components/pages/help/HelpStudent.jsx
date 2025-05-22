import React from "react";
import Navbar from "../../navbar/NavbarStudent";

export const Help = () => (
    <div className="space-y-4">
        <p className="text-gray-600">
            En tant qu'étudiant, vous pouvez voir vos examens à venir, passer des examens, 
            et consulter vos résultats.
        </p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Utilisez le "Dashboard" pour voir les examens disponibles</li>
            <li>Consultez vos résultats après avoir passé un examen</li>
            <li>Gérez votre profil dans la section "Profil"</li>
        </ul>
    </div>
);

export const StudentHelp = () => (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-4">Aide et Support</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-3">Comment utiliser la plateforme</h2>
                <p className="text-gray-600">
                    Bienvenue sur la plateforme d'examens en ligne. Voici quelques conseils pour vous aider à naviguer.
                </p>
                <div className="mt-4">
                    <Help />
                </div>
            </div>
        </div>
    </div>
);

export default StudentHelp;