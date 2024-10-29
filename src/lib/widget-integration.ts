type WidgetMessage =
  | { type: "response-callback"; response: string }
  | { type: "expired-callback" }
  | { type: "error-callback" };

const TARGET_ORIGIN = "*";

function generateResponseToken(success: boolean, secret: string): string {
  return `${success ? "SUCCESS" : "FAILURE"}_${secret}`;
}

function invokeResponseCallback(
  success: boolean,
  secret: string,
  win: Window = window.parent
) {
  const message: WidgetMessage = {
    type: "response-callback",
    response: generateResponseToken(success, secret),
  };
  win.postMessage(message, TARGET_ORIGIN);
}

function invokeExpiredCallback(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "expired-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}

function invokeErrorCallback(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "error-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}

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