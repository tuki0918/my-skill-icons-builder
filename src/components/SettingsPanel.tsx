// Settings panel component for configuring skill icons display

import { AlignCenter, AlignLeft, Moon, Settings, Sun } from "lucide-react";
import React from "react";
import type { Alignment, Theme } from "../types";

interface SettingsPanelProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  perLine: number;
  setPerLine: (perLine: number) => void;
  alignment: Alignment;
  setAlignment: (alignment: Alignment) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  theme,
  setTheme,
  perLine,
  setPerLine,
  alignment,
  setAlignment,
}) => {
  const perLineId = React.useId();

  return (
    <div className="mb-8 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 px-4 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Settings size={18} />
          Settings
        </h3>
      </div>
      <div className="p-6">
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
    </div>
  );
};

export default SettingsPanel;
