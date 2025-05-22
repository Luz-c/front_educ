import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Réinventez les examens à distance.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
              Une plateforme intuitive pour faire composer vos élèves, avec sécurité, confort et automatisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a 
                href="/register" 
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 font-medium text-primary-foreground shadow transition-all hover:opacity-90 hover:scale-[1.02]"
              >
                Créer mon compte gratuitement
              </a>
              <a 
                href="#workflow" 
                className="inline-flex h-11 items-center justify-center rounded-xl border border-input bg-background px-8 font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Découvrir la solution
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-blue-900/10 dark:hover:shadow-blue-500/10">
              <img 
                src="https://beninrevele.bj/upload/images/projects//395740978507001657040913.jpg" 
                alt="Étudiant passant un examen en ligne" 
                className="w-full max-w-[600px] rounded-xl"
                width="600"
                height="400"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-20 dark:opacity-40"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
