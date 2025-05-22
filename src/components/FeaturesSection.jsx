import { 
  LayoutGrid, 
  Send, 
  ShieldAlert, 
  ListChecks, 
  BarChart3, 
  Smartphone 
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] reveal">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: LayoutGrid,
      title: "Créer des examens interactifs",
      description: "Concevez des QCM, questions ouvertes, et exercices interactifs avec notre éditeur simple."
    },
    {
      icon: Send,
      title: "Attribution automatique",
      description: "Planifiez et distribuez les examens à tous vos étudiants en quelques clics."
    },
    {
      icon: ShieldAlert,
      title: "Détection de triche",
      description: "Surveillez les comportements suspects grâce à notre technologie de proctoring intelligent."
    },
    {
      icon: ListChecks,
      title: "Classement automatique",
      description: "Notez automatiquement les examens et générez des rapports de performance détaillés."
    },
    {
      icon: BarChart3,
      title: "Dashboard intelligent",
      description: "Visualisez les progrès et identifiez les points à améliorer avec nos analyses avancées."
    },
    {
      icon: Smartphone,
      title: "Support mobile + desktop",
      description: "Utilisez notre plateforme sur tous les appareils, de manière fluide et responsive."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-12 reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Fonctionnalités clés</h2>
          <p className="text-muted-foreground">Tout ce dont vous avez besoin pour créer, gérer et analyser vos examens à distance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
