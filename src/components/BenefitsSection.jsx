import { Check, Smile, ShieldCheck, Timer } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex items-center justify-center reveal">
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300">
              <img 
                src="https://lepetitjournal.com/_next/image?url=https%3A%2F%2Fbackoffice.lepetitjournal.com%2Fsites%2Fdefault%2Ffiles%2Finline-images%2Fle%2520syst%25C3%25A8me%2520scolaire%2520au%2520b%25C3%25A9nin.jpeg&w=3840&q=75" 
                alt="Formateur surveillant un examen en ligne" 
                className="w-full rounded-xl"
                width="500"
                height="375"
              />
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20"></div>
            </div>
          </div>
          <div className="space-y-4 reveal">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Bénéfices pédagogiques</h2>
            <p className="text-muted-foreground">Notre plateforme simplifie le processus d'évaluation tout en améliorant la qualité pédagogique.</p>
            
            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Moins de correction manuelle</h3>
                  <p className="text-sm text-muted-foreground">Automatisez la correction des QCM et gagnez un temps précieux.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Smile className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Moins de stress pour l'élève</h3>
                  <p className="text-sm text-muted-foreground">Une interface intuitive et un environnement sécurisé pour une meilleure concentration.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Contrôle renforcé</h3>
                  <p className="text-sm text-muted-foreground">Surveillance intelligente et détection des comportements suspicieux.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Timer className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Résultats instantanés</h3>
                  <p className="text-sm text-muted-foreground">Feedback immédiat pour les élèves et analyse détaillée pour les enseignants.</p>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
