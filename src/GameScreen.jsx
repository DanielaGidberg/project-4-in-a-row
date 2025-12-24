import React, { useEffect, useState } from "react";
import AppButton from "./AppButton.jsx";
import Board from "./Board.jsx";

function GameScreen({ rows, cols, onBack }) {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [board, setBoard] = useState([]);
    const player1Color = "#ff4444";
    const player2Color = "#ffff44";
    //לטובת הצגת אסימון נופל בלוח המשחק
    const [isAnimating, setIsAnimating] = useState(false);
    const [animRow, setAnimRow] = useState(null);
    const [animCol, setAnimCol] = useState(null);
    const [winner, setWinner] = useState(null);


    const currentColor = currentPlayer === 1 ? player1Color : player2Color;

    // יצירת לוח חדש כשנכנסים למסך או כשמשנים rows/cols
    useEffect(() => {
        const newBoard = Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(null));
        setBoard(newBoard);
        setCurrentPlayer(1);
        setWinner(null);
    }, [rows, cols]);

    const checkWinner = (b, row, col, player) => {
        // b = הלוח (מטריצה)
        // row, col = המיקום שבו הונח האסימון האחרון

        const directions = [
            [0, 1],   // כיוון אופקי (שמאלה וימינה)
            [1, 0],   // כיוון אנכי (למעלה ולמטה)
            [1, 1],   // אלכסון יורד (\)
            [1, -1],  // אלכסון עולה (/)
        ];

        // לולאה שעוברת על כל כיוון בדיקה
        for (let d = 0; d < directions.length; d++) {
            const dr = directions[d][0]; // שינוי שורה בכל צעד בכיוון הנוכחי
            const dc = directions[d][1]; // שינוי עמודה בכל צעד בכיוון הנוכחי
            let count = 1; // מתחילים מ-1 כי סופרים את האסימון האחרון שהונח

            // בדיקה קדימה בכיוון הנוכחי
            // בודקים עד 3 צעדים קדימה (כי צריך 4 בסך הכל)
            for (let i = 1; i < 4; i++) {
                const r = row + dr * i; // מחשבים את השורה הבאה לבדיקה
                const c = col + dc * i; // מחשבים את העמודה הבאה לבדיקה

                if (r < 0 || r >= rows || c < 0 || c >= cols) break; // אם יצאנו מגבולות הלוח
                if (b[r][c] !== player) break; // אם התא לא שייך לשחקן הנוכחי
                count++;
            }

            // בדיקה אחורה בכיוון ההפוך
            for (let i = 1; i < 4; i++) {
                const r = row - dr * i; // שורה בכיוון ההפוך
                const c = col - dc * i; // עמודה בכיוון ההפוך
                if (r < 0 || r >= rows || c < 0 || c >= cols) break; // אם יצאנו מגבולות הלוח
                if (b[r][c] !== player) break; // אם התא לא שייך לשחקן
                count++;
            }
            if (count >= 4) return true;
        }
        return false;
    };

    // פונקציה שמופעלת כשמשתמש לוחץ על עמודה בלוח
    // async נדרש כי אנחנו משתמשים ב-await בשביל האנימציה
    const handleColumnClick = async (col) => {
        if (winner) return;

        if (isAnimating) return;
        // אם כרגע רצה אנימציה, לא מאפשרים לחיצה נוספת
        // זה מונע הנחת כמה אסימונים במקביל

        let targetRow = -1;
        // משתנה שישמור את השורה הנמוכה ביותר הפנויה בעמודה שנלחצה

        for (let r = rows - 1; r >= 0; r--) {
            // לולאה שעוברת מהשורה התחתונה כלפי מעלה
            // כך מחקים את חוקי המשחק: אסימון תמיד נופל למטה

            if (board[r][col] === null) {
                // אם התא ריק, מצאנו מקום אפשרי לאסימון

                targetRow = r;
                // שומרים את השורה הזו כיעד

                break;
                // יוצאים מהלולאה כי אנחנו רוצים את התא הריק הראשון מלמטה
            }
        }

        if (targetRow === -1) return;
        // אם לא מצאנו שום תא פנוי, העמודה מלאה
        // במקרה כזה לא עושים כלום

        setIsAnimating(true);
        // מסמנים שמתחילה אנימציה
        // מונע לחיצות נוספות בזמן הנפילה

        setAnimCol(col);
        // שומרים באיזו עמודה מתרחשת האנימציה

        for (let r = 0; r <= targetRow; r++) {
            // לולאה שמדמה את הנפילה
            // האסימון עובר משורה 0 עד לשורה היעד

            setAnimRow(r);
            // מעדכנים באיזו שורה האסימון "נמצא כרגע" באנימציה

            await new Promise((resolve) => setTimeout(resolve, 70));
            // השהייה קצרה שיוצרת את אפקט האנימציה
            // בלי זה האנימציה הייתה קופצת ישר לשורה האחרונה
        }

        const newBoard = board.map((rowArr) => [...rowArr]);
        // יוצרים עותק חדש של הלוח
        // אסור לשנות state ישירות ב-React

        newBoard[targetRow][col] = currentPlayer;
        // מניחים את האסימון של השחקן הנוכחי במקום הסופי שלו

        const didWin = checkWinner(newBoard, targetRow, col, currentPlayer);
        if (didWin) {
            setBoard(newBoard);
            setWinner(currentPlayer);
            setAnimRow(null);
            setAnimCol(null);
            setIsAnimating(false);
            return;
        }


        setBoard(newBoard);
        // מעדכנים את ה-state של הלוח בלוח החדש

        setAnimRow(null);
        // מאפסים את שורת האנימציה
        // גורם להסרת האסימון הזמני מהמסך

        setAnimCol(null);
        // מאפסים את עמודת האנימציה

        setIsAnimating(false);
        // מסמנים שהאנימציה הסתיימה
        // מאפשרים לחיצות חדשות

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        // מחליפים תור בין שחקן 1 לשחקן 2
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
                <h1 style={{ margin: "0 0 20px 0" }}>Game Screen</h1>

                {/* מוצג רק כשאין מנצח */}
                {!winner && (
                    <p style={{ margin: "0 0 16px 0", fontSize: "18px" }}>
                        Current Player:{" "}
                        <b style={{ color: currentColor }}>
                            {currentPlayer === 1 ? "Player 1" : "Player 2"}
                        </b>
                    </p>
                )}

                {/* מוצג רק כשיש מנצח */}
                {winner && (
                    <p
                        style={{
                            margin: "0 0 20px 0",
                            fontSize: "26px",
                            fontWeight: "800",
                        }}
                    >
                        Winner:{" "}
                        <span style={{ color: currentColor }}>
                        {winner === 1 ? "Player 1" : "Player 2"}
                        </span>
                    </p>
                )}

                <Board
                    board={board}
                    rows={rows}
                    cols={cols}
                    onColumnClick={handleColumnClick}
                    animRow={animRow}
                    animCol={animCol}
                    animPlayer={currentPlayer}
                />

                <AppButton text="Back to Setup" onClick={onBack} />
            </div>
        </div>
    );
}

export default GameScreen;
