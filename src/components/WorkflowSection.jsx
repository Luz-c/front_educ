const WorkflowSection = () => {
  const steps = [
    {
      number: 1,
      title: "Connexion",
      description: "Authentification sécurisée"
    },
    {
      number: 2,
      title: "Lancement",
      description: "Démarrage de l'examen"
    },
    {
      number: 3,
      title: "Surveillance",
      description: "Monitoring en temps réel"
    },
    {
      number: 4,
      title: "Résultats",
      description: "Analyse automatique"
    }
  ];

  return (
    <section id="workflow" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-12 reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">L'élève compose. Vous gérez. La plateforme s'occupe du reste.</h2>
          <p className="text-muted-foreground">Un processus d'examen simplifié, de la préparation aux résultats.</p>
        </div>
        
        <div className="max-w-5xl mx-auto reveal">
          <div className="relative rounded-xl overflow-hidden border shadow-lg">
            <img 
              src="https://www.unicef.org/benin/sites/unicef.org.benin/files/styles/hero_extended/public/%C2%A9UNICEFBenin-Koklannou-Remise%20salles%20Num.%20Etp.%20Nati-24.01%20%28113%29.webp?itok=HuPvkBZu" 
              alt="Plateforme d'examen sécurisée avec surveillance" 
              className="w-full"
              width="1200"
              height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <span>{step.number}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block w-full md:w-auto md:h-0.5 bg-border flex-1 my-2 md:my-0"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
