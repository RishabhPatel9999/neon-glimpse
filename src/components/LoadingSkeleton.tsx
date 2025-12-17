const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="relative bg-card/30 border border-border p-5 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Corner accents */}
          <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-primary/30" />
          <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-primary/30" />
          <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-primary/30" />
          <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-primary/30" />

          {/* Category skeleton */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-20 bg-muted/50 rounded" />
            <div className="h-4 w-24 bg-muted/30 rounded" />
          </div>

          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-muted/50 rounded mb-2" />

          {/* URL skeleton */}
          <div className="h-4 w-1/3 bg-neon-green/20 rounded mb-3" />

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/30 rounded" />
            <div className="h-4 w-5/6 bg-muted/30 rounded" />
            <div className="h-4 w-2/3 bg-muted/30 rounded" />
          </div>

          {/* Scanning line animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              style={{
                animation: `scan 2s ease-in-out infinite`,
                animationDelay: `${i * 200}ms`
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;
