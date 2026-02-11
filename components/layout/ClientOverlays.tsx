"use client";

import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

export default function ClientOverlays() {
  const isBilokiChatbotEnabled = process.env.NEXT_PUBLIC_ENABLE_BILOKI_CHATBOT === "true";

  return (
    <>
      <CookieBanner />
      {isBilokiChatbotEnabled ? <ChatBot /> : null}
    </>
  );
}
