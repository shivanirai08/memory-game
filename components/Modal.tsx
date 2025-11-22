"use client";

interface ModalProps {
    onClose: () => void;
    onRestart: () => void;
    moves: number;
}

export default function Modal(props: ModalProps){
    return(
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all">
                <div className="mb-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">You Win!</h1>
                    <p className="text-lg text-gray-600">
                        You completed the game in <span className="font-bold text-blue-600">{props.moves}</span> moves
                    </p>
                </div>
                
                <div className="flex flex-col gap-3 mt-8">
                    <button 
                        onClick={props.onRestart}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
                    >
                        Play Again
                    </button>
                    <button 
                        onClick={props.onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}