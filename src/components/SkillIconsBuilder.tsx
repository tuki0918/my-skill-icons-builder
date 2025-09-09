import React from 'react';
import { Copy } from 'lucide-react';

import { AVAILABLE_ICONS } from './SkillIconsData';


const SkillIconsBuilder: React.FC = () => {
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [copiedText, setCopiedText] = React.useState<string>('');
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [perLine, setPerLine] = React.useState<number>(15);
  const [centerAlign, setCenterAlign] = React.useState<boolean>(false);


  const toggleIcon = (icon: string) => {
    setSelectedIcons(prev => 
      prev.includes(icon) 
        ? prev.filter(i => i !== icon)
        : [...prev, icon]
    );
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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
    const iconsParam = selectedIcons.join(',');
    const themeParam = theme !== 'dark' ? `&theme=${theme}` : '';
    const perLineParam = perLine !== 15 ? `&perline=${perLine}` : '';
    const url = `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
    if (centerAlign) {
      return `<p align="center">\n  <a href=\"https://skillicons.dev\">\n    <img src=\"${url}\" />\n  </a>\n</p>`;
    }
    return `[![My Skills](${url})](https://skillicons.dev)`;
  };

  const generateHTML = () => {
    const iconsParam = selectedIcons.join(',');
    const themeParam = theme !== 'dark' ? `&theme=${theme}` : '';
    const perLineParam = perLine !== 15 ? `&perline=${perLine}` : '';
    const url = `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
    if (centerAlign) {
      return `<p align="center">\n  <a href=\"https://skillicons.dev\">\n    <img src=\"${url}\" />\n  </a>\n</p>`;
    }
    return `<a href=\"https://skillicons.dev\">\n  <img src=\"${url}\" />\n</a>`;
  };

  const getPreviewUrl = () => {
    const iconsParam = selectedIcons.join(',');
    const themeParam = theme !== 'dark' ? `&theme=${theme}` : '';
    const perLineParam = perLine !== 15 ? `&perline=${perLine}` : '';
    return `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            My Skill Icons Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create beautiful skill badges for your GitHub profile! Select your technologies and get ready-to-use markdown and HTML code.
          </p>
        </div>

        {/* Preview Section */}
        {selectedIcons.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                Preview ({selectedIcons.length} selected)
              </h2>
              {/* Settings Panel */}
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  ⚙️ Settings
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Theme Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          theme === 'dark'
                            ? 'bg-gray-800 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        🌙 Dark
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          theme === 'light'
                            ? 'bg-yellow-400 text-gray-800 shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        ☀️ Light
                      </button>
                    </div>
                  </div>
                  {/* Icons Per Line */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icons Per Line
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={perLine}
                        onChange={(e) => setPerLine(Number(e.target.value))}
                        className="flex-1 accent-blue-500"
                      />
                      <span className="w-8 text-sm font-medium text-gray-600">{perLine}</span>
                    </div>
                  </div>
                  {/* Center Alignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alignment
                    </label>
                    <button
                      onClick={() => setCenterAlign(!centerAlign)}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        centerAlign
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {centerAlign ? '📍 Centered' : '👈 Left Aligned'}
                    </button>
                  </div>
                </div>
              </div>
              <div className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 ${
                centerAlign ? 'text-center' : ''
              }`}>
                <div className="min-h-[60px] flex items-center justify-center">
                  <img
                    src={getPreviewUrl()}
                    alt="Skill Icons Preview"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
              {/* Code Generation */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">
                      {centerAlign ? 'Markdown/HTML (Centered)' : 'Markdown'}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(generateMarkdown(), 'markdown')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      <Copy size={14} />
                      {copiedText === 'markdown' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    value={generateMarkdown()}
                    readOnly
                    className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm resize-none"
                    rows={centerAlign ? 5 : 3}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">
                      {centerAlign ? 'Same as Markdown' : 'HTML'}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(generateHTML(), 'html')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        centerAlign 
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      disabled={centerAlign}
                    >
                      <Copy size={14} />
                      {copiedText === 'html' ? 'Copied!' : centerAlign ? 'Same as left' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    value={centerAlign ? generateMarkdown() : generateHTML()}
                    readOnly
                    className={`w-full p-4 border border-gray-200 rounded-xl font-mono text-sm resize-none ${
                      centerAlign ? 'bg-gray-100 text-gray-500' : 'bg-gray-50'
                    }`}
                    rows={centerAlign ? 5 : 3}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Icon Selection Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Skills</h2>
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[64px] flex flex-wrap gap-2 items-start">
              {selectedIcons.length === 0 ? (
                <div className="w-full flex items-center justify-center text-gray-400 text-sm py-4">
                  <div className="text-center">
                    <div>Select skill icons to get started</div>
                  </div>
                </div>
              ) : (
                selectedIcons.map((icon, index) => (
                  <div
                    key={`${icon}-${index}`}
                    className="group relative cursor-move transform transition-all duration-200 hover:scale-110"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <img
                      src={`https://skillicons.dev/icons?i=${icon}`}
                      alt={icon}
                      className="w-12 h-12 rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    <button
                      onClick={() => toggleIcon(icon)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 gap-4">
            {AVAILABLE_ICONS.map((icon: string) => {
              const isSelected = selectedIcons.includes(icon);
              return (
                <button
                  key={icon}
                  onClick={() => toggleIcon(icon)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? 'border-green-400 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${icon}`}
                    alt={icon}
                    className={`w-full h-auto rounded-lg transition-opacity duration-200 ${
                      isSelected ? 'opacity-70' : 'opacity-100 hover:opacity-80'
                    }`}
                  />
                  <div className="mt-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors">
                    {icon}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">
            Powered by{' '}
            <a 
              href="https://github.com/tandpfun/skill-icons" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              skill-icons
            </a>
            {' '}• Made with ❤️ for developers
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillIconsBuilder;
