"use client";

import React from "react";
import Tile from "./tiles";
import { useState, useEffect } from "react";
import Modal from "./Modal";


interface TileData {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const TileImages: string[] = ["/img01.png", "/img02.png", "/img03.png", "/img04.png", "/img05.png", "/img06.png", "/img07.png", "/img08.png"];

export default function Game() {
    const [tiles, setTiles] = useState<TileData[]>([]);
    const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
    const [matchedTiles, setMatchedTiles] = useState<number[]>([]);
    const [moves, setMoves] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(false);

    // initialize and shuffle tiles
    const initializeTiles = () => {
        const DuplicateImages = [...TileImages, ...TileImages];
        const ShuffledTiles = DuplicateImages.map((image, index) => ({ 
            id: index,
            image: image, 
            isFlipped: false, 
            isMatched: false}))
            .sort (() => Math.random() - 0.5);
        setTiles(ShuffledTiles);
        setFlippedTiles([]);
        setMatchedTiles([]);
        setMoves(0);
        setTime(0);
        setGameWon(false);
    }
    useEffect(() => {
        initializeTiles();
    }, []);

    //reset game
    const resetGame = () => {
        initializeTiles();
    }

    //timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if(!gameWon){
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        return () => clearInterval(timer);
        }
    }, [gameWon]);

    // all tiles arre matched
    useEffect(()=> {
        if(matchedTiles.length === tiles.length && tiles.length > 0){
            setGameWon(true);
        }
    }, [matchedTiles, tiles]);

    // on click tile
    const handleTileClick = (id: number) => {

        // prevent clicking while checking or if already 2 tiles are flipped
        if(isChecking || flippedTiles.length >= 2) return;

        // check if tile is already flipped or matched
        const tile = tiles.find(t => t.id === id); 
        if(!tile || tile.isFlipped || tile.isMatched) return;

        // flip the clicked tile
        const newFlippedTiles = [...flippedTiles, id];
        setFlippedTiles(newFlippedTiles);
        setTiles(tiles.map(t => t.id === id ? {...t, isFlipped: true} : t));

        // check for match when 2 tiles are flipped
        if(newFlippedTiles.length === 2){
            setIsChecking(true);
            setMoves(moves + 1);
            
            const firstTile = tiles.find(t => t.id === newFlippedTiles[0]);
            const secondTile = tile;
            
            if(firstTile && firstTile.image === secondTile.image){
                // Match found
                setTiles(prevTiles => prevTiles.map(t => 
                    t.id === firstTile.id || t.id === secondTile.id ? {...t, isMatched: true} : t
                ));
                setMatchedTiles([...matchedTiles, firstTile.id, secondTile.id]);
                setFlippedTiles([]);
                setIsChecking(false);
            } else {
                // No match - flip back after delay
                setTimeout(() => {
                    setTiles(prevTiles => prevTiles.map(t => 
                        t.id === firstTile?.id || t.id === secondTile.id ? {...t, isFlipped: false} : t
                    ));
                    setFlippedTiles([]);
                    setIsChecking(false);
                }, 800);
            }
        }
    }



    return(
        <div className="container mx-auto px-4 py-8 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
            {/* header - title, moves, timer, restart */}
            <div className="mb-8">``
                <h1 className="text-4xl font-bold text-center mb-6">Memory Game</h1>
                <div className="flex justify-center items-center gap-6">
                    <div className="bg-white shadow-md rounded-lg px-6 py-3">
                        <span className="font-semibold">Moves: <span className="text-blue-600">{moves}</span></span>
                    </div>
                    <div className="bg-white shadow-md rounded-lg px-6 py-3">
                        <span className="font-semibold">Time: <span className="text-blue-600">{time}s</span></span>
                    </div>
                    <button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-lg font-semibold transition-colors">
                        Restart
                    </button>
                </div>
            </div>

            {/* Game board will go here */}
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
                {tiles.map((tile) => (
                    <Tile 
                    key = {tile.id}
                    id = {tile.id}
                    image = {tile.image}
                    isFlipped = {tile.isFlipped}
                    isMatched = {tile.isMatched}
                    onClick = {() => handleTileClick(tile.id)}
                    disabled = {isChecking}
                    />

                    ))}
                
            </div>
            {
                gameWon && (
                    <Modal
                        onClose={resetGame}
                        onRestart={resetGame}
                        moves={moves}
                    />
                )
            }
        </div>

    );
}