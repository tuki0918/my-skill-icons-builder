import {
  AlignCenter,
  AlignLeft,
  Copy,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import React from "react";
import githubIcon from "../assets/github.svg";
import { AVAILABLE_ICONS } from "./SkillIconsData";

const SkillIconsBuilder: React.FC = () => {
  const perLineId = React.useId();
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [copiedText, setCopiedText] = React.useState<string>("");
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [perLine, setPerLine] = React.useState<number>(15);
  const [alignment, setAlignment] = React.useState<"left" | "center">("left");
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Filter icons based on search term
  const filteredIcons = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return AVAILABLE_ICONS;
    }
    return AVAILABLE_ICONS.filter((icon) =>
      icon.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const toggleIcon = (icon: string) => {
    setSelectedIcons((prev) =>
      prev.includes(icon) ? prev.filter((i) => i !== icon) : [...prev, icon],
    );
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const newSelectedIcons = [...selectedIcons];
    const draggedIcon = newSelectedIcons[draggedIndex];
    newSelectedIcons.splice(draggedIndex, 1);
    newSelectedIcons.splice(dropIndex, 0, draggedIcon);
    setSelectedIcons(newSelectedIcons);
    setDraggedIndex(null);
  };

  const generateMarkdown = () => {
    const iconsParam = selectedIcons.join(",");
    const themeParam = theme !== "dark" ? `&theme=${theme}` : "";
    const perLineParam = perLine !== 15 ? `&perline=${perLine}` : "";
    const url = `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
    if (alignment === "center") {
      return `<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="${url}" />\n  </a>\n</p>`;
    }
    return `[![My Skills](${url})](https://skillicons.dev)`;
  };

  const generateHTML = () => {
    const iconsParam = selectedIcons.join(",");
    const themeParam = theme !== "dark" ? `&theme=${theme}` : "";
    const perLineParam = perLine !== 15 ? `&perline=${perLine}` : "";
    const url = `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
    if (alignment === "center") {
      return `<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="${url}" />\n  </a>\n</p>`;
    }
    return `<a href="https://skillicons.dev">\n  <img src="${url}" />\n</a>`;
  };

  const getPreviewUrl = () => {
    const iconsParam = selectedIcons.join(",");
    const themeParam = theme !== "dark" ? `&theme=${theme}` : "";
    const perLineParam = perLine !== 15 ? `&perline=${perLine}` : "";
    return `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(""), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mt-12 mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Skill Icons Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select icons to showcase your skills. Easily paste them into your
            portfolio.
          </p>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Preview Section - Always Visible */}
          <div className="lg:order-1 lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div
                  className={`w-3 h-3 ${selectedIcons.length > 0 ? "bg-green-400 animate-pulse" : "bg-gray-300"} rounded-full`}
                ></div>
                Preview
              </h2>
              {/* Settings Panel */}
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings size={18} />
                  Settings
                </h3>
                <div className="grid gap-4">
                  {/* Theme Selection */}
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </legend>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setTheme("dark")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          theme === "dark"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <Moon size={16} />
                        Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("light")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          theme === "light"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <Sun size={16} />
                        Light
                      </button>
                    </div>
                  </fieldset>
                  {/* Icons Per Line */}
                  <div>
                    <label
                      htmlFor={perLineId}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Icons Per Line
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={perLineId}
                        type="range"
                        min="1"
                        max="20"
                        value={perLine}
                        onChange={(e) => setPerLine(Number(e.target.value))}
                        className="flex-1 accent-blue-500"
                      />
                      <span className="w-8 text-sm font-medium text-gray-600">
                        {perLine}
                      </span>
                    </div>
                  </div>
                  {/* Alignment */}
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                      Alignment
                    </legend>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAlignment("left")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          alignment === "left"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <AlignLeft size={16} />
                        Left
                      </button>
                      <button
                        type="button"
                        onClick={() => setAlignment("center")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          alignment === "center"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <AlignCenter size={16} />
                        Center
                      </button>
                    </div>
                  </fieldset>
                </div>
              </div>

              {/* Preview Display */}
              {selectedIcons.length > 0 ? (
                <div
                  className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 ${
                    alignment === "center" ? "text-center" : "text-left"
                  }`}
                >
                  <div
                    className={`min-h-[60px] flex items-center ${
                      alignment === "center"
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    <img
                      src={getPreviewUrl()}
                      alt="Skill Icons Preview"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-dashed border-gray-200">
                  <div className="min-h-[60px] flex items-center justify-center text-gray-400 text-sm">
                    <div className="text-center">
                      <div>Your skill icons preview will appear here</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Code Generation */}
              {selectedIcons.length > 0 && (
                <div className="space-y-6">
                  {alignment === "left" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-700">
                          Markdown
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(generateMarkdown(), "markdown")
                          }
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          <Copy size={14} />
                          {copiedText === "markdown" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <textarea
                        value={generateMarkdown()}
                        readOnly
                        className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm resize-none"
                        rows={3}
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700">HTML</h3>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(generateHTML(), "html")}
                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                      >
                        <Copy size={14} />
                        {copiedText === "html" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <textarea
                      value={generateHTML()}
                      readOnly
                      className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm resize-none"
                      rows={6}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Icon Selection Grid */}
          <div className="lg:order-2 lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Choose Your Skills ({selectedIcons.length} selected)
              </h2>
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[64px] flex flex-wrap gap-2 items-start">
                {selectedIcons.length === 0 ? (
                  <div className="w-full flex items-center justify-center text-gray-400 text-sm py-4">
                    <div className="text-center">
                      <div>Click skill icons below to get started</div>
                    </div>
                  </div>
                ) : (
                  selectedIcons.map((icon, index) => (
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
                  ))
                )}
              </div>

              {/* Search Form */}
              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search for skills (e.g., javascript, react, python...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="mt-2 text-sm text-gray-500">
                    Found {filteredIcons.length} icon
                    {filteredIcons.length !== 1 ? "s" : ""} matching "
                    {searchTerm}"
                  </div>
                )}
              </div>

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
                            isSelected
                              ? "opacity-70"
                              : "opacity-100 hover:opacity-80"
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
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Icons provided by{" "}
            <a
              href="https://github.com/tandpfun/skill-icons"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              skill-icons
            </a>
          </p>
        </div>

        {/* GitHub Icon */}
        <div className="flex justify-center items-center mt-6">
          <a
            href="https://github.com/tuki0918/my-skill-icons-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <img
              src={githubIcon}
              alt="GitHub"
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkillIconsBuilder;
