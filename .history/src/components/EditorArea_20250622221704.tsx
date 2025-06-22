import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { sapfLanguageConfiguration, sapfTokenizer, sapfTheme, sapfCompletionProvider, sapfHoverProvider } from '../core/SAPFLanguage';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-right: 1px solid #404040;
  min-width: 400px;
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  font-size: 0.9rem;
  color: #cccccc;
`;

const EditorTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tab = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.active ? '#007acc' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#cccccc'};
  border: 1px solid ${props => props.active ? '#007acc' : '#404040'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#005a9e' : '#404040'};
    border-color: ${props => props.active ? '#005a9e' : '#606060'};
  }
`;

const EditorContent = styled.div`
  flex: 1;
  position: relative;
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #2d2d2d;
  border-top: 1px solid #404040;
  font-size: 0.8rem;
  color: #888888;
`;

const StatusItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Enhanced SAPF sample code with better examples
const defaultSAPFCode = `// Welcome to SAPF Playground!
// SAPF (Simple Audio Programming Framework) - Audio made simple

// #region Basic Oscillators
// Simple sine wave at 440Hz (A4 note)
sine(440) * 0.3

// Try different waveforms:
// sawtooth(220) * 0.4
// square(330) * 0.2
// triangle(110) * 0.5
// #endregion

// #region Chords and Harmony
// C Major chord (C-E-G)
sine(261.63) * 0.2 + sine(329.63) * 0.2 + sine(392.00) * 0.2

// Minor chord with different timbres
sawtooth(220) * 0.15 + triangle(261.63) * 0.15 + sine(329.63) * 0.15
// #endregion

// #region Modulation and Effects
// Frequency modulation (vibrato)
sine(440 + sine(5) * 10) * 0.3

// Amplitude modulation (tremolo)
sine(440) * (0.5 + sine(3) * 0.3)

// Frequency sweep using ramp
sine(ramp(220, 880, 2)) * 0.3
// #endregion

// #region Noise and Textures
// Filtered noise
// noise() * 0.1

// Rhythmic patterns
// sine(440) * (time % 0.5 < 0.1 ? 1 : 0) * 0.4
// #endregion

// Experiment with combining different elements!
// Use Ctrl+Space for auto-completion`;

interface EditorAreaProps {
  onCodeChange?: (code: string) => void;
  initialCode?: string;
}

