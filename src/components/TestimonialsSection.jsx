const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jean Kossi",
      role: "Proviseur, Lycée Cotonou",
      image: "https://www.wathi.org/wp-content/uploads/2016/04/igue-john-4.jpg",
      quote: "ExamEasy a révolutionné notre manière de gérer les examens. Les enseignants économisent du temps et les élèves bénéficient d'une évaluation plus juste."
    },
    {
      name: "Aïcha Zinsou",
      role: "Formatrice, Université d'Abomey-Calavi",
      image: "data:image/jpeg;base64,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",
      quote: "Les outils de détection de fraude et les analyses sont incroyables. Je peux me concentrer sur l'enseignement sans me soucier de la logistique des examens."
    },
    {
      name: "Koffi Adé",
      role: "Étudiant, Licence Informatique",
      image: "https://img.lemde.fr/2021/07/14/0/12/559/373/664/0/75/0/52f8027_251069852-joelaivo.jpg",
      quote: "L'interface est simple à utiliser et les résultats instantanés m'aident à mieux comprendre mes erreurs. C'est beaucoup moins stressant que les examens classiques."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-12 reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Ils nous font confiance</h2>
          <p className="text-muted-foreground">Découvrez ce que nos utilisateurs disent de notre plateforme.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md reveal">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                  <img 
                    src={testimonial.image}
                    alt={`Portrait de ${testimonial.name}`}
                    className="w-full h-full object-cover"
                    width="150"
                    height="150"
                  />
                </div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
              <blockquote className="text-sm italic text-muted-foreground">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
