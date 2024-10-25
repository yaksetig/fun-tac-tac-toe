export type RenderParams = {
  sitekey: string;
  theme?: "dark" | "light";
  size?: "compact" | "normal" | "invisible";
  badge?: "bottomright" | "bottomleft" | "inline";
  tabindex?: number;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  isolated?: boolean;
};

export type WidgetMessage =
  | { type: "response-callback"; response: string }
  | { type: "expired-callback" }
  | { type: "error-callback" };

export const defaultRenderParams: RenderParams = {
  sitekey: "",
  theme: "light",
  size: "normal",
  badge: "bottomright",
  tabindex: 0,
  isolated: false,
};