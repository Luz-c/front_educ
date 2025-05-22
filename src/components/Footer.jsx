import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary h-6 w-6" />
              <span className="font-bold text-xl">ExamEasy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              La nouvelle norme d'évaluation à distance, sécurisée et engageante.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Accueil</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a></li>
              <li><a href="#workflow" className="text-muted-foreground hover:text-foreground transition-colors">Comment ça marche</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">RGPD</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@exameasy.bj</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+229 21 30 45 67</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Rue de l'Éducation, Cotonou, Bénin</span>
              </li>
            </ul>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ExamEasy. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
