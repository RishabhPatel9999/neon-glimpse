import { ExternalLink, Clock, Globe } from "lucide-react";

interface SearchResultCardProps {
  title: string;
  url: string;
  description: string;
  category?: string;
  timestamp?: string;
  index: number;
}

const SearchResultCard = ({ title, url, description, category, timestamp, index }: SearchResultCardProps) => {
  const domain = new URL(url).hostname;

  return (
    <article
      className="group relative bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Corner accents */}
      <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-primary/50 group-hover:border-primary transition-colors" />
      <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-primary/50 group-hover:border-primary transition-colors" />
      <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-primary/50 group-hover:border-primary transition-colors" />
      <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-primary/50 group-hover:border-primary transition-colors" />

      <div className="p-5">
        {/* Category & timestamp */}
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="px-2 py-1 text-xs font-mono bg-secondary/20 text-secondary border border-secondary/30">
              {category.toUpperCase()}
            </span>
          )}
          {timestamp && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <Clock className="w-3 h-3" />
              {timestamp}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors mb-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-glow-cyan"
          >
            {title}
          </a>
        </h3>

        {/* URL */}
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-3 h-3 text-neon-green" />
          <span className="text-xs font-mono text-neon-green truncate">{domain}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Action */}
        <div className="mt-4 flex justify-end">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-primary border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all"
          >
            ACCESS_DATA
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Scan line effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 animate-pulse" />
      </div>
    </article>
  );
};

export default SearchResultCard;
