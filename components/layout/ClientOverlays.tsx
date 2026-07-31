"use client";

import { useEffect } from "react";
import ChatBotAI from "@/components/ChatBotAI";
import CookieBanner from "@/components/CookieBanner";

export default function ClientOverlays() {
  const isBilokiChatbotEnabled = process.env.NEXT_PUBLIC_ENABLE_BILOKI_CHATBOT === "true";
  const enableRemoveChildGuard = process.env.NEXT_PUBLIC_ENABLE_REMOVECHILD_GUARD === "true";

  useEffect(() => {
    if (!enableRemoveChildGuard) return;

    const w = window as Window & {
      __bilokiRemoveChildGuard?: boolean;
      __bilokiOriginalRemoveChild?: typeof Node.prototype.removeChild;
    };

    if (w.__bilokiRemoveChildGuard) return;

    w.__bilokiOriginalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function patchedRemoveChild<T extends Node>(child: T): T {
      try {
        return w.__bilokiOriginalRemoveChild!.call(this, child) as T;
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") {
          return child;
        }
        throw error;
      }
    };

    w.__bilokiRemoveChildGuard = true;
  }, [enableRemoveChildGuard]);

  return (
    <>
      <CookieBanner />
      {isBilokiChatbotEnabled ? <ChatBotAI /> : null}
    </>
  );
}

