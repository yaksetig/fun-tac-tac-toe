import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Square } from "@/components/Square";
import { calculateWinner } from "@/lib/game-utils";

const GAME_TIMEOUT = 60000; // 60 seconds

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [oIsNext, setOIsNext] = useState(true); // Changed to oIsNext for clarity
  const { toast } = useToast();

  useEffect(() => {
    // Set up game timeout
    const timeoutId = setTimeout(() => {
      toast({
        title: "Game Over!",
        description: "Time's up! ⏰",
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
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = oIsNext ? "O" : "X";
    setSquares(newSquares);
    setOIsNext(!oIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      toast({
        title: "Game Over!",
        description: `Player ${winner} wins! 🎉`,
      });
    } else if (newSquares.every((square) => square !== null)) {
      toast({
        title: "Game Over!",
        description: "It's a draw! 🤝",
      });
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setOIsNext(true);
    toast({
      title: "New Game",
      description: "The board has been reset! 🎮",
    });
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
      <Button
        onClick={resetGame}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700"
      >
        Reset Game
      </Button>
    </div>
  );
};

export default TicTacToe;