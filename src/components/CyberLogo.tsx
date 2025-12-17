const CyberLogo = () => {
  return (
    <div className="relative inline-block animate-flicker">
      <h1 className="font-display font-black text-6xl md:text-8xl tracking-wider text-glow-cyan">
        <span className="text-primary">NEXUS</span>
        <span className="text-secondary">_</span>
      </h1>
      
      {/* Glitch layers */}
      <h1 
        className="absolute inset-0 font-display font-black text-6xl md:text-8xl tracking-wider text-neon-magenta opacity-0 hover:opacity-70 transition-opacity"
        style={{ transform: "translate(2px, -2px)", clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
        aria-hidden="true"
      >
        <span>NEXUS</span>
        <span>_</span>
      </h1>
      
      <p className="text-muted-foreground font-mono text-sm tracking-[0.5em] mt-2 text-center">
        NEURAL_SEARCH_ENGINE
      </p>
    </div>
  );
};

export default CyberLogo;
