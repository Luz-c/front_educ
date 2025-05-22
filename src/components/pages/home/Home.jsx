import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock, BarChart, ShieldCheck } from 'lucide-react';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedElements, setAnimatedElements] = useState([]);

  // Function to handle scroll and animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Find all elements that need to be animated
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !animatedElements.includes(el)) {
          el.classList.add('animate-fade-in');
          setAnimatedElements(prev => [...prev, el]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedElements]);

  // Feature data
  const features = [
    {
      title: "Création d'épreuves",
      description: "Créez des examens manuellement ou avec l'aide de notre assistant IA pour générer des questions pertinentes.",
      icon: <CheckCircle className="w-10 h-10 text-exam-accent" />
    },
    {
      title: "Anti-triche avancé",
      description: "Système de détection de triche et désactivation du copier/coller pour garantir l'intégrité des examens.",
      icon: <ShieldCheck className="w-10 h-10 text-exam-accent" />
    },
    {
      title: "Chronomètre d'examen",
      description: "Contrôlez précisément la durée des épreuves avec notre système de chronométrage intelligent.",
      icon: <Clock className="w-10 h-10 text-exam-accent" />
    },
    {
      title: "Résultats automatisés",
      description: "Bénéficiez de corrections automatiques et générez instantanément classements et statistiques détaillées.",
      icon: <BarChart className="w-10 h-10 text-exam-accent" />
    }
  ];

  // 3D Dashboard mock data for visualization
  const mockDashboard = [
    { id: 1, label: "Examens créés", value: 328 },
    { id: 2, label: "Étudiants évalués", value: 4920 },
    { id: 3, label: "Taux de réussite", value: "78%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-exam-dark to-[#2a2f3c] text-white overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-exam-dark/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-exam-accent to-exam-accent-secondary flex items-center justify-center mr-3">
              <span className="font-bold text-exam-dark">E</span>
            </div>
            <span className="font-bold text-xl">ExamPro</span>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="hover:text-exam-accent transition-colors">Fonctionnalités</a>
            <a href="#demo" className="hover:text-exam-accent transition-colors">Démo</a>
            <a href="#pricing" className="hover:text-exam-accent transition-colors">Tarifs</a>
            <a href="#contact" className="hover:text-exam-accent transition-colors">Contact</a>
            <button className="bg-exam-accent hover:bg-exam-accent/80 text-exam-dark px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-[0_0_15px_rgba(51,255,153,0.5)]">
              Se connecter
            </button>
          </div>
          
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-exam-accent/5 to-transparent opacity-70"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-exam-accent/10 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-exam-accent-secondary/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-1">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Réinventez vos évaluations.
              <br />
              <span className="bg-gradient-to-r from-exam-accent to-exam-accent-secondary bg-clip-text text-transparent animate-gradient-flow">
                Composez. Corrigez. Classez.
              </span>
              <br />
              En ligne.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              La plateforme complète qui transforme la création, la passation et l'évaluation des examens pour les établissements d'enseignement modernes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="px-8 py-3 bg-exam-accent text-exam-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(51,255,153,0.6)] transition-all hover:bg-exam-accent/90 flex items-center group">
                Essayez la démo
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all border border-white/20">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#features" className="text-white/70 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </header>
      
      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités principales</h2>
            <div className="h-1 w-20 bg-exam-accent mx-auto"></div>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Notre plateforme propose des outils innovants pour simplifier chaque étape du processus d'évaluation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 hover:bg-white/10 transition-all hover:shadow-[0_0_15px_rgba(51,255,153,0.2)] animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dashboard Visualization */}
      <section id="demo" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-exam-accent/5 to-transparent opacity-70"></div>
        
        <div className="container mx-auto px-4 relative z-1">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Interface intuitive et puissante</h2>
              <div className="h-1 w-20 bg-exam-accent mb-6"></div>
              <p className="text-xl text-gray-300 mb-6">
                Notre tableau de bord vous donne accès à toutes les fonctionnalités dont vous avez besoin pour créer, administrer et évaluer vos examens.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-exam-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Vue d'ensemble</span> - Visualisez toutes vos épreuves et résultats en un coup d'œil.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-exam-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Statistiques détaillées</span> - Analysez les performances par question, groupe ou étudiant.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-exam-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Système anti-fraude</span> - Surveillez l'activité en temps réel et recevez des alertes.
                  </div>
                </li>
              </ul>
              
              <button className="px-8 py-3 bg-exam-accent text-exam-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(51,255,153,0.6)] transition-all hover:bg-exam-accent/90 flex items-center group">
                Découvrir l'interface
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="lg:w-1/2 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
              {/* 3D Dashboard Visualization */}
              <div className="relative perspective-1000">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-[0_10px_50px_rgba(51,255,153,0.2)] transform rotate-y-6 rotate-x-12 hover:rotate-y-0 hover:rotate-x-0 transition-all duration-500 mx-auto max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Tableau de bord</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {mockDashboard.map(item => (
                      <div key={item.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                        <p className="text-gray-300 text-sm mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-exam-accent">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="bg-white/10 rounded-lg p-4 mb-6">
                    <p className="text-gray-300 text-sm mb-3">Taux de complétion</p>
                    <div className="h-32 flex items-end space-x-2">
                      {[65, 40, 85, 52, 72, 90, 60].map((value, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-exam-accent to-exam-accent-secondary rounded-t-sm hover:shadow-[0_0_10px_rgba(51,255,153,0.6)] transition-all" style={{ height: `${value}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>Lun</span>
                      <span>Mar</span>
                      <span>Mer</span>
                      <span>Jeu</span>
                      <span>Ven</span>
                      <span>Sam</span>
                      <span>Dim</span>
                    </div>
                  </div>
                  
                  {/* Mock Activity */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-gray-300 text-sm mb-3">Activité récente</p>
                    <div className="space-y-3">
                      {[
                        "Mathieu a créé un nouvel examen",
                        "Sophie a partagé l'examen de Biologie",
                        "23 étudiants ont terminé l'évaluation"
                      ].map((activity, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-exam-accent mr-2"></div>
                          <p className="text-sm">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Reflection effect */}
                <div className="absolute top-full left-0 w-full h-40 bg-gradient-to-b from-exam-accent/20 to-transparent transform scale-y-50 opacity-30 blur-md rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-exam-accent/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à transformer vos évaluations?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez des milliers d'enseignants et d'établissements qui ont déjà adopté notre solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-exam-accent text-exam-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(51,255,153,0.6)] transition-all hover:bg-exam-accent/90 flex items-center justify-center group">
                Essayez la démo
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-exam-dark border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-exam-accent to-exam-accent-secondary flex items-center justify-center mr-2">
                <span className="font-bold text-exam-dark text-xs">E</span>
              </div>
              <span className="font-bold">ExamPro</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</a>
              <a href="#demo" className="text-gray-400 hover:text-white transition-colors">Démo</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Tarifs</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ExamPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
