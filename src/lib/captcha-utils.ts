const TARGET_ORIGIN = "*";

export function invokeResponseCallback(
  success: boolean,
  secret: string,
  win: Window = window.parent,
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

function generateResponseToken(success: boolean, secret: string): string {
  return success ? `${secret}__no-shit-sherlock` : `${secret}__L-bozo`;
}

import { type WidgetMessage } from './captcha-types';