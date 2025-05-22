import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Est-ce sécurisé ?",
      answer: "Absolument. Notre plateforme utilise des technologies avancées de proctoring, avec vérification d'identité, détection des changements d'écran, et analyse des comportements suspects. Toutes les données sont chiffrées et nous respectons le RGPD."
    },
    {
      question: "Est-ce gratuit ?",
      answer: "Nous proposons une formule freemium. Vous pouvez utiliser les fonctionnalités de base gratuitement pour un nombre limité d'étudiants. Pour les établissements plus grands ou les fonctionnalités avancées, nous proposons des forfaits adaptés à chaque besoin."
    },
    {
      question: "Ça marche sur téléphone ?",
      answer: "Oui, notre plateforme est entièrement responsive et fonctionne sur tous les appareils : ordinateurs, tablettes et smartphones. Les étudiants peuvent passer leurs examens sur l'appareil de leur choix, avec une expérience optimisée."
    },
    {
      question: "Et en cas de coupure ?",
      answer: "Notre système sauvegarde automatiquement les réponses en temps réel. En cas de coupure internet ou de problème technique, l'étudiant peut reprendre exactement là où il s'était arrêté une fois la connexion rétablie. Un système d'alerte notifie également le surveillant en cas de déconnexion."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-12 reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Questions fréquentes</h2>
          <p className="text-muted-foreground">Tout ce que vous devez savoir sur notre plateforme d'examens en ligne.</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4 reveal">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden mb-4">
                <AccordionTrigger className="flex items-center justify-between bg-card px-4 py-4 text-lg font-medium">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t px-4 py-4 text-muted-foreground">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
