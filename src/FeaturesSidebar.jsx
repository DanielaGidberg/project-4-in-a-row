import React from "react";

function FeaturesSidebar() {
    return (
        <div
            style={{
                position: "fixed",
                top: "40px",
                right: "150px",
                width: "320px",
                padding: "14px",
                borderRadius: "12px",
                border: "2px solid #222",
                background: "rgba(0,0,0,0.04)",
                textAlign: "left",
                fontSize: "14px",
                lineHeight: "1.5",
            }}
        >
            <h2 style={{
                margin: "0 0 10px 0",
                fontSize: "16px",
                fontWeight: 700,
                textAlign: "center",
            }}>
                Implemented Features
            </h2>

            <ul style={{ margin: 0, paddingLeft: "18px" }}>
                <li>Custom board size (rows/cols) before the game starts</li>
                <li>Each player can choose a token color, players cannot select the same color</li>
                <li>When a player wins, the 4 winning tokens are highlighted</li>
                <li>A Reset Game button is available during gameplay</li>
                <li>You can play Human vs Computer (the computer “thinks” for 3 seconds)</li>
                <li>Falling animation: the token drops from the top to its final position</li>
                <li>each player has 10 seconds to play, otherwise the turn switches automatically</li>
                <li>If a player misses a winning move, a message is displayed after the move</li>

            </ul>
        </div>
    );
}

export default FeaturesSidebar;
