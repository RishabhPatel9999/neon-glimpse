import { useState, useEffect } from "react";
import { Wifi, Battery, Activity, Lock } from "lucide-react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-neon-green" />
            <span>SECURE_CONNECTION</span>
          </span>
          <span className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span>NODES: 2,847</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-primary" />
            <span>LATENCY: 12ms</span>
          </span>
          <span className="flex items-center gap-2">
            <Battery className="w-3 h-3 text-neon-green" />
            <span>SYS_OPTIMAL</span>
          </span>
          <span className="text-primary font-display tracking-wider">
            {formatTime(time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
