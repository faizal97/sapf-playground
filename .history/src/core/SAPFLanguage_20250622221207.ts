// SAPF Language Definition for Monaco Editor
// Defines syntax highlighting, keywords, and language features

export const sapfLanguageDefinition = {
  // Language configuration
  configuration: {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'] as [string, string]
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    folding: {
      markers: {
        start: new RegExp('^\\s*//\\s*#?region\\b'),
        end: new RegExp('^\\s*//\\s*#?endregion\\b')
      }
    }
  },

  // Tokenizer rules for syntax highlighting
} as const;

export const sapfTokenizer = {
    root: [
      // Comments
      [/\/\/.*$/, 'comment'],
      [/\/\*/, 'comment', '@comment'],

      // Numbers
      [/\b\d*\.\d+([eE][\-+]?\d+)?\b/, 'number.float'],
      [/\b\d+([eE][\-+]?\d+)?\b/, 'number'],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/'/, 'string', '@string_single'],

      // Audio functions (oscillators)
      [/\b(sine|sin|sawtooth|saw|square|triangle|tri|noise|white|pink|brown)\b/, 'keyword.audio'],

      // Mathematical functions
      [/\b(abs|min|max|floor|ceil|round|sqrt|pow|exp|log|sin|cos|tan|atan2|random|ramp|lerp)\b/, 'keyword.math'],

      // Control flow
      [/\b(if|else|while|for|return|break|continue)\b/, 'keyword.control'],

      // Effects and filters
      [/\b(delay|reverb|filter|lowpass|highpass|bandpass|distortion|chorus|flanger|phaser)\b/, 'keyword.effect'],

      // Time and tempo
      [/\b(time|tempo|bpm|beat|measure|sample|duration)\b/, 'keyword.time'],

      // Audio properties
      [/\b(frequency|freq|amplitude|amp|phase|gain|volume|pan|pitch)\b/, 'keyword.property'],

      // Operators
      [/[+\-*\/=<>!&|^~%]/, 'operator'],

      // Delimiters
      [/[;,.]/, 'delimiter'],
      [/[{}()\[\]]/, 'bracket'],

      // Identifiers
      [/[a-zA-Z_]\w*/, 'identifier'],

      // Whitespace
      [/\s+/, 'white']
    ],

    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],

    string_double: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape'],
      [/"/, 'string', '@pop']
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/\\./, 'string.escape'],
      [/'/, 'string', '@pop']
    ]
  }
};

// Theme definition for SAPF
export const sapfTheme = {
  base: 'vs-dark' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
    { token: 'keyword.audio', foreground: 'FF6B6B', fontStyle: 'bold' },
    { token: 'keyword.math', foreground: '4ECDC4' },
    { token: 'keyword.control', foreground: 'C678DD' },
    { token: 'keyword.effect', foreground: 'E06C75' },
    { token: 'keyword.time', foreground: 'F39C12' },
    { token: 'keyword.property', foreground: '98C379' },
    { token: 'number', foreground: 'D19A66' },
    { token: 'number.float', foreground: 'D19A66' },
    { token: 'string', foreground: 'CE9178' },
    { token: 'string.escape', foreground: 'D7BA7D' },
    { token: 'operator', foreground: '56B6C2' },
    { token: 'delimiter', foreground: 'ABB2BF' },
    { token: 'bracket', foreground: 'FFD700' },
    { token: 'identifier', foreground: 'E06C75' }
  ],
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#d4d4d4',
    'editor.lineHighlightBackground': '#2d2d2d',
    'editor.selectionBackground': '#264f78',
    'editor.inactiveSelectionBackground': '#3a3d41',
    'editorCursor.foreground': '#aeafad',
    'editorWhitespace.foreground': '#404040',
    'editorLineNumber.foreground': '#858585',
    'editorLineNumber.activeForeground': '#c6c6c6'
  }
};

// Auto-completion suggestions for SAPF
export const sapfCompletionProvider = {
  provideCompletionItems: (model: any, position: any) => {
    const suggestions = [
      // Audio oscillators
      {
        label: 'sine',
        kind: 1, // Function
        insertText: 'sine(${1:440})',
        insertTextRules: 4, // InsertAsSnippet
        documentation: 'Generate a sine wave at the specified frequency'
      },
      {
        label: 'sawtooth',
        kind: 1,
        insertText: 'sawtooth(${1:440})',
        insertTextRules: 4,
        documentation: 'Generate a sawtooth wave at the specified frequency'
      },
      {
        label: 'square',
        kind: 1,
        insertText: 'square(${1:440})',
        insertTextRules: 4,
        documentation: 'Generate a square wave at the specified frequency'
      },
      {
        label: 'triangle',
        kind: 1,
        insertText: 'triangle(${1:440})',
        insertTextRules: 4,
        documentation: 'Generate a triangle wave at the specified frequency'
      },
      {
        label: 'noise',
        kind: 1,
        insertText: 'noise()',
        insertTextRules: 4,
        documentation: 'Generate white noise'
      },

      // Mathematical functions
      {
        label: 'ramp',
        kind: 1,
        insertText: 'ramp(${1:0}, ${2:1}, ${3:1})',
        insertTextRules: 4,
        documentation: 'Create a linear ramp from start to end over duration'
      },
      {
        label: 'lerp',
        kind: 1,
        insertText: 'lerp(${1:a}, ${2:b}, ${3:t})',
        insertTextRules: 4,
        documentation: 'Linear interpolation between a and b by factor t'
      },

      // Effects
      {
        label: 'delay',
        kind: 1,
        insertText: 'delay(${1:signal}, ${2:0.3})',
        insertTextRules: 4,
        documentation: 'Add delay effect with specified time'
      },
      {
        label: 'reverb',
        kind: 1,
        insertText: 'reverb(${1:signal}, ${2:0.5})',
        insertTextRules: 4,
        documentation: 'Add reverb effect with specified amount'
      },

      // Common patterns
      {
        label: 'chord',
        kind: 15, // Snippet
        insertText: 'sine(${1:261.63}) * ${2:0.3} + sine(${3:329.63}) * ${2:0.3} + sine(${4:392.00}) * ${2:0.3}',
        insertTextRules: 4,
        documentation: 'Create a basic chord (C major by default)'
      }
    ];

    return { suggestions };
  }
}; 