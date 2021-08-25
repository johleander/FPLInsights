
import { MouseEvent } from 'react';
import "./GameResult.css";

interface IGameResult {
    onClose: () => void; 
}


export const GameResult = (props: IGameResult) => {
    
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
    }
    return (
    <div className="gameResultContainer" onClick={props.onClose}>
        <div className="gameResult" onClick={handleClick}>
            <div className="tabs">
                <div className="tab">
                    General
                </div>
                <div className="tab">
                    Stats
                </div>
                <div className="tab">
                    Lineups
                </div>
            </div>
         </div>
    </div>
    
    )
}