import { useEffect, useRef } from 'react';
import { type RenderParams, defaultRenderParams } from '@/lib/captcha-types';
import { invokeResponseCallback, invokeExpiredCallback, invokeErrorCallback } from '@/lib/captcha-utils';

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpired?: () => void;
  onError?: () => void;
  theme?: "dark" | "light";
}

export const Captcha = ({ onVerify, onExpired, onError, theme = "light" }: CaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const params: RenderParams = {
      ...defaultRenderParams,
      sitekey: import.meta.env.VITE_CAPTCHA_SITE_KEY || "demo_site_key",
      theme,
      callback: (token) => {
        onVerify(token);
        invokeResponseCallback(true, token);
      },
      "expired-callback": () => {
        onExpired?.();
        invokeExpiredCallback();
      },
      "error-callback": () => {
        onError?.();
        invokeErrorCallback();
      }
    };

    // Simulate CAPTCHA widget rendering
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="p-4 border rounded-lg bg-white shadow-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border rounded"></div>
            <span>I'm not a robot</span>
          </div>
        </div>
      `;
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [onVerify, onExpired, onError, theme]);

  return <div ref={containerRef} className="captcha-container" />;
};