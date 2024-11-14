import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Square } from "@/components/Square";
import { calculateWinner } from "@/lib/game-utils";
import { invokeResponseCallback, invokeExpiredCallback, invokeErrorCallback } from "@gotcha-widget/lib";

const GAME_TIMEOUT = 60000; // 60 seconds
const SECRET_KEY = "tictactoe_secret"; // You might want to make this configurable

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [oIsNext, setOIsNext] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up game timeout
    const timeoutId = setTimeout(() => {
      console.log("Game timed out - invoking expired callback");
      invokeExpiredCallback();
      toast({
        title: "Game Over!",
        description: "Time's up! ⏰"
      });
    }, GAME_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Handle computer's move (X)
    if (!oIsNext && !calculateWinner(squares)) {
      const emptySquares = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index): index is number => index !== null);

      if (emptySquares.length > 0) {
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        setTimeout(() => {
          handleMove(randomIndex);
        }, 500);
      }
    }
  }, [oIsNext, squares]);

  const handleMove = (i: number) => {
    try {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      const newSquares = squares.slice();
      newSquares[i] = oIsNext ? "O" : "X";
      setSquares(newSquares);
      setOIsNext(!oIsNext);

      const winner = calculateWinner(newSquares);
      if (winner) {
        const playerWon = winner === "O";
        console.log(`Game ended - Player ${winner} wins - invoking response callback`);
        invokeResponseCallback(playerWon, SECRET_KEY);
        toast({
          title: "Game Over!",
          description: `Player ${winner} wins! 🎉`
        });
      } else if (newSquares.every((square) => square !== null)) {
        console.log("Game ended in draw - invoking response callback with false");
        invokeResponseCallback(false, SECRET_KEY);
        toast({
          title: "Game Over!",
          description: "It's a draw! 🤝"
        });
      }
    } catch (error) {
      console.log("Error occurred during game - invoking error callback");
      invokeErrorCallback();
      toast({
        title: "Error",
        description: "An error occurred during the game.",
        variant: "destructive"
      });
    }
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Game Draw!"
    : `Next player: ${oIsNext ? "O" : "X"}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-xl font-semibold text-indigo-900 mb-2">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {squares.map((square, i) => (
          <Square 
            key={i} 
            value={square} 
            onClick={() => oIsNext ? handleMove(i) : null} 
          />
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;