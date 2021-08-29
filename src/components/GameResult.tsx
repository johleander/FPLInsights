
import { MouseEvent, useState } from 'react';
import "./GameResult.css";
import cn from "classnames";
import { IFixture } from '../models/Fixture';

interface IGameResult { 
    onClose: () => void; 
    fixture: IFixture;
}


export const GameResult = (props: IGameResult) => {
    
    const [currentTab, setCurrentTab] = useState(0);
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
    }

    const renderContent = () => {
        switch (currentTab) {
            case 0: 
                return <p>General</p>
            case 1: 
                return <p>Stats</p>
            case 2: 
                return <p>Lineups</p>
            default: 
                return <p>Unknown</p>

        }
    }


    return (
    <div className="gameResultContainer" onClick={props.onClose}>
        <div className="gameResult" onClick={handleClick}>
            <div className="date">{ new Date(props.fixture.kickoffTime).toLocaleDateString('default', { month: 'short', day: 'numeric'})}</div>
            <div className="logosAndResult">
                <img src={props.fixture.homeTeam.team?.logo} alt="" width="60px" height="60px" />  
                <h2>{props.fixture.homeTeam.team?.shortName}</h2>
                <h1>{props.fixture.homeTeam.score + "  -  " + props.fixture.awayTeam.score}</h1>
                <h2>{props.fixture.awayTeam.team?.shortName}</h2>
                <img src={props.fixture.awayTeam.team?.logo} alt="" width="60px" height="60px" /> 
            </div>
            <div className="tabs">
                <div onClick={() => setCurrentTab(0)} className={cn({tab: true, active: currentTab === 0})}>General</div>
                <div onClick={() => setCurrentTab(1)}  className={cn({tab: true, active: currentTab === 1})}>Stats</div>
                <div onClick={() => setCurrentTab(2)}  className={cn({tab: true, active: currentTab === 2})}>Lineups</div>
            </div>
            <div className="content">
                {renderContent()}
            </div>
         </div>
    </div>
    
    )
}