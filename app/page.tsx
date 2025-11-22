import Image from "next/image";
import Game from "@/components/Game";

export default function Home() {
  return (
   <>
    <div className="flex h-screen flex-col items-center justify-center p-24" style={{backgroundImage: 'url("/bg.png")', backgroundSize: 'cover', backgroundPosition: '75%'  }}>
    <div className="bg-black/10 h-screen w-screen fixed "></div>
      <Game/>
    </div>
    </>
  );
}
