import { movieArrPatern } from "RecoilAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  margin: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 16px;
  appearance: none;
  background-image: url('/path/to/your/icon.svg'), linear-gradient(to bottom, #ffffff, #e5e5e5);
  background-repeat: no-repeat, repeat;
  background-position: right 10px top 50%, 0 0;
  background-size: 12px, 100%;
  cursor: pointer;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #555;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    outline: none;
  }
`;

// コンポーネントの定義
export const Dropdown: React.FC<{onChange: (ptn: string) => void}> = ({onChange}) => {
    const selectedValue = useRecoilValue(movieArrPatern);
    console.log("current selectvalue is", selectedValue);

    return (
        <SelectWrapper>
            <Select id="change-arrayment" value={selectedValue} onChange={(event) => onChange(event.target.value)}>
                <option value="">並び順</option>
                <option value="accending">昇順</option>
                <option value="descending">降順</option>
                <option value="public order">公開日（新しい）</option>
                <option value="public disorder">公開日（古い）</option>
                <option value="popularity">人気度</option>
            </Select>
        </SelectWrapper>
    );
}