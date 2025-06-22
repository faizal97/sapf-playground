import React from 'react';
import styled from 'styled-components';
import { BarChart3, Activity, Volume2 } from 'lucide-react';

const VisualizerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  min-width: 400px;
`;

const VisualizerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  font-size: 0.9rem;
  color: #cccccc;
`;

const VisualizerTabs = styled.div`
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

const VisualizerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const VisualizerCanvas = styled.div`
  flex: 1;
  background-color: #0f0f0f;
  border: 1px solid #404040;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.label`
  font-size: 0.9rem;
  color: #cccccc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  background: #404040;
  outline: none;
  border-radius: 2px;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #007acc;
    cursor: pointer;
    border-radius: 50%;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #007acc;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }
`;

export const VisualizerArea: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'waveform' | 'spectrum' | 'volume'>('waveform');
  const [volume, setVolume] = React.useState(50);

  return (
    <VisualizerContainer>
      <VisualizerHeader>
        <span>Audio Visualizer</span>
        <VisualizerTabs>
          <Tab 
            active={activeTab === 'waveform'} 
            onClick={() => setActiveTab('waveform')}
          >
            <Waveform size={14} />
            Waveform
          </Tab>
          <Tab 
            active={activeTab === 'spectrum'} 
            onClick={() => setActiveTab('spectrum')}
          >
            <BarChart3 size={14} />
            Spectrum
          </Tab>
          <Tab 
            active={activeTab === 'volume'} 
            onClick={() => setActiveTab('volume')}
          >
            <Volume2 size={14} />
            Volume
          </Tab>
        </VisualizerTabs>
      </VisualizerHeader>
      <VisualizerContent>
        <VisualizerCanvas>
          {activeTab === 'waveform' && 'Waveform visualization will appear here'}
          {activeTab === 'spectrum' && 'Spectrum analyzer will appear here'}
          {activeTab === 'volume' && 'Volume meter will appear here'}
        </VisualizerCanvas>
        <Controls>
          <ControlGroup>
            <ControlLabel>
              <Volume2 size={16} />
              Master Volume: {volume}%
            </ControlLabel>
            <Slider
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
            />
          </ControlGroup>
        </Controls>
      </VisualizerContent>
    </VisualizerContainer>
  );
}; 