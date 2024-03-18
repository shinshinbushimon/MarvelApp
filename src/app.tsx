import React from "react";
import { createRoot } from "react-dom/client";
import { BaseBtn } from "./atoms/BaseBtn";

const App: React.FC = () => {
    return (
        <>
            <BaseBtn btnColor="#007bff">これはテストボタンです。</BaseBtn>
        </>
    );
}

const container = document.getElementById("root")! as HTMLDivElement;
const root = createRoot(container);
root.render(<App />);

