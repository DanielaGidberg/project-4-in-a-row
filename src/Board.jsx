import React from "react";

// קומפוננטה שמציירת את לוח המשחק
// מקבלת את הלוח עצמו, גודל הלוח, פונקציה ללחיצה על עמודה
// ונתונים שקשורים לאנימציית הנפילה
function Board({ board, rows, cols, onColumnClick, animRow, animCol, animPlayer, player1Color, player2Color, winningCells }) {

    const boardStyle = {
        // אובייקט עיצוב ללוח עצמו (ה-container של כל התאים)
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 56px)`,
        gridTemplateColumns: `repeat(${cols}, 56px)`,
        gap: "8px",
        marginTop: "20px",
        padding: "20px",
        borderRadius: "26px",
        background: "linear-gradient(180deg, #1e4fa8, #143a7a)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        border: "3px solid rgba(0,0,0,0.25)",
    };

    const getCellColor = (value) => {
        if (value === 1) return player1Color;
        if (value === 2) return player2Color;
        return "#e6e6e6";
    };

    const getAnimColor = () => {
        if (animPlayer === 1) return player1Color;
        if (animPlayer === 2) return player2Color;
        return "#e6e6e6";
    };

    return (
            <div style={boardStyle}>
                {/* זה ה-container של כל הלוח, עם העיצוב שהגדרנו */}

                {board.map((row, rowIndex) =>
                    // מעבר על כל שורה במטריצה של הלוח
                    // rowIndex הוא מספר השורה

                    row.map((cell, colIndex) => {
                        // מעבר על כל תא בשורה הנוכחית
                        // cell הוא הערך של התא (null / 1 / 2)
                        // colIndex הוא מספר העמודה

                        const isAnimatingCell =
                            animRow === rowIndex && animCol === colIndex;
                        // בודק אם התא הנוכחי הוא התא שבו נמצא האסימון בזמן האנימציה

                        const isWinningCell = winningCells?.some(
                            (p) => p.row === rowIndex && p.col === colIndex
                        );

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => onColumnClick(colIndex)}

                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    backgroundColor: getCellColor(cell),
                                    border: isWinningCell ? "4px solid #111" : "1px solid #bbb",
                                    cursor: "pointer",
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: isWinningCell ? "0 0 10px rgba(0,0,0,0.45)" : "none",
                                    transform: isWinningCell ? "scale(1.05)" : "scale(1)"

                                }}
                            >
                                {isAnimatingCell && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: "50%",
                                            backgroundColor: getAnimColor(),
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>

    );
}

export default Board;
