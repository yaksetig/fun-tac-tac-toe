import { invokeResponseCallback, invokeErrorCallback, invokeExpiredCallback } from "@gotcha-widget/lib";

export const handleGameEnd = (winner: string | null) => {
  if (winner === "X") {
    // Player won
    invokeResponseCallback(true, "game_won");
  } else if (winner === "O") {
    // Computer won
    invokeResponseCallback(false, "game_lost");
  }
};

export const handleGameError = () => {
  invokeErrorCallback();
};

export const handleGameTimeout = () => {
  invokeExpiredCallback();
};