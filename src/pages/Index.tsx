import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import CyberLogo from "@/components/CyberLogo";
import QuickLinks from "@/components/QuickLinks";
import FloatingShapes from "@/components/FloatingShapes";
import StatusBar from "@/components/StatusBar";

const Index = () => {
  const { toast } = useToast();
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (query: string) => {
    setSearchCount((prev) => prev + 1);
    toast({
      title: "QUERY_INITIATED",
      description: `Searching neural network for: "${query}"`,
    });
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingShapes />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-16">
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        {/* System status */}
        <div className="absolute top-4 left-4 font-mono text-xs text-muted-foreground">
          <p>SYS_STATUS: <span className="text-neon-green">ONLINE</span></p>
          <p>VERSION: <span className="text-primary">2.0.77</span></p>
        </div>
        
        <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground text-right">
          <p>QUERIES: <span className="text-primary">{searchCount.toString().padStart(6, "0")}</span></p>
          <p>MODE: <span className="text-secondary">NEURAL</span></p>
        </div>

        {/* Logo and tagline */}
        <div className="mb-12 text-center">
          <CyberLogo />
        </div>

        {/* Search bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Quick links */}
        <QuickLinks />

        {/* Footer text */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-muted-foreground/50 tracking-widest">
            [ ACCESS THE DATASTREAM • KNOWLEDGE UNLIMITED ]
          </p>
        </div>
      </main>

      <StatusBar />
    </div>
  );
};

export default Index;