export const EditorArea: React.FC<EditorAreaProps> = ({ 
  onCodeChange, 
  initialCode = defaultSAPFCode 
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentCode, setCurrentCode] = React.useState(initialCode);
  const [cursorPosition, setCursorPosition] = React.useState({ line: 1, column: 1 });
  const [activeTab, setActiveTab] = React.useState<'main' | 'examples'>('main');
  const [isLanguageRegistered, setIsLanguageRegistered] = React.useState(false);

  // Register SAPF language when component mounts
  useEffect(() => {
    const registerSAPFLanguage = () => {
      // Check if running in browser environment
      if (typeof window === 'undefined') return;

      try {
        // Register the SAPF language ID
        const languages = monaco.languages.getLanguages();
        const sapfExists = languages.some(lang => lang.id === 'sapf');
        
        if (!sapfExists) {
          console.log('Registering SAPF language...');
          
          // Register language
          monaco.languages.register({ id: 'sapf' });
          
          // Set language configuration
          monaco.languages.setLanguageConfiguration('sapf', sapfLanguageConfiguration);
          
          // Set tokenizer (monarch syntax highlighting)
          monaco.languages.setMonarchTokensProvider('sapf', sapfTokenizer);
          
          // Define and set theme
          monaco.editor.defineTheme('sapf-dark', sapfTheme);
          
          // Register completion provider
          monaco.languages.registerCompletionItemProvider('sapf', sapfCompletionProvider);
          
          // Register hover provider
          monaco.languages.registerHoverProvider('sapf', sapfHoverProvider);
          
          console.log('SAPF language registered successfully');
          setIsLanguageRegistered(true);
        } else {
          console.log('SAPF language already registered');
          setIsLanguageRegistered(true);
        }
      } catch (error) {
        console.error('Failed to register SAPF language:', error);
      }
    };

    // Register language immediately if Monaco is available
    if (monaco?.languages) {
      registerSAPFLanguage();
    }
  }, []);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    
    // Ensure language is registered when editor mounts
    if (!isLanguageRegistered) {
      const registerSAPFLanguage = () => {
        try {
          // Register language
          monaco.languages.register({ id: 'sapf' });
          
          // Set language configuration
          monaco.languages.setLanguageConfiguration('sapf', sapfLanguageConfiguration);
          
          // Set tokenizer
          monaco.languages.setMonarchTokensProvider('sapf', sapfTokenizer);
          
          // Define and set theme
          monaco.editor.defineTheme('sapf-dark', sapfTheme);
          
          // Register completion provider
          monaco.languages.registerCompletionItemProvider('sapf', sapfCompletionProvider);
          
          // Register hover provider
          monaco.languages.registerHoverProvider('sapf', sapfHoverProvider);
          
          console.log('SAPF language registered in editor mount');
          setIsLanguageRegistered(true);
          
          // Force re-render with correct language
          const model = editor.getModel();
          if (model) {
            monaco.editor.setModelLanguage(model, 'sapf');
          }
        } catch (error) {
          console.error('Failed to register SAPF language in editor mount:', error);
        }
      };

      registerSAPFLanguage();
    }
    
    // Set up cursor position tracking
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column
      });
    });
    
    // Set up keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR, () => {
      // Trigger run command (will be handled by parent)
      console.log('Run shortcut pressed');
    });
    
    // Focus the editor
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    const code = value || '';
    setCurrentCode(code);
    onCodeChange?.(code);
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const getLineCount = () => {
    return currentCode.split('\n').length;
  };

  const getWordCount = () => {
    return currentCode.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTabs>
          <Tab active={activeTab === 'main'} onClick={() => setActiveTab('main')}>
            main.sapf
          </Tab>
          <Tab active={activeTab === 'examples'} onClick={() => setActiveTab('examples')}>
            examples
          </Tab>
        </EditorTabs>
        <span>SAPF Audio Programming</span>
      </EditorHeader>
      
      <EditorContent>
        <Editor
          height="100%"
          language="sapf"
          value={currentCode}
          theme="sapf-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            // Editor appearance
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, "SF Mono", "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            fontWeight: '400',
            lineHeight: 1.5,
            letterSpacing: 0.5,
            
            // Line numbers and folding
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            glyphMargin: true,
            folding: true,
            foldingStrategy: 'indentation',
            
            // Scrolling and layout
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 12,
              horizontalScrollbarSize: 12
            },
            automaticLayout: true,
            
            // Editing behavior
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            wordWrapColumn: 120,
            wrappingIndent: 'indent',
            
            // Selection and cursor
            roundedSelection: false,
            cursorStyle: 'line',
            cursorWidth: 2,
            cursorBlinking: 'blink',
            
            // Suggestions and IntelliSense
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            wordBasedSuggestions: 'currentDocument' as const,
            
            // Brackets and matching
            matchBrackets: 'always',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoSurround: 'languageDefined',
            
            // Indentation
            autoIndent: 'full',
            detectIndentation: false,
            
            // Hover and tooltips
            hover: {
              enabled: true,
              delay: 300
            },
            
            // Performance
            renderLineHighlight: 'line',
            renderWhitespace: 'selection',
            smoothScrolling: true,
            
            // Accessibility
            accessibilitySupport: 'auto'
          }}
        />
      </EditorContent>
      
      <StatusBar>
        <StatusItem>
          Ln {cursorPosition.line}, Col {cursorPosition.column}
        </StatusItem>
        <StatusItem>
          {getLineCount()} lines • {getWordCount()} words
        </StatusItem>
        <StatusItem>
          SAPF • UTF-8 {isLanguageRegistered ? '• Language Ready' : '• Loading...'}
        </StatusItem>
      </StatusBar>
    </EditorContainer>
  );
}; 