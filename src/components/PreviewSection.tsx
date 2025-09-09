import type React from "react";
import type { Alignment, Theme } from "../types";
import CodeOutput from "./CodeOutput";
import PreviewDisplay from "./PreviewDisplay";
import SettingsPanel from "./SettingsPanel";

interface PreviewSectionProps {
  selectedIcons: string[];
  theme: Theme;
  setTheme: (theme: Theme) => void;
  perLine: number;
  setPerLine: (perLine: number) => void;
  alignment: Alignment;
  setAlignment: (alignment: Alignment) => void;
  copiedText: string;
  copyToClipboard: (text: string, type: string) => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  selectedIcons,
  theme,
  setTheme,
  perLine,
  setPerLine,
  alignment,
  setAlignment,
  copiedText,
  copyToClipboard,
}) => {
  return (
    <div className="lg:order-1 lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 sticky top-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
          <div
            className={`w-3 h-3 ${selectedIcons.length > 0 ? "bg-green-400 animate-pulse" : "bg-gray-300"} rounded-full`}
          ></div>
          Preview
        </h2>

        <SettingsPanel
          theme={theme}
          setTheme={setTheme}
          perLine={perLine}
          setPerLine={setPerLine}
          alignment={alignment}
          setAlignment={setAlignment}
        />

        <PreviewDisplay
          selectedIcons={selectedIcons}
          theme={theme}
          perLine={perLine}
          alignment={alignment}
        />

        <CodeOutput
          selectedIcons={selectedIcons}
          theme={theme}
          perLine={perLine}
          alignment={alignment}
          copiedText={copiedText}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default PreviewSection;
