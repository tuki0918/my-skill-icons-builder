import type React from "react";

interface SelectedIconsListProps {
  selectedIcons: string[];
  toggleIcon: (icon: string) => void;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
}

const SelectedIconsList: React.FC<SelectedIconsListProps> = ({
  selectedIcons,
  toggleIcon,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  if (selectedIcons.length === 0) {
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[64px] flex flex-wrap gap-2 items-start">
        <div className="w-full flex items-center justify-center text-gray-400 text-sm py-4">
          <div className="text-center">
            <div>Click skill icons below to get started</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[64px] flex flex-wrap gap-2 items-start">
      {selectedIcons.map((icon, index) => (
        // biome-ignore lint/a11y/useSemanticElements: div is needed for drag functionality
        <div
          key={icon}
          role="button"
          tabIndex={0}
          aria-label={`Remove ${icon} icon`}
          className="group relative cursor-move transform transition-all duration-200 hover:scale-110"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleIcon(icon);
            }
          }}
        >
          <img
            src={`https://skillicons.dev/icons?i=${icon}`}
            alt={icon}
            className="w-12 h-12 rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
          />
          <button
            type="button"
            onClick={() => toggleIcon(icon)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedIconsList;
