import Image from "next/image";
import Game from "@/components/Game";

export default function Home() {
  return (
   <>
    <div className="flex h-screen flex-col items-center justify-center p-24">
      <Game/>
    </div>
    </>
  );
}
