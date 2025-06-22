import React from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { EditorArea } from './components/EditorArea';
import { VisualizerArea } from './components/VisualizerArea';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1e1e1e;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <EditorArea />
        <VisualizerArea />
      </MainContent>
    </AppContainer>
  );
};

export default App;
