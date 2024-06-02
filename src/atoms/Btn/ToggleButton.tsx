import { ToggleButtonProps } from 'src/type/app';
import React from 'react';
import styled from 'styled-components';

const ToggleButtonContainer = styled.div<{ isOn: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => (props.isOn ? 'green' : 'red')};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ToggleCircle = styled.div<{ isOn: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s;
  transform: ${props => (props.isOn ? 'translateX(30px)' : 'translateX(2px)')};
`;

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isOn, handleToggle }) => {
    return (
        <ToggleButtonContainer isOn={isOn} onClick={handleToggle}>
        <ToggleCircle isOn={isOn} />
      </ToggleButtonContainer>
    );
  };