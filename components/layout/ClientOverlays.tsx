"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const ChatBot = dynamic(() => import("@/components/ChatBotAI"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

export default function ClientOverlays() {
  const isBilokiChatbotEnabled = process.env.NEXT_PUBLIC_ENABLE_BILOKI_CHATBOT === "true";

  useEffect(() => {
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
  }, []);

  return (
    <>
      <CookieBanner />
      {isBilokiChatbotEnabled ? <ChatBot /> : null}
    </>
  );
}

