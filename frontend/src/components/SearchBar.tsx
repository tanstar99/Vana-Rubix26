interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search plants...' }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-3.5 bg-slate-900/60 backdrop-blur-xl border border-emerald-500/40 rounded-xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-all shadow-lg"
      />
      <svg
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
