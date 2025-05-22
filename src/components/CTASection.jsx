const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto reveal">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground mb-4">
            Rejoignez les écoles qui ont digitalisé leurs examens.
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-[600px]">
            Plus de 200 établissements font déjà confiance à ExamEasy pour leurs évaluations à distance.
          </p>
          <a 
            href="/register" 
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary-foreground px-8 font-medium text-primary shadow transition-all hover:scale-[1.02] hover:opacity-90"
          >
            Commencer gratuitement
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
