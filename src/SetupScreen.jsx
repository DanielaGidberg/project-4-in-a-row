import React, { useState } from "react";
// 🔴 שינוי/הוספה: הוספנו useState כדי לשמור ערכים מהקלטים

import AppButton from "./AppButton.jsx";
import AppInput from "./AppInput.jsx";

function SetupScreen({ onStart }) {

    const [rows, setRows] = useState(6);
    const [cols, setCols] = useState(7);

    const handleStart = () => {
        onStart(rows, cols);
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "40px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div style={{ width: "360px", textAlign: "center" }}>
                <h1 style={{ margin: "0 0 24px 0" }}>
                    4 In a Row - Setup
                </h1>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AppInput
                        label="Rows:"
                        type="number"
                        min={4}
                        max={10}
                        value={rows}
                        // 🔴 שינוי: במקום defaultValue – עכשיו value מגיע מה-state
                        onChange={(e) => setRows(parseInt(e.target.value))}
                        // 🔴 חדש: כל שינוי בקלט מעדכן את ה-state
                    />

                    <AppInput
                        label="Columns:"
                        type="number"
                        min={4}
                        max={12}
                        value={cols}
                        // 🔴 שינוי: גם כאן value מגיע מה-state
                        onChange={(e) => setCols(parseInt(e.target.value))}
                        // 🔴 חדש: עדכון state של cols
                    />

                    <AppButton text="Start Game" onClick={handleStart} />

                </div>
            </div>
        </div>
    );
}

export default SetupScreen;
