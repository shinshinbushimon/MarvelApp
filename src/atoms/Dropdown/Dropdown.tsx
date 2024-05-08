import { movieArrPatern } from "RecoilAtom";
import React from "react";
import { useRecoilValue } from "recoil";

export const Dropdown: React.FC<{onChange: (ptn: string) => void}> = ({onChange}) => {
    const selectedValue = useRecoilValue(movieArrPatern);
    console.log("current selectvalue is", selectedValue);
    return (
        <div>
            <select id="change-arrayment" value={selectedValue} onChange={(event) => onChange(event.target.value)}>
                <option value="">並び順</option>
                <option value="accending">昇順</option>
                <option value="descending">降順</option>
                <option value="public order">公開日（新しい）</option>
                <option value="public disorder">公開日（古い）</option>
                <option value="popularity">人気度</option>
            </select>
        </div>
    );
}