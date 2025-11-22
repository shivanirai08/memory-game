"use client";

import Image from "next/image";
import Game from "@/components/Game";
import Player from "@/components/Player";

export default function Home() {
  return (
   <>
    <div className="flex h-screen flex-col items-center justify-center p-24" style={{backgroundImage: 'url("/bg.png")', backgroundSize: 'cover', backgroundPosition: '75%'  }}>
    <div className="bg-black/10 h-screen w-screen fixed z-0"></div>
      <Game/>
    </div>
    </>
  );
}
