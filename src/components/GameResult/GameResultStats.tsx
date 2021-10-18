
import "./GameResult.css";
import { IPlayerStat, IStats } from '../../models/Stats';

export interface IGameResultStats { 
    homeStats : IStats;     
    awayStats: IStats;
}

    interface IGameResultSection {
    header: string; 
    homePlayerStats: IPlayerStat[] | undefined;
    awayPlayerStats: IPlayerStat[] | undefined;
}


export const GameResultStats = (props: IGameResultStats) => {
    


    return (
    <div className="gameResultStatsContainer">
      <GameResultSection header="Goals" homePlayerStats={props.homeStats.goals_scored} awayPlayerStats={props.awayStats.goals_scored}  />
      <GameResultSection header="Assists" homePlayerStats={props.homeStats.assists} awayPlayerStats={props.awayStats.assists}  />
      <GameResultSection header="Bonus" homePlayerStats={props.homeStats.bonus} awayPlayerStats={props.awayStats.bonus}  />
      <GameResultSection header="BPS" homePlayerStats={props.homeStats.bps} awayPlayerStats={props.awayStats.bps}  />
    </div>
    
    )
}   


export const GameResultSection = (props: IGameResultSection) => {

    const renderNameAndValue = (playerStats : IPlayerStat[])=> {
        return playerStats.map(p => {
            const value = p.value > 1 ? `(${p.value})` : ""; 
            return <p>{p.player?.first_name} {p.player?.second_name} <span>{value}</span></p>
        });
    }
  

    return <>
            <div className="section">
                    {props.header}
            </div>
            <div className="statsContent">
                <div className="homeStats">
                    {renderNameAndValue(props.homePlayerStats as IPlayerStat[])}
                </div>
                <div className="awayStats">
                    {renderNameAndValue(props.awayPlayerStats as IPlayerStat[])}
              </div>
            </div>
        </>
}