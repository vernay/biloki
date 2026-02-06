"use client";

import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("@/components/ChatBot"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <CookieBanner />
      <ChatBot />
    </>
  );
}
