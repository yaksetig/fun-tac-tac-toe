import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Square } from "@/components/Square";
import { calculateWinner } from "@/lib/game-utils";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { toast } = useToast();

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Game Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      toast({
        title: "Game Over!",
        description: `Player ${gameWinner} wins! 🎉`,
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
    setXIsNext(true);
    toast({
      title: "New Game",
      description: "The board has been reset! 🎮",
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-xl font-semibold text-indigo-900 mb-2">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
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