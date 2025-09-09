import type React from "react";
import IconGrid from "./IconGrid";
import SearchBar from "./SearchBar";
import SelectedIconsList from "./SelectedIconsList";

interface IconSelectionGridProps {
  selectedIcons: string[];
  toggleIcon: (icon: string) => void;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredIcons: string[];
}

const IconSelectionGrid: React.FC<IconSelectionGridProps> = ({
  selectedIcons,
  toggleIcon,
  handleDragStart,
  handleDragOver,
  handleDrop,
  searchTerm,
  setSearchTerm,
  filteredIcons,
}) => {
  return (
    <div className="lg:order-2 lg:col-span-3">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Choose Your Skills ({selectedIcons.length} selected)
        </h2>

        <SelectedIconsList
          selectedIcons={selectedIcons}
          toggleIcon={toggleIcon}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          resultsCount={filteredIcons.length}
        />

        <IconGrid
          filteredIcons={filteredIcons}
          selectedIcons={selectedIcons}
          toggleIcon={toggleIcon}
        />
      </div>
    </div>
  );
};

export default IconSelectionGrid;
