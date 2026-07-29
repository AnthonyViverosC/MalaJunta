import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, autoFocus = false }) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-acid-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        placeholder="BUSCAR TRAGO…"
        className="w-full pl-11 pr-10 py-2.5 rounded-none bg-ink-900 border-2 border-ink-600
                   font-mono text-sm text-bone placeholder-bone-muted uppercase tracking-wide outline-none
                   focus:border-acid-400 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-bone-muted hover:text-flame-500 transition"
          aria-label="Limpiar búsqueda"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
