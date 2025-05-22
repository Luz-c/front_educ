import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <button onClick={handleHome} className="flex items-center gap-2">
          <GraduationCap className="text-primary h-6 w-6" />
          <span className="font-bold text-xl">ExamEasy</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors">Fonctionnalités</a>
          <a href="/#benefits" className="text-sm font-medium hover:text-primary transition-colors">Bénéfices</a>
          <a href="/#workflow" className="text-sm font-medium hover:text-primary transition-colors">Comment ça marche</a>
          <a href="/#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden md:inline-flex h-10 px-4 py-2 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium transition-all">
            Se connecter
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
