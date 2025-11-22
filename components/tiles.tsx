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
    return(
        <div 
            className={`w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-all duration-500 transform ${
                props.disabled ? 'pointer-events-none' : ''
            }`}
            onClick={!props.disabled ? props.onClick : undefined}
            style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: props.isFlipped || props.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            
        >
         {props.isFlipped || props.isMatched ? (
            <Image
                src={props.image}
                alt="Tile Image"
                width={64}
                height={64}
                className={`w-16 h-16 ${props.isMatched ? 'opacity-80' : ''}`}
                style={{ transform: 'rotateY(180deg)' }}
            />
         ) : (
            <div></div>
         )}
        </div>
    )
}