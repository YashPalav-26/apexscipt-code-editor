export const fontFamilies = [
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    value: "'JetBrains Mono', monospace",
  },
  {
    id: "fira-code",
    label: "Fira Code",
    value: "'Fira Code', monospace",
  },
  {
    id: "consolas",
    label: "Consolas",
    value: "'Consolas', monospace",
  },
  {
    id: "monaco",
    label: "Monaco",
    value: "'Monaco', monospace",
  },
  {
    id: "courier-new",
    label: "Courier New",
    value: "'Courier New', monospace",
  },
];

export const getFontFamilyById = (fontId) => {
  return fontFamilies.find((f) => f.id === fontId) || fontFamilies[0];
};

export const fontSizeConfig = {
  min: 12,
  max: 24,
  default: 14,
  step: 1,
};

export const validateFontSize = (size) => {
  const numSize = parseInt(size);
  if (isNaN(numSize)) return fontSizeConfig.default;
  return Math.max(
    fontSizeConfig.min,
    Math.min(fontSizeConfig.max, numSize)
  );
};
