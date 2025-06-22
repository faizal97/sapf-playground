// Utility functions for SAPF Playground

export const formatFrequency = (freq: number): string => {
  if (freq >= 1000) {
    return `${(freq / 1000).toFixed(1)}kHz`;
  }
  return `${freq.toFixed(1)}Hz`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const noteToFrequency = (note: string): number => {
  const noteMap: { [key: string]: number } = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
  };
  return noteMap[note] || 440;
};

export const loadExampleCode = async (filename: string): Promise<string> => {
  try {
    const response = await fetch(`/examples/${filename}`);
    return await response.text();
  } catch (error) {
    console.error('Failed to load example:', error);
    return '';
  }
}; 