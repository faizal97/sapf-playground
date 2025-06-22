// SAPF Language Definition for Monaco Editor
// Defines syntax highlighting, keywords, and language features

import * as monaco from 'monaco-editor';

// Language configuration
export const sapfLanguageConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
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
};

// Tokenizer rules for syntax highlighting
export const sapfTokenizer: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      // Comments
      [/\/\/.*$/, 'comment'],
      [/\/\*/, 'comment', '@comment'],

      // Numbers
      [/\b\d*\.\d+([eE][+-]?\d+)?\b/, 'number.float'],
      [/\b\d+([eE][+-]?\d+)?\b/, 'number'],

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
      [/[+\-*=<>!&|^~%]/, 'operator'],
      [/\//, 'operator'],

      // Delimiters
      [/[;,.]/, 'delimiter'],
      [/[{}()\[\]]/, 'bracket'],

      // Identifiers
      [/[a-zA-Z_]\w*/, 'identifier'],

      // Whitespace
      [/\s+/, 'white']
    ],

    comment: [
      [/[^/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[/*]/, 'comment']
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
export const sapfTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
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
export const sapfCompletionProvider: monaco.languages.CompletionItemProvider = {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn
    };

    const suggestions: monaco.languages.CompletionItem[] = [
      // Audio oscillators
      {
        label: 'sine',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'sine(440)',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Generate a sine wave at the specified frequency',
        range
      },
      {
        label: 'sawtooth',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'sawtooth(${1:440})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Generate a sawtooth wave at the specified frequency',
        range
      },
      {
        label: 'square',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'square(${1:440})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Generate a square wave at the specified frequency',
        range
      },
      {
        label: 'triangle',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'triangle(${1:440})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Generate a triangle wave at the specified frequency',
        range
      },
      {
        label: 'noise',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'noise()',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Generate white noise',
        range
      },

      // Mathematical functions
      {
        label: 'ramp',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'ramp(${1:0}, ${2:1}, ${3:1})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Create a linear ramp from start to end over duration',
        range
      },
      {
        label: 'lerp',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'lerp(${1:a}, ${2:b}, ${3:t})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Linear interpolation between a and b by factor t',
        range
      },

      // Effects
      {
        label: 'delay',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'delay(${1:signal}, ${2:0.3})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Add delay effect with specified time',
        range
      },
      {
        label: 'reverb',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'reverb(${1:signal}, ${2:0.5})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Add reverb effect with specified amount',
        range
      },

      // Common patterns
      {
        label: 'chord',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'sine(${1:261.63}) * ${2:0.3} + sine(${3:329.63}) * ${2:0.3} + sine(${4:392.00}) * ${2:0.3}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Create a basic chord (C major by default)',
        range
      }
    ];

    return { suggestions };
  }
};

// Hover provider for documentation
export const sapfHoverProvider: monaco.languages.HoverProvider = {
  provideHover: (model, position) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    
    const hoverInfo: { [key: string]: string } = {
      'sine': 'Generate a sine wave. Usage: sine(frequency)',
      'sawtooth': 'Generate a sawtooth wave. Usage: sawtooth(frequency)',
      'square': 'Generate a square wave. Usage: square(frequency)',
      'triangle': 'Generate a triangle wave. Usage: triangle(frequency)',
      'noise': 'Generate white noise. Usage: noise()',
      'ramp': 'Create a linear ramp. Usage: ramp(start, end, duration)',
      'delay': 'Add delay effect. Usage: delay(signal, time)',
      'reverb': 'Add reverb effect. Usage: reverb(signal, amount)'
    };
    
    const info = hoverInfo[word.word];
    if (info) {
      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        ),
        contents: [{ value: info }]
      };
    }
    return null;
  }
}; 