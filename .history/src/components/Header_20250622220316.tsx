import React from 'react';
import styled from 'styled-components';
import { Play, Square, Settings } from 'lucide-react';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  min-height: 60px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005a9e;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #404040;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #404040;
    border-color: #606060;
  }
`;

export const Header: React.FC = () => {
  const handlePlay = () => {
    // TODO: Implement play functionality
    console.log('Play clicked');
  };

  const handleStop = () => {
    // TODO: Implement stop functionality
    console.log('Stop clicked');
  };

  const handleSettings = () => {
    // TODO: Implement settings functionality
    console.log('Settings clicked');
  };

  return (
    <HeaderContainer>
      <Title>SAPF Playground</Title>
      <Controls>
        <ControlButton onClick={handlePlay}>
          <Play size={16} />
          Run
        </ControlButton>
        <IconButton onClick={handleStop} title="Stop">
          <Square size={16} />
        </IconButton>
        <IconButton onClick={handleSettings} title="Settings">
          <Settings size={16} />
        </IconButton>
      </Controls>
    </HeaderContainer>
  );
}; 