import React, { useEffect, useState } from "react";
import AppButton from "./AppButton.jsx";
import Board from "./Board.jsx";

function GameScreen({ rows, cols, player1Color, player2Color, gameMode, onBack }) {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [board, setBoard] = useState([]);

    const [isAnimating, setIsAnimating] = useState(false);
    const [isComputerThinking, setIsComputerThinking] = useState(false);

    const [animRow, setAnimRow] = useState(null);
    const [animCol, setAnimCol] = useState(null);

    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);

    const [missMessage, setMissMessage] = useState("");

    const [missColor, setMissColor] = useState("#222");

    const [turnTimeLeft, setTurnTimeLeft] = useState(10);

    const currentColor = currentPlayer === 1 ? player1Color : player2Color;

    const createEmptyBoard = () => {
        return Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(null));
    };

    const initGame = () => {
        setBoard(createEmptyBoard());
        setCurrentPlayer(1);
        setWinner(null);
        setWinningCells([]);
        setIsAnimating(false);
        setIsComputerThinking(false);
        setAnimRow(null);
        setAnimCol(null);
        setTurnTimeLeft(10);
        setMissMessage("");
        setMissColor("#222");
    };


    // אתחול משחק כשנכנסים למסך או משנים rows/cols
    useEffect(() => {
        initGame();
    }, [rows, cols]);

    const resetGame = () => {
        initGame();
    };

    // טיימר לתצוגת ההודעה של הפיספוס
    useEffect(() => {
        if (!missMessage) return;

        const id = setTimeout(() => {
            setMissMessage("");
        }, 2500);

        return () => clearTimeout(id);
    }, [missMessage]);

    // טיימר תור
    useEffect(() => {
        if (winner) return;
        if (isAnimating) return;
        if (turnTimeLeft <= 0) {
            if (gameMode === "computer" && currentPlayer === 2) {
                return;
            }
            setCurrentPlayer((p) => (p === 1 ? 2 : 1));
            setTurnTimeLeft(10);
            return;
        }

        const timerId = setTimeout(() => {
            setTurnTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [turnTimeLeft, winner, isAnimating, isComputerThinking]);

    // מחזיר את הרביעייה המנצחת (בדיוק 4 תאים) או null
    const getWinningLine = (b, row, col, player) => {
        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1],
        ];

        for (let d = 0; d < directions.length; d++) {
            const [dr, dc] = directions[d];

            const line = [{ row, col }];

            // קדימה
            for (let i = 1; i < 4; i++) {
                const r = row + dr * i;
                const c = col + dc * i;
                if (r < 0 || r >= rows || c < 0 || c >= cols) break;
                if (b[r][c] !== player) break;
                line.push({ row: r, col: c });
            }

            // אחורה
            for (let i = 1; i < 4; i++) {
                const r = row - dr * i;
                const c = col - dc * i;
                if (r < 0 || r >= rows || c < 0 || c >= cols) break;
                if (b[r][c] !== player) break;
                line.unshift({ row: r, col: c });
            }

            if (line.length >= 4) {
                const idx = line.findIndex((p) => p.row === row && p.col === col);
                let start = Math.max(0, idx - 3);
                if (start + 4 > line.length) start = line.length - 4;
                return line.slice(start, start + 4);
            }
        }

        return null;
    };

    // עמודות חוקיות (למחשב)
    const getValidColumns = () => {
        const valid = [];
        for (let c = 0; c < cols; c++) {
            if (board[0]?.[c] === null) valid.push(c);
        }
        return valid;
    };

    const getDropRow = (b, col) => {
        for (let r = rows - 1; r >= 0; r--) {
            if (b[r][col] === null) return r;
        }
        return -1; // עמודה מלאה
    };

    const getWinningMovesForPlayer = (b, player) => {
        const winningMoves = [];

        for (let c = 0; c < cols; c++) {
            if (b[0]?.[c] !== null) continue; // עמודה מלאה

            const r = getDropRow(b, c);
            if (r === -1) continue;

            const copy = b.map((rowArr) => [...rowArr]);
            copy[r][c] = player;

            const line = getWinningLine(copy, r, c, player);
            if (line) {
                winningMoves.push({ row: r, col: c, line });
            }
        }

        return winningMoves;
    };

    // פונקציית ליבה: מניחה אסימון (גם לאדם וגם למחשב)
    const placeToken = async (col) => {
        if (winner) return;
        if (isAnimating) return;

        setMissMessage("");
        setMissColor("#222");

        const winningMovesBefore = getWinningMovesForPlayer(board, currentPlayer); //כל המהלכים שהיו מנצחים אם היו שמים.
        const hadWinningMoveBefore = winningMovesBefore.length > 0; //האם בכלל היה משהו לנצח
        const winningColsBefore = winningMovesBefore.map((m) => m.col); //רק העמודות המנצחות (לבדיקה פשוטה).
        const choseAWinningCol = winningColsBefore.includes(col); //האם השחקן באמת בחר באחת העמודות המנצחות.

        const targetRow = getDropRow(board, col);
        if (targetRow === -1) return;

        // אנימציה
        setIsAnimating(true);
        setAnimCol(col);

        for (let r = 0; r <= targetRow; r++) {
            setAnimRow(r);
            await new Promise((resolve) => setTimeout(resolve, 70));
        }

        const newBoard = board.map((rowArr) => [...rowArr]);
        newBoard[targetRow][col] = currentPlayer;

        const winningLine = getWinningLine(newBoard, targetRow, col, currentPlayer);

        if (!winningLine && hadWinningMoveBefore && !choseAWinningCol) {
            setMissMessage("You missed a winning move!");
            setMissColor(currentPlayer === 1 ? player1Color : player2Color);
        }

        if (winningLine) {
            setBoard(newBoard);
            setWinner(currentPlayer);
            setWinningCells(winningLine);

            setAnimRow(null);
            setAnimCol(null);
            setIsAnimating(false);
            return;
        }

        setBoard(newBoard);

        setAnimRow(null);
        setAnimCol(null);
        setIsAnimating(false);

        setCurrentPlayer((p) => (p === 1 ? 2 : 1));
        setTurnTimeLeft(10);
    };

    // קליק של אדם בלבד
    const handleHumanClick = (col) => {
        if (winner) return;
        if (isAnimating) return;
        if (gameMode === "computer" && currentPlayer === 2) return;
        if (isComputerThinking) return;

        void placeToken(col);
    };

    // מהלך מחשב
    const makeComputerMove = async () => {
        if (gameMode !== "computer") return;
        if (currentPlayer !== 2) return;
        if (winner) return;
        if (isAnimating) return;

        setIsComputerThinking(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        // אם בינתיים משהו השתנה
        if (winner || isAnimating || currentPlayer !== 2) {
            setIsComputerThinking(false);
            return;
        }

        const validCols = getValidColumns();
        if (validCols.length === 0) {
            setIsComputerThinking(false);
            return;
        }

        const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
        await placeToken(randomCol);

        setIsComputerThinking(false);
    };

    // מפעיל מחשב כשהוא בתור
    useEffect(() => {
        if (gameMode === "computer" && currentPlayer === 2 && !winner && !isAnimating) {
            void makeComputerMove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameMode, currentPlayer, winner, isAnimating, board]);

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
            <div style={{
                width: "fit-content",
                textAlign: "center",
                background: "#fff",
                borderRadius: "18px",
                padding: "24px 24px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            }}>
                {/*<h1 style={{ margin: "0 0 12px 0", fontSize: "28px" }}>*/}
                {/*    משחק 4 בשורה*/}
                {/*</h1>*/}


                {!winner && (
                    <div style={{
                        marginBottom: "16px",
                        padding: "10px",
                        borderRadius: "12px",
                        background: "rgba(0,0,0,0.04)",
                    }}>
                        <div style={{ fontSize: "18px" }}>
                            Current Player:{" "}
                            <b style={{ color: currentColor }}>
                                {currentPlayer === 1
                                    ? "Player 1"
                                    : gameMode === "computer"
                                        ? "Computer"
                                        : "Player 2"}
                            </b>
                        </div>

                        <div style={{ fontSize: "14px", opacity: 0.8 }}>
                            Time left: <b>{turnTimeLeft}s</b>
                        </div>
                    </div>
                )}

                {winner && (
                    <p style={{ margin: 0, fontSize: "26px", fontWeight: "900", color: currentColor }}>
                        Winner:{" "}
                        {winner === 1 ? "Player 1" : gameMode === "computer" ? "Computer" : "Player 2"}
                    </p>
                )}

                <Board
                    board={board}
                    rows={rows}
                    cols={cols}
                    onColumnClick={handleHumanClick}
                    animRow={animRow}
                    animCol={animCol}
                    animPlayer={currentPlayer}
                    player1Color={player1Color}
                    player2Color={player2Color}
                    winningCells={winningCells}
                />

                {/* Missed move message area */}
                <div
                    style={{
                        marginTop: "8px",
                        minHeight: "32px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {missMessage && (
                        <div
                            style={{
                                maxWidth: "260px",
                                padding: "6px 10px",
                                borderRadius: "8px",
                                background: missColor,
                                opacity: 0.85,
                                fontWeight: 800,
                                fontSize: "13px",
                                textAlign: "center",
                                lineHeight: "1.3",
                                color: "#000",
                                border: "2px solid #000",
                            }}
                        >
                            {missMessage}
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                }}>
                    <AppButton text="Reset Game" onClick={resetGame} />
                    <AppButton text="Back to Setup" onClick={onBack} />
                </div>
            </div>
        </div>
    );
}

export default GameScreen;
