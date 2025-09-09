// Preview display component for showing the skill icons preview

import type React from "react";
import type { Alignment, Theme } from "../types";
import { generateSkillIconsUrl } from "../utils/codeGeneration";

interface PreviewDisplayProps {
  selectedIcons: string[];
  theme: Theme;
  perLine: number;
  alignment: Alignment;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({
  selectedIcons,
  theme,
  perLine,
  alignment,
}) => {
  const getPreviewUrl = () => {
    return generateSkillIconsUrl({ icons: selectedIcons, theme, perLine });
  };

  if (selectedIcons.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-dashed border-gray-200">
        <div className="min-h-[60px] flex items-center justify-center text-gray-400 text-sm">
          <div className="text-center">
            <div>Your skill icons preview will appear here</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6 ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      <div
        className={`min-h-[60px] flex items-center ${
          alignment === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <img
          src={getPreviewUrl()}
          alt="Skill Icons Preview"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PreviewDisplay;
