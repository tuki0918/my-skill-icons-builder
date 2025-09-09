// Custom hooks for managing various state aspects of the Skill Icons Builder

import React from "react";
import { AVAILABLE_ICONS } from "../components/SkillIconsData";
import type { Alignment, Theme } from "../types";

/**
 * Hook for managing icon selection state and operations
 */
export const useIconSelection = () => {
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

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

  return {
    selectedIcons,
    draggedIndex,
    toggleIcon,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};

/**
 * Hook for managing settings state
 */
export const useSettings = () => {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [perLine, setPerLine] = React.useState<number>(15);
  const [alignment, setAlignment] = React.useState<Alignment>("left");

  return {
    theme,
    setTheme,
    perLine,
    setPerLine,
    alignment,
    setAlignment,
  };
};

/**
 * Hook for managing search functionality
 */
export const useSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const filteredIcons = React.useMemo(() => {
    if (!searchTerm.trim()) {
      return AVAILABLE_ICONS;
    }
    return AVAILABLE_ICONS.filter((icon) =>
      icon.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredIcons,
  };
};

/**
 * Hook for managing copy to clipboard functionality
 */
export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = React.useState<string>("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(""), 2000);
    });
  };

  return {
    copiedText,
    copyToClipboard,
  };
};
