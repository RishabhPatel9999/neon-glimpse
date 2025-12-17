import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ResultsHeaderProps {
  query: string;
  onSearch: (query: string) => void;
  resultCount: number;
  searchTime: number;
}

const ResultsHeader = ({ query, onSearch, resultCount, searchTime }: ResultsHeaderProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="font-display font-bold text-xl text-primary hover:text-glow-cyan transition-all"
          >
            NEXUS<span className="text-secondary">_</span>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 bg-input border border-border
                  text-foreground font-mono text-sm
                  focus:outline-none focus:border-primary
                  transition-colors
                "
                placeholder="ENTER SEARCH QUERY_"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-display tracking-wider hover:bg-primary/90 transition-colors"
              >
                SEARCH
              </button>
            </div>
          </form>
        </div>

        {/* Results info */}
        <div className="mt-3 flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span>
            RESULTS: <span className="text-primary">{resultCount.toLocaleString()}</span>
          </span>
          <span>
            TIME: <span className="text-neon-green">{searchTime.toFixed(2)}s</span>
          </span>
          <span>
            QUERY: <span className="text-secondary">"{query}"</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default ResultsHeader;
