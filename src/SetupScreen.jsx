import React, { useState } from "react";

import AppButton from "./AppButton.jsx";
import AppInput from "./AppInput.jsx";
import FeaturesSidebar from "./FeaturesSidebar.jsx";

const COLORS = [
    { name: "Red", value: "#ff4444" },
    { name: "Blue", value: "#4444ff" },
    { name: "Green", value: "#44ff44" },
    { name: "Yellow", value: "#ffec00" },
    { name: "Purple", value: "#ff44ff" },
    { name: "Orange", value: "#ff8844" },
];

function SetupScreen({ onStart }) {

    const [rows, setRows] = useState(6);
    const [cols, setCols] = useState(7);
    const [gameMode, setGameMode] = useState("human");

    const [player1Color, setPlayer1Color] = useState("#ff4444");//שמירת הצבע שכל שחקן בחר
    const [player2Color, setPlayer2Color] = useState("#ffec00");

    const handleStart = () => {
        onStart(rows, cols, player1Color, player2Color, gameMode);
    };

    // פונקציה שמגדירה עיצוב לכפתורי הצבעים
    const colorButtonStyle = (selected, disabled, color) => ({
        width: "90px",
        padding: "8px 10px",
        margin: "6px",
        borderRadius: "10px",
        border: selected ? "3px solid #222" : "1px solid #bbb",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "700",
        opacity: disabled ? 0.35 : 1,
        backgroundColor: color,
    });

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "16px",
                fontFamily: "Arial, sans-serif",
                background: "linear-gradient(180deg, #f2f4f8, #e6e9f0)",
            }}
        >
            <FeaturesSidebar />

            <div style={{
                width: "360px",
                textAlign: "center",
                background: "#fff",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                marginRight: "340px",
            }}>
                <h1 style={{ margin: "0 0 12px 0", fontSize: "28px"}}>
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
                        onChange={(e) => setRows(parseInt(e.target.value))}
                    />

                    <AppInput
                        label="Columns:"
                        type="number"
                        min={4}
                        max={12}
                        value={cols}
                        onChange={(e) => setCols(parseInt(e.target.value))}
                    />

                    {/* בחירת שחקן או מחשב */}
                    <div style={{ marginTop: "18px", width: "100%", textAlign: "left" }}>
                        <h3 style={{ margin: "0 0 8px 0" }}>Game Mode</h3>

                        <label style={{ display: "block", marginBottom: "8px" }}>
                            <input
                                type="radio"
                                name="mode"
                                value="human"
                                checked={gameMode === "human"}
                                onChange={(e) => setGameMode(e.target.value)}
                            />
                            {" "}Human vs Human
                        </label>

                        <label style={{ display: "block" }}>
                            <input
                                type="radio"
                                name="mode"
                                value="computer"
                                checked={gameMode === "computer"}
                                onChange={(e) => setGameMode(e.target.value)}
                            />
                            {" "}Human vs Computer
                        </label>
                    </div>

                    {/* בחירת צבע לשחקן 1 */}
                    <div style={{ marginTop: "18px", width: "100%", textAlign: "left" }}>
                        <h3>Player 1 color</h3>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {COLORS.map((color) => {
                                const selected = player1Color === color.value;
                                const disabled = player2Color === color.value; // ⭐ חדש: נעילה אם שחקן 2 בחר
                                return (
                                    <button
                                        key={color.value}
                                        type="button"
                                        style={colorButtonStyle(selected, disabled, color.value)}
                                        disabled={disabled}
                                        onClick={() => setPlayer1Color(color.value)}
                                    >
                                        {color.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* בחירת צבע לשחקן 2 */}
                    <div style={{ marginTop: "12px", width: "100%", textAlign: "left" }}>
                        <h3>Player 2 color</h3>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {COLORS.map((color) => {
                                const selected = player2Color === color.value;
                                const disabled = player1Color === color.value; // ⭐ חדש: נעילה אם שחקן 1 בחר
                                return (
                                    <button
                                        key={color.value}
                                        type="button"
                                        style={colorButtonStyle(selected, disabled, color.value)}
                                        disabled={disabled}
                                        onClick={() => setPlayer2Color(color.value)}
                                    >
                                        {color.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <AppButton text="Start Game" onClick={handleStart} />

                </div>
            </div>
        </div>
    );
}

export default SetupScreen;
