import type React from "react";

interface IconGridProps {
  filteredIcons: string[];
  selectedIcons: string[];
  toggleIcon: (icon: string) => void;
}

const IconGrid: React.FC<IconGridProps> = ({
  filteredIcons,
  selectedIcons,
  toggleIcon,
}) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {filteredIcons.map((icon: string) => {
        const isSelected = selectedIcons.includes(icon);
        return (
          <div key={icon} className="relative group">
            <button
              type="button"
              onClick={() => toggleIcon(icon)}
              className={`w-full p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? "border-green-400 bg-green-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <img
                src={`https://skillicons.dev/icons?i=${icon}`}
                alt={icon}
                className={`w-full h-auto rounded-lg transition-opacity duration-200 ${
                  isSelected ? "opacity-70" : "opacity-100 hover:opacity-80"
                }`}
              />
              <div className="mt-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors text-center truncate">
                {icon}
              </div>
            </button>
            {/* Custom Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {icon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IconGrid;
