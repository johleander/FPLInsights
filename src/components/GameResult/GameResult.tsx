
import { MouseEvent, useState } from 'react';
import "./GameResult.css";
import  { IFixture } from '../../models/Fixture';
import { GameResultTab } from '../../helper';
import { GameResultStats } from './GameResultStats';
import { IStats } from '../../models/Stats';

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
            case GameResultTab.Stats: 
                return <GameResultStats homeStats={props.fixture.homeTeam.stats as IStats} awayStats={props.fixture.awayTeam.stats as IStats}/>
            case GameResultTab.Lineups: 
                return null;{/*<GameResultLineup  id={props.fixture.apiFootballFixtureId    }/>*/}
            default: 
                return <p>Unknown</p>

        }
    }


    return (
    <div className="gameResultContainer" onClick={props.onClose}>
        <div className="gameResult" onClick={handleClick}>
            <div className="date">{ new Date(props.fixture.kickoffTime).toLocaleDateString('default', { month: 'short', day: 'numeric'})}</div>
            <div className="logosAndResult">
                <h2>{props.fixture.homeTeam.team?.shortName}</h2>
                <h1>{props.fixture.homeTeam.score + "  -  " + props.fixture.awayTeam.score}</h1>
                <h2>{props.fixture.awayTeam.team?.shortName}</h2>
            </div>
            {/*<div className="tabs">
                <div onClick={() => setCurrentTab(GameResultTab.Stats)}  className={cn({tab: true, active: currentTab === GameResultTab.Stats})}>Stats</div>
                <div onClick={() => setCurrentTab(GameResultTab.Lineups)}  className={cn({tab: true, active: currentTab === GameResultTab.Lineups})}>Lineups</div>
    </div>*/}
            <div className="content">
                {renderContent()}
            </div>
         </div>
    </div>
    
    )
}