const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Floating geometric shapes */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute top-40 right-20 w-24 h-24 border border-secondary/20 rotate-12 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div 
        className="absolute bottom-40 left-1/4 w-16 h-16 border border-neon-yellow/20 -rotate-12 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-20 right-1/3 w-20 h-20 border border-primary/20 rotate-45 animate-float"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Horizontal lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />

      {/* Vertical lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-secondary/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-secondary/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

      {/* Scan lines overlay */}
      <div className="absolute inset-0 scanlines" />
    </div>
  );
};

export default FloatingShapes;
