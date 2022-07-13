import axios from "axios";
import { useEffect, useState } from "react";
import { getEnvironmentURL } from "../../helper";
import "./GameResult.css";


interface IGameResultLineup {
    id: string
}

interface ILineup {
    formation?:string;
    startXI: any;
    team: any; 

}

interface ILineupSection {
    header: string; 
    homeValues: any; 
    awayValues: any;
    
}

interface IPlayerMarker {
    name: string; 
    number: string; 
    color: {
        primary: string;
        border:string;
        number: string;
    }; 
}


export const GameResultLineup = (props: IGameResultLineup) => {
    
    const [ lineups, setLineups] = useState<ILineup[]>([]);


    useEffect(() => {

      
        async function fetchData() {
            const lineupsURL = getEnvironmentURL(`/api/football/lineups/?fixtureId=${props.id}`);
            const lineups = await axios.get(lineupsURL);
            setLineups(lineups.data.response);
                 
        }

        fetchData();
    },[props.id]);
    
    const homeLineUp = lineups[0];
    const awayLineup = lineups[1];

    return (
        <div className="lineupsContainer">
            <LineupSection header="Formation" homeValues={homeLineUp?.formation} awayValues={awayLineup?.formation} />
            <div className="lineupWrapper">
                <Lineup {...homeLineUp} />
                <Lineup {...awayLineup} />
            </div>
       
        </div>
    )
    
}

 const LineupSection = (props: ILineupSection) => {

    return <>
            <div className="section">
                <div className="homeStats">
                   <span>{props.homeValues}</span>
                </div>
                <div>
                    {props.header}
                </div>
                <div className="awayStats">
                    <span>{props.awayValues}</span>
                </div>   
            </div>
        </>
}

 const Lineup= (props: ILineup) => {

    const formationCount = props.formation?.split("-") || [];
    const startingXI = props.startXI;
    
    const getGridRowStyle = () => {
        
        return {gridTemplateRows: `40px repeat(${formationCount?.length}, 1fr)`};
    }
    const getGoalkeeper = () => {
        if(!startingXI) {
            return null; 
        }
        const keeper = startingXI.find((s: { player: { pos: string; }; }) => s.player.pos === "G").player;
        return <div className="lineupPart" style={{gridRowStart: 1, gridRowEnd: 1}}>
            <PlayerMarker name={keeper.name} number={keeper.number} color={props.team.colors.goalkeeper} />
        </div>
    }
   

    const getPlayers = () => {
        if(!startingXI) {
            return null; 
        }
    
    return startingXI.map((p:any) => {
            const isKeeper = p.player.pos === "G"; 
            const jerseyColor = isKeeper ? props.team.colors.goalkeeper :props.team.colors.player
            const i: number=  parseInt(p.player.grid[0]);
            return <div className="lineupPart" style={{gridRowStart: i, gridRowEnd: i}}>
                <PlayerMarker name={p.player.name} number={p.player.number} color={props.team.colors.player} />
            </div>;
    })}
    

    return (
        <div className="lineup" style={getGridRowStyle()}>
           {/*getGoalkeeper()*/}
           {getPlayers()}
        </div>
    ) 
}


const PlayerMarker = (props: IPlayerMarker) => {
    return (
        <svg className="playerMarker" width="32" height="32">
            <circle cx="50%" cy="50%" r="15" fill={"#" + props.color.primary} stroke={"#" + props.color.border} strokeWidth="2">
                <title>{props.name}</title>
            </circle>
            <text x="50%" y="50%" stroke={"#"+props.color.number} stroke-width="1px" textAnchor="middle" dominant-baseline="middle">{props.number}</text>
           
        </svg>
)}
