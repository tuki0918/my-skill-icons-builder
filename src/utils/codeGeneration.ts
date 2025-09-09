// Utility functions for generating skill icons URLs and code

import type { Alignment, SkillIconsUrlParams, Theme } from "../types";

/**
 * Generates the skill icons URL based on parameters
 */
export const generateSkillIconsUrl = (params: SkillIconsUrlParams): string => {
  const { icons, theme, perLine } = params;
  const iconsParam = icons.join(",");
  const themeParam = theme && theme !== "dark" ? `&theme=${theme}` : "";
  const perLineParam = perLine && perLine !== 15 ? `&perline=${perLine}` : "";
  return `https://skillicons.dev/icons?i=${iconsParam}${themeParam}${perLineParam}`;
};

/**
 * Generates markdown code for skill icons
 */
export const generateMarkdownCode = (
  icons: string[],
  theme: Theme,
  perLine: number,
  alignment: Alignment,
): string => {
  const url = generateSkillIconsUrl({ icons, theme, perLine });
  if (alignment === "center") {
    return `<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="${url}" />\n  </a>\n</p>`;
  }
  return `[![My Skills](${url})](https://skillicons.dev)`;
};

/**
 * Generates HTML code for skill icons
 */
export const generateHTMLCode = (
  icons: string[],
  theme: Theme,
  perLine: number,
  alignment: Alignment,
): string => {
  const url = generateSkillIconsUrl({ icons, theme, perLine });
  if (alignment === "center") {
    return `<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="${url}" />\n  </a>\n</p>`;
  }
  return `<a href="https://skillicons.dev">\n  <img src="${url}" />\n</a>`;
};
