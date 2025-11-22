"use client";

import { useState } from "react";

interface PlayerProps {
    onSubmit: (name: string) => void;
}

export default function Player(props: PlayerProps){
    const [name, setName] = useState("");

    const handleStart = () => {
        props.onSubmit(name.trim() || "Guest");
    };

    const handleSkip = () => {
        props.onSubmit("Guest");
    };

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome!</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Enter your name to start playing
                    </p>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition-colors"
                        autoFocus
                    />
                </div>
                
                <div className="flex flex-col gap-3 mt-8">
                    <button 
                        onClick={handleStart}
                        className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
                    >
                        Start Game
                    </button>
                    <button 
                        onClick={handleSkip}
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </div>
    )
}