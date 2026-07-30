"use client";

import type { ReactNode } from "react";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

type GridItemProps = {
  area: string;
  icon: ReactNode;
  title: string;
  description: string;
};

function GridItem({ area, icon, title, description }: GridItemProps) {
  return (
    <li className={`min-h-[12rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-white/18 bg-white/10 p-2 backdrop-blur-sm md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={70}
          glow
          disabled={false}
          proximity={72}
          inactiveZone={0.02}
        />
        <div className="relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(7,17,34,0.78),rgba(7,17,34,0.56))] p-5 shadow-[0_18px_40px_rgba(2,11,28,0.22)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-xl border border-white/20 bg-white/10 p-2 text-white/95">
              {icon}
            </div>
            <div className="space-y-2.5">
              <h3 className="font-sans text-lg font-semibold leading-6 text-white md:text-xl">
                {title}
              </h3>
              <p className="font-sans text-sm leading-6 text-white/72 md:text-[15px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ReservationsHeroGlowMosaic() {
  return (
    <div className="w-full max-w-[620px] lg:max-w-[660px]">
      <ul className="grid grid-cols-1 grid-rows-none gap-3 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-4 w-4" />}
          title="Canaux centralisés"
          description="Airbnb, Booking et vos autres plateformes remontent dans une seule vue claire."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Settings className="h-4 w-4" />}
          title="Tarifs synchronisés"
          description="Ajustez vos prix et restrictions une fois, puis propagez-les partout sans friction."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Lock className="h-4 w-4" />}
          title="Zéro double réservation"
          description="Chaque nouvelle réservation bloque automatiquement les autres disponibilités connectées."
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Sparkles className="h-4 w-4" />}
          title="Automatisation utile"
          description="Vos équipes gardent la main sur l opérationnel pendant que Biloki gère les répétitions."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-4 w-4" />}
          title="Vision instantanée"
          description="Repérez plus vite les trous de calendrier, les arrivées clés et les actions à prioriser."
        />
      </ul>
    </div>
  );
}