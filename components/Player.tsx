"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PlayerProps {
    onSubmit: (name: string) => void;
}

export default function Player(props: PlayerProps){
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const sessionId = localStorage.getItem('gameSessionId');
        if(sessionId){
            const fetchName = async () => {
                const { data, error } = await supabase
                .from('player_name')
                .select('name')
                .eq('session_id', sessionId);
                if(error){
                    console.error("Error fetching name:", error);
                }else if(data && data.length > 0){
                    setName(data[0].name);
                    props.onSubmit(data[0].name);
                }
            } 
            fetchName();
            return;
            }
    }, []);

    const validateName = (name: string): boolean => {
        setError("");
        
        if (name.trim() === "") {
            setError("Please enter your name");
            return false;
        }
        
        if (name.trim().length < 2) {
            setError("Name must be at least 2 characters long");
            return false;
        }
        
        if (name.trim().length > 20) {
            setError("Name must be less than 20 characters");
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            setError("Name can only contain letters and spaces");
            return false;
        }
        
        return true;
    };

    const handleStart = async () => {
        let sessionId = localStorage.getItem('gameSessionId');
        
        if (!validateName(name)) {
            return;
        }
        
        try{
            if(!sessionId){
                sessionId = crypto.randomUUID();
                localStorage.setItem('gameSessionId', sessionId);
            const {data, error} = await supabase
            .from('player_name')
            .insert([{ name: name.trim(), session_id: sessionId }]);
            if(error){
                console.error("Error inserting name:", error);
                setError("Failed to save your name. Please try again.");
                return;
            }else{
                console.log("Name inserted successfully:", data);
            }
        } else return;
        } catch (error) {
            console.error("Unexpected error:", error);
            setError("An unexpected error occurred. Please try again.");
            return;
        }
        props.onSubmit(name.trim());
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
                        onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                            error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-purple-600'
                        }`}
                        autoFocus
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
                    )}
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