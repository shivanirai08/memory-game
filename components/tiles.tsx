"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TileProps {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick: () => void;
    disabled: boolean;
}

export default function Tile(props: TileProps){
    const [shake, setShake] = useState(false);
    const [scale, setScale] = useState(false);

    useEffect(() => {
        if (props.isMatched && props.isFlipped) {
            setScale(true);
            setTimeout(() => setScale(false), 500);
        }
    }, [props.isMatched]);

    useEffect(() => {
        // Trigger shake when tile is flipped but about to be unflipped (not matched)
        if (props.isFlipped && !props.isMatched && props.disabled) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }, [props.disabled, props.isFlipped, props.isMatched]);

    return(
        <div 
            className={`w-24 h-24 rounded-lg shadow-md flex items-center backdrop-blur-xl justify-center cursor-pointer transition-all duration-500 transform ${
                props.disabled ? 'pointer-events-none' : ''
            } ${ props.isMatched ? 'bg-purple-200/50' : 'bg-white/20' }`}
            onClick={!props.disabled ? props.onClick : undefined}
            style={{
                transformStyle: 'preserve-3d',
                transition: shake ? 'none' : 'transform 0.6s',
                transform: props.isFlipped || props.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                animation: shake ? 'shake 0.5s' : scale ? 'scale 0.5s' : 'none'
            }}
            
        >
         {props.isFlipped || props.isMatched ? (
            <Image
                src={props.image}
                alt="Tile Image"
                width={64}
                height={64}
                className="w-16 h-16"
                style={{ transform: 'rotateY(180deg)' }}
            />
         ) : (
            <div></div>
         )}
         <style jsx>{`
           @keyframes shake {
             0%, 100% { transform: translateX(0) rotateY(180deg); }
             25% { transform: translateX(-8px) rotateY(180deg); }
             50% { transform: translateX(8px) rotateY(180deg); }
             75% { transform: translateX(-8px) rotateY(180deg); }
           }
           @keyframes scale {
             0%, 100% { transform: scale(1) rotateY(180deg); }
             50% { transform: scale(1.1) rotateY(180deg); }
           }
         `}</style>
        </div>
    )
}