export type Theme = "dark" | "light";
export type Alignment = "left" | "center";

export interface SkillIconsSettings {
  theme: Theme;
  perLine: number;
  alignment: Alignment;
}

export interface IconSelectionState {
  selectedIcons: string[];
  draggedIndex: number | null;
}

export interface SearchState {
  searchTerm: string;
  filteredIcons: string[];
}

export interface CopyState {
  copiedText: string;
}

export interface SkillIconsUrlParams {
  icons: string[];
  theme?: Theme;
  perLine?: number;
}
