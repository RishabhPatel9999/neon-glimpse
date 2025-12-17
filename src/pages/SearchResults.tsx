import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ResultsHeader from "@/components/ResultsHeader";
import SearchFilters from "@/components/SearchFilters";
import SearchResultCard from "@/components/SearchResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import FloatingShapes from "@/components/FloatingShapes";
import StatusBar from "@/components/StatusBar";
import { AlertCircle, WifiOff } from "lucide-react";
import { searchWeb, SearchResult } from "@/lib/searchApi";
import { useToast } from "@/hooks/use-toast";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { toast } = useToast();
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [timeRange, setTimeRange] = useState<"any" | "day" | "week" | "month" | "year">("any");
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    const startTime = performance.now();
    
    try {
      const response = await searchWeb(searchQuery, {
        limit: 10,
        timeFilter: timeRange,
      });
      
      const endTime = performance.now();
      setSearchTime((endTime - startTime) / 1000);
      
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        setError(response.error || "Failed to fetch results");
        toast({
          title: "SEARCH_ERROR",
          description: response.error || "Failed to connect to neural network",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Network connection failed");
      toast({
        title: "CONNECTION_FAILED",
        description: "Unable to reach the search network",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, timeRange]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const filteredResults = results.filter((result) => {
    if (activeFilter === "all") return true;
    return true;
  });

  const getCategoryFromUrl = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      if (domain.includes("github")) return "code";
      if (domain.includes("wikipedia")) return "wiki";
      if (domain.includes("youtube")) return "video";
      if (domain.includes("reddit")) return "forum";
      if (domain.includes("stackoverflow")) return "dev";
      if (domain.includes("arxiv")) return "research";
      return "web";
    } catch {
      return "web";
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingShapes />
      
      <div className="relative z-10">
        <ResultsHeader
          query={query}
          onSearch={handleSearch}
          resultCount={filteredResults.length}
          searchTime={searchTime}
        />

        <main className="max-w-6xl mx-auto px-4 pb-20">
          <SearchFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            timeRange={timeRange}
            onTimeRangeChange={(range) => setTimeRange(range as typeof timeRange)}
          />

          <div className="mt-6">
            {isLoading ? (
              <div>
                <div className="flex items-center gap-2 mb-4 text-sm font-mono text-primary animate-pulse">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  SCANNING_NEURAL_NETWORK...
                </div>
                <LoadingSkeleton />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <WifiOff className="w-16 h-16 text-destructive mb-4" />
                <h2 className="font-display text-2xl text-foreground mb-2">
                  CONNECTION_ERROR
                </h2>
                <p className="text-muted-foreground font-mono text-sm max-w-md mb-4">
                  {error}
                </p>
                <button
                  onClick={() => performSearch(query)}
                  className="px-4 py-2 border border-primary text-primary font-mono text-sm hover:bg-primary/10 transition-colors"
                >
                  RETRY_CONNECTION
                </button>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result, index) => (
                  <SearchResultCard
                    key={`${result.url}-${index}`}
                    title={result.title}
                    url={result.url}
                    description={result.description}
                    category={getCategoryFromUrl(result.url)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="w-16 h-16 text-secondary mb-4" />
                <h2 className="font-display text-2xl text-foreground mb-2">
                  NO_DATA_FOUND
                </h2>
                <p className="text-muted-foreground font-mono text-sm max-w-md">
                  The neural network could not locate any matching entries for your query.
                  Try adjusting your search parameters.
                </p>
              </div>
            )}
          </div>

          {/* Pagination placeholder */}
          {!isLoading && !error && filteredResults.length > 0 && (
            <div className="mt-8 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`
                    w-10 h-10 font-mono text-sm border transition-all
                    ${page === 1
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </main>

        <StatusBar />
      </div>
    </div>
  );
};

export default SearchResults;
