import React from "react";

// קומפוננטה שמציירת את לוח המשחק
// מקבלת את הלוח עצמו, גודל הלוח, פונקציה ללחיצה על עמודה
// ונתונים שקשורים לאנימציית הנפילה
function Board({ board, rows, cols, onColumnClick, animRow, animCol, animPlayer }) {

    const boardStyle = {
        // אובייקט עיצוב ללוח עצמו (ה-container של כל התאים)
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 50px)`,
        gridTemplateColumns: `repeat(${cols}, 50px)`,
        gap: "8px",
        justifyContent: "center",
        marginTop: "20px",
    };

    const getCellColor = (value) => {
        // פונקציה שמחזירה צבע לפי הערך הקבוע של התא בלוח
        if (value === 1) return "#ff4444";
        if (value === 2) return "#ffff44";
        return "#e6e6e6";
    };

    const getAnimColor = () => {
        // פונקציה שמחזירה את צבע האסימון בזמן אנימציה
        if (animPlayer === 1) return "#ff4444";
        if (animPlayer === 2) return "#ffff44";
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

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            // מזהה ייחודי לתא כדי ש-React ידע לעקוב אחריו

                            onClick={() => onColumnClick(colIndex)}
                            // לחיצה על תא מפעילה פעולה לפי העמודה שלו

                            style={{
                                width: "50px",
                                // רוחב התא

                                height: "50px",
                                // גובה התא

                                borderRadius: "50%",
                                // הופך את התא לעיגול

                                backgroundColor: getCellColor(cell),
                                // צבע התא לפי הערך הקבוע בלוח

                                border: "1px solid #bbb",
                                // מסגרת דקה מסביב לתא

                                cursor: "pointer",
                                // מציג יד כשעוברים עם העכבר

                                position: "relative",
                                // מאפשר לשים אלמנט פנימי במיקום מוחלט

                                overflow: "hidden",
                                // מונע מהאנימציה לגלוש מחוץ לעיגול
                            }}
                        >
                            {isAnimatingCell && (
                                // אם התא הזה משתתף באנימציה

                                <div
                                    style={{
                                        position: "absolute",
                                        // ממקם את האסימון ביחס לתא

                                        inset: 0,
                                        // גורם לאסימון למלא את כל התא

                                        borderRadius: "50%",
                                        // שומר על צורה עגולה

                                        backgroundColor: getAnimColor(),
                                        // צבע האסימון בזמן האנימציה
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
