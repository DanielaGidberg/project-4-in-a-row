import React, { useState } from "react";

import AppButton from "./AppButton.jsx";
import AppInput from "./AppInput.jsx";

const COLORS = [
    { name: "Red", value: "#ff4444" },
    { name: "Blue", value: "#4444ff" },
    { name: "Green", value: "#44ff44" },
    { name: "Yellow", value: "#ffff44" },
    { name: "Purple", value: "#ff44ff" },
    { name: "Orange", value: "#ff8844" },
];

function SetupScreen({ onStart }) {

    const [rows, setRows] = useState(6);
    const [cols, setCols] = useState(7);
    const [gameMode, setGameMode] = useState("human");

    const [player1Color, setPlayer1Color] = useState("#ff4444");//שמירת הצבע שכל שחקן בחר
    const [player2Color, setPlayer2Color] = useState("#ffff44");

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
                        marginBottom: "18px",
                        padding: "14px",
                        borderRadius: "12px",
                        border: "2px solid #222",
                        background: "rgba(0,0,0,0.04)",
                        textAlign: "left",
                        fontSize: "14px",
                        lineHeight: "1.5",
                    }}
                >
                    <h2 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>What this app supports</h2>
                    <ul style={{ margin: 0, paddingLeft: "18px" }}>
                        <li>Custom board size (rows/cols) before the game starts</li>
                        <li>2 human players taking turns</li>
                        <li>Token “gravity” (token always falls to the lowest empty cell)</li>
                        <li>Winner detection (4 in a row)</li>
                        <li>Falling animation</li>
                    </ul>

                    <p style={{ margin: "10px 0 0 0", fontWeight: 700 }}>
                        Next steps: colors, reset, undo, timers, replay (as required by the assignment)
                    </p>
                </div>


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
