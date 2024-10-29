export const TARGET_ORIGIN = "*";

interface WidgetMessage {
  type: "response-callback" | "expired-callback" | "error-callback";
  response?: string;
}

export function generateResponseToken(success: boolean, secret: string): string {
  return `${success ? "SUCCESS" : "FAILURE"}_${secret}`;
}

export function invokeResponseCallback(
  success: boolean,
  secret: string,
  win: Window = window.parent
) {
  const message: WidgetMessage = {
    type: "response-callback",
    response: generateResponseToken(success, secret || "not_found"),
  };
  win.postMessage(message, TARGET_ORIGIN);
}

export function invokeExpiredCallback(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "expired-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}

export function invokeErrorCallback(win: Window = window.parent) {
  const message: WidgetMessage = {
    type: "error-callback",
  };
  win.postMessage(message, TARGET_ORIGIN);
}