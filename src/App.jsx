import React, { useState } from "react";
import SetupScreen from "./SetupScreen.jsx";
import GameScreen from "./GameScreen.jsx";



function App() {
    const [screen, setScreen] = useState("setup");
    const [rows, setRows] = useState(6);
    const [cols, setCols] = useState(7);
    const [gameMode, setGameMode] = useState("human");

    const [player1Color, setPlayer1Color] = useState("#ff4444");
    const [player2Color, setPlayer2Color] = useState("#ffff44");

    const startGame = (chosenRows, chosenCols, c1, c2, mode) => { // ⭐ שינוי
        setRows(chosenRows);
        setCols(chosenCols);
        setPlayer1Color(c1);
        setPlayer2Color(c2);
        setGameMode(mode);
        setScreen("game");
    };


    const goBackToSetup = () => {
        setScreen("setup");
    };

    return (
        <>
            {screen === "setup" ? (
                <SetupScreen onStart={startGame} />
            ) : (
                <GameScreen
                    rows={rows}
                    cols={cols}
                    player1Color={player1Color}
                    player2Color={player2Color}
                    gameMode={gameMode}
                    onBack={goBackToSetup}
                />

            )}
        </>
    );
}

export default App;
