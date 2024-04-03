import { AllScrollData } from "RecoilAtom";
import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { createImg } from "customHooks";

export const SeriesDetail: React.FC = () => {
    const location = useLocation();
    const AllData = useRecoilValue(AllScrollData);
    const queryParams = new URLSearchParams(location.search);
    const resourceType = queryParams.get('resourceType');
    const index = Number(queryParams.get('index'));

    const SeriesData = AllData[resourceType][index];

    return (
        <div>hello, series</div>
    );
}