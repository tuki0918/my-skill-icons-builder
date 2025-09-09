// Refactored Skill Icons Builder using extracted components and hooks

import type React from "react";
import {
  useCopyToClipboard,
  useIconSelection,
  useSearch,
  useSettings,
} from "../hooks";
import Footer from "./Footer";
import Header from "./Header";
import IconSelectionGrid from "./IconSelectionGrid";
import PreviewSection from "./PreviewSection";

const SkillIconsBuilder: React.FC = () => {
  // Use custom hooks for state management
  const iconSelection = useIconSelection();
  const settings = useSettings();
  const search = useSearch();
  const clipboard = useCopyToClipboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          <PreviewSection
            selectedIcons={iconSelection.selectedIcons}
            theme={settings.theme}
            setTheme={settings.setTheme}
            perLine={settings.perLine}
            setPerLine={settings.setPerLine}
            alignment={settings.alignment}
            setAlignment={settings.setAlignment}
            copiedText={clipboard.copiedText}
            copyToClipboard={clipboard.copyToClipboard}
          />

          <IconSelectionGrid
            selectedIcons={iconSelection.selectedIcons}
            toggleIcon={iconSelection.toggleIcon}
            handleDragStart={iconSelection.handleDragStart}
            handleDragOver={iconSelection.handleDragOver}
            handleDrop={iconSelection.handleDrop}
            searchTerm={search.searchTerm}
            setSearchTerm={search.setSearchTerm}
            filteredIcons={search.filteredIcons}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SkillIconsBuilder;
