import { Cpu, Database, Globe, Shield, Zap, Code } from "lucide-react";

const links = [
  { icon: Globe, label: "NET_SCAN", color: "text-primary" },
  { icon: Database, label: "DATA_VAULT", color: "text-secondary" },
  { icon: Shield, label: "SEC_CHECK", color: "text-neon-green" },
  { icon: Cpu, label: "AI_QUERY", color: "text-neon-yellow" },
  { icon: Code, label: "CODE_BASE", color: "text-primary" },
  { icon: Zap, label: "FAST_TRACK", color: "text-secondary" },
];

const QuickLinks = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {links.map((link, index) => (
        <button
          key={link.label}
          className="
            group flex items-center gap-2 px-4 py-2
            bg-card/50 border border-border
            hover:border-primary hover:bg-card
            transition-all duration-300
            font-mono text-sm tracking-wider
          "
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <link.icon className={`w-4 h-4 ${link.color} group-hover:animate-pulse`} />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {link.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuickLinks;
