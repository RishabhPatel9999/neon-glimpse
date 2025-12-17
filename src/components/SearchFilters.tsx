import { Filter, Clock, Globe, FileText, Image, Video } from "lucide-react";

interface SearchFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const filters = [
  { id: "all", label: "ALL", icon: Globe },
  { id: "web", label: "WEB", icon: FileText },
  { id: "images", label: "IMAGES", icon: Image },
  { id: "videos", label: "VIDEOS", icon: Video },
];

const timeRanges = [
  { id: "any", label: "ANY_TIME" },
  { id: "day", label: "24H" },
  { id: "week", label: "7D" },
  { id: "month", label: "30D" },
  { id: "year", label: "1Y" },
];

const SearchFilters = ({ activeFilter, onFilterChange, timeRange, onTimeRangeChange }: SearchFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center py-4 border-b border-border">
      {/* Type filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`
                flex items-center gap-2 px-3 py-1.5 text-xs font-mono
                border transition-all duration-200
                ${activeFilter === filter.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }
              `}
            >
              <filter.icon className="w-3 h-3" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time range */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => onTimeRangeChange(range.id)}
              className={`
                px-3 py-1.5 text-xs font-mono
                border transition-all duration-200
                ${timeRange === range.id
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
