import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ResultsHeader from "@/components/ResultsHeader";
import SearchFilters from "@/components/SearchFilters";
import SearchResultCard from "@/components/SearchResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import FloatingShapes from "@/components/FloatingShapes";
import StatusBar from "@/components/StatusBar";
import { AlertCircle } from "lucide-react";

// Mock results for demonstration
const mockResults = [
  {
    title: "Introduction to Neural Networks and Deep Learning",
    url: "https://neural-academy.io/intro-deep-learning",
    description: "Comprehensive guide to understanding neural networks, backpropagation algorithms, and modern deep learning architectures. Learn how AI systems process information and make decisions.",
    category: "education",
    timestamp: "2h ago",
  },
  {
    title: "Cybersecurity in the Age of Quantum Computing",
    url: "https://quantumsec.net/quantum-threats",
    description: "Exploring the implications of quantum computing on current encryption standards and the race to develop quantum-resistant cryptographic protocols for data protection.",
    category: "security",
    timestamp: "5h ago",
  },
  {
    title: "The Future of Human-Computer Interfaces",
    url: "https://techfuture.dev/hci-evolution",
    description: "From keyboards to neural links: examining the evolution of human-computer interaction and what brain-machine interfaces mean for the future of technology.",
    category: "technology",
    timestamp: "1d ago",
  },
  {
    title: "Decentralized Networks and Web3 Architecture",
    url: "https://web3guide.io/decentralized-future",
    description: "Understanding the architecture behind decentralized applications, blockchain technology, and the transition from centralized to distributed computing systems.",
    category: "blockchain",
    timestamp: "2d ago",
  },
  {
    title: "Artificial General Intelligence: Current Progress",
    url: "https://agi-research.org/progress-report",
    description: "A comprehensive overview of current AGI research, the challenges remaining, and expert predictions on when we might achieve human-level artificial intelligence.",
    category: "research",
    timestamp: "3d ago",
  },
  {
    title: "Privacy-Preserving Machine Learning Techniques",
    url: "https://privacyml.tech/techniques",
    description: "Exploring federated learning, differential privacy, and homomorphic encryption as methods to train AI models while protecting sensitive user data.",
    category: "privacy",
    timestamp: "4d ago",
  },
  {
    title: "Edge Computing and IoT Infrastructure",
    url: "https://edgetech.systems/iot-infrastructure",
    description: "How edge computing is transforming IoT deployments by processing data closer to the source, reducing latency and improving real-time decision making.",
    category: "infrastructure",
    timestamp: "5d ago",
  },
  {
    title: "Synthetic Biology and Computational Design",
    url: "https://biocompute.science/synthetic-bio",
    description: "The intersection of biology and computation: how algorithms are being used to design new organisms and revolutionize medicine and materials science.",
    category: "science",
    timestamp: "1w ago",
  },
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<typeof mockResults>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("any");
  const [searchTime, setSearchTime] = useState(0);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    const startTime = performance.now();
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Filter mock results based on query
    const filtered = mockResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const endTime = performance.now();
    setSearchTime((endTime - startTime) / 1000);
    
    // If no matches, show all results
    setResults(filtered.length > 0 ? filtered : mockResults);
    setIsLoading(false);
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const filteredResults = results.filter((result) => {
    if (activeFilter === "all") return true;
    // Add more filter logic as needed
    return true;
  });

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
            onTimeRangeChange={setTimeRange}
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
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result, index) => (
                  <SearchResultCard key={index} {...result} index={index} />
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
          {!isLoading && filteredResults.length > 0 && (
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
