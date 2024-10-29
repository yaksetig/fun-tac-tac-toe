import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Square } from "@/components/Square";
import { calculateWinner } from "@/lib/game-utils";
import { handleGameEnd, handleGameError, handleGameTimeout } from "@/lib/widget-integration";

const GAME_TIMEOUT = 60000; // 60 seconds

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up game timeout
    const timeoutId = setTimeout(() => {
      handleGameTimeout();
      toast({
        title: "Game Over!",
        description: "Time's up! ⏰",
      });
    }, GAME_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Handle computer's move (O)
    if (!xIsNext && !calculateWinner(squares)) {
      const emptySquares = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index): index is number => index !== null);

      if (emptySquares.length > 0) {
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        setTimeout(() => {
          handleMove(randomIndex);
        }, 500); // Add a small delay to make it feel more natural
      }
    }
  }, [xIsNext, squares]);

  const handleMove = (i: number) => {
    try {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      const newSquares = squares.slice();
      newSquares[i] = xIsNext ? "X" : "O";
      setSquares(newSquares);
      setXIsNext(!xIsNext);

      const winner = calculateWinner(newSquares);
      if (winner) {
        handleGameEnd(winner);
        toast({
          title: "Game Over!",
          description: `Player ${winner} wins! 🎉`,
        });
      } else if (newSquares.every((square) => square !== null)) {
        handleGameEnd(null);
        toast({
          title: "Game Over!",
          description: "It's a draw! 🤝",
        });
      }
    } catch (error) {
      handleGameError();
      toast({
        title: "Error",
        description: "An error occurred while playing the game",
        variant: "destructive",
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

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Game Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-xl font-semibold text-indigo-900 mb-2">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {squares.map((square, i) => (
          <Square 
            key={i} 
            value={square} 
            onClick={() => xIsNext ? handleMove(i) : null} 
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