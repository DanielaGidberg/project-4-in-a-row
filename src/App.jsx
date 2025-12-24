import React, { useState } from "react";
// מייבא את React ואת useState כדי שנוכל לשמור מצב באפליקציה

import SetupScreen from "./SetupScreen.jsx";
// מייבא את קומפוננטת מסך ההגדרות

import GameScreen from "./GameScreen.jsx";
// מייבא את קומפוננטת מסך המשחק

function App() {
    // מגדיר קומפוננטת React בשם App שהיא הקומפוננטה הראשית של האפליקציה

    const [screen, setScreen] = useState("setup");
    // שומר איזה מסך מוצג כרגע
    // הערך ההתחלתי הוא setup ולכן בהתחלה נראה את מסך ההגדרות

    const [rows, setRows] = useState(6);
    // שומר את מספר השורות של הלוח שנבחר במסך ההגדרות

    const [cols, setCols] = useState(7);
    // שומר את מספר העמודות של הלוח שנבחר במסך ההגדרות

    const startGame = (chosenRows, chosenCols) => {
        // פונקציה שמופעלת כשנלחץ כפתור Start Game במסך ההגדרות

        setRows(chosenRows);
        // מעדכן את מספר השורות לפי מה שהמשתמש בחר

        setCols(chosenCols);
        // מעדכן את מספר העמודות לפי מה שהמשתמש בחר

        setScreen("game");
        // משנה את המסך הנוכחי למסך המשחק
    };

    const goBackToSetup = () => {
        // פונקציה שמופעלת כשרוצים לחזור ממסך המשחק למסך ההגדרות

        setScreen("setup");
        // משנה את המסך חזרה למסך ההגדרות
    };

    return (
        <>
            {screen === "setup" ? (
                // בודק אם המסך הנוכחי הוא setup

                <SetupScreen onStart={startGame} />
                // אם כן מציג את מסך ההגדרות
                // ומעביר אליו פונקציה שתופעל כשלוחצים Start Game
            ) : (
                <GameScreen
                    rows={rows}
                    // מעביר למסך המשחק את מספר השורות שנבחר

                    cols={cols}
                    // מעביר למסך המשחק את מספר העמודות שנבחר

                    onBack={goBackToSetup}
                    // מעביר פונקציה שמאפשרת לחזור למסך ההגדרות
                />
            )}
        </>
    );
}

export default App;
// מייצא את הקומפוננטה App כדי ש־main.jsx יוכל להשתמש בה
