import { Copy } from "lucide-react";
import type React from "react";
import type { Alignment, Theme } from "../types";
import {
  generateHTMLCode,
  generateMarkdownCode,
} from "../utils/codeGeneration";

interface CodeOutputProps {
  selectedIcons: string[];
  theme: Theme;
  perLine: number;
  alignment: Alignment;
  copiedText: string;
  copyToClipboard: (text: string, type: string) => void;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  selectedIcons,
  theme,
  perLine,
  alignment,
  copiedText,
  copyToClipboard,
}) => {
  if (selectedIcons.length === 0) {
    return null;
  }

  const markdownCode = generateMarkdownCode(
    selectedIcons,
    theme,
    perLine,
    alignment,
  );
  const htmlCode = generateHTMLCode(selectedIcons, theme, perLine, alignment);

  return (
    <div className="space-y-6">
      {alignment === "left" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Markdown</h3>
            <button
              type="button"
              onClick={() => copyToClipboard(markdownCode, "markdown")}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm cursor-pointer"
            >
              <Copy size={14} />
              {copiedText === "markdown" ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={markdownCode}
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
            onClick={() => copyToClipboard(htmlCode, "html")}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm cursor-pointer"
          >
            <Copy size={14} />
            {copiedText === "html" ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          value={htmlCode}
          readOnly
          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm resize-none"
          rows={6}
        />
      </div>
    </div>
  );
};

export default CodeOutput;
