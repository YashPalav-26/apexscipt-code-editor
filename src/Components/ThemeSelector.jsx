import { useState, useMemo, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAvailableThemes } from "../themes/themeLoader";

const ThemeSelector = ({ currentTheme, onThemeChange, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const themes = useMemo(() => getAvailableThemes(), []);
  
  const activeLabel = useMemo(() => {
    const active = themes.find((t) => t.id === currentTheme);
    return active ? active.label : "Theme";
  }, [themes, currentTheme]);

  const filteredThemes = useMemo(() => {
    if (!searchQuery) return themes;
    return themes.filter((t) =>
      t.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [themes, searchQuery]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "bg-[var(--theme-bg-hover)] border-[var(--theme-border)] hover:bg-[var(--theme-input)] focus:ring-[var(--theme-accent)]"
            : "bg-[var(--theme-bg-hover)] border-[var(--theme-border)] hover:bg-[var(--theme-bg-hover)] focus:ring-[var(--theme-accent)]"
        }`}
        aria-label="Select theme"
        title="Choose theme"
      >
        <FontAwesomeIcon
          icon={faPalette}
          className={`w-3.5 h-3.5 ${
            "text-[var(--theme-accent)]"
          }`}
        />
        <span className="text-sm font-medium hidden sm:inline whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
          {activeLabel}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full right-0 lg:left-0 lg:right-auto mt-2 rounded-lg shadow-xl border z-50 min-w-56 w-64 overflow-hidden transform opacity-100 transition-all duration-200 ${
            isDarkMode
              ? "bg-[var(--theme-sidebar)] border-[var(--theme-border)]"
              : "bg-[var(--theme-bg)] border-[var(--theme-border)]"
          }`}
        >
          <div className={`p-2 border-b ${"border-[var(--theme-border)]"}`}>
            <div className="relative text-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon icon={faSearch} className={"text-[var(--theme-muted)]"} />
              </span>
              <input
                type="text"
                autoFocus
                placeholder="Search themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-1.5 pl-8 pr-3 rounded border outline-none ${
                  isDarkMode
                    ? "bg-[var(--theme-input)] border-[var(--theme-border)] text-[var(--theme-fg)] focus:border-[var(--theme-accent)]"
                    : "bg-[var(--theme-bg-hover)] border-[var(--theme-border)] text-black focus:border-[var(--theme-accent)]"
                }`}
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredThemes.length === 0 ? (
              <div className={`px-4 py-3 text-sm text-center ${"text-[var(--theme-muted)]"}`}>
                No themes found
              </div>
            ) : (
              filteredThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-all duration-150 group ${
                    currentTheme === theme.id
                      ? "bg-[var(--theme-active)]"
                      : "hover:bg-[var(--theme-bg-hover)]"
                  }`}
                >
                  <span className="flex-1 truncate group-hover:translate-x-1 transition-transform">{theme.label}</span>
                  {currentTheme === theme.id && (
                    <span
                      className={`text-xs font-bold ${
                        "text-[var(--theme-accent)]"
                      }`}
                    >
                      ✓
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
