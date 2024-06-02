import { ToggleButton } from 'src/atoms/Btn/ToggleButton';
import React, { useState } from 'react';
import { adjustPermission } from 'src/type/app';
import styled from 'styled-components';

const CookiePermissionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

export const CookiePermission: React.FC<adjustPermission> = ({isPermitted, setIsPermitted}) => {  
  
    return (
        <CookiePermissionContainer>
        <Label htmlFor="toggle">セッションに保存しますか</Label>
        <ToggleButton isOn={isPermitted} handleToggle={() => setIsPermitted(!isPermitted)} />
      </CookiePermissionContainer>
    );
  };