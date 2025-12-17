import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div
        className={`
          relative flex items-center gap-4 px-6 py-4
          bg-input/50 backdrop-blur-sm
          border-2 transition-all duration-300
          ${isFocused 
            ? "border-primary glow-cyan" 
            : "border-border hover:border-primary/50"
          }
        `}
      >
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-primary" />

        <Search className={`w-6 h-6 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="ENTER SEARCH QUERY_"
          className="
            flex-1 bg-transparent text-foreground text-lg
            placeholder:text-muted-foreground/50
            focus:outline-none font-mono
            tracking-wider
          "
        />

        <button
          type="submit"
          className="
            px-6 py-2 bg-primary text-primary-foreground
            font-display font-bold text-sm tracking-widest
            hover:bg-primary/90 transition-all duration-200
            border border-primary hover:glow-cyan
            uppercase
          "
        >
          Search
        </button>
      </div>

      {/* Animated line under search */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-4 animate-pulse" />
    </form>
  );
};

export default SearchBar;
