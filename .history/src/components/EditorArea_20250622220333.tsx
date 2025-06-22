import React from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-right: 1px solid #404040;
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

const EditorContent = styled.div`
  flex: 1;
  position: relative;
`;

const defaultSAPFCode = `// Welcome to SAPF Playground!
// Start writing your SAPF audio code here

// Example: Simple sine wave
sine(440) * 0.3`;

export const EditorArea: React.FC = () => {
  const handleEditorChange = (value: string | undefined) => {
    // TODO: Handle code changes
    console.log('Code changed:', value);
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <span>main.sapf</span>
        <span>SAPF Audio Programming</span>
      </EditorHeader>
      <EditorContent>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={defaultSAPFCode}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          }}
        />
      </EditorContent>
    </EditorContainer>
  );
}; 