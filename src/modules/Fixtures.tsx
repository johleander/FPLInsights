import axios from "axios";
import { useEffect, useState } from "react"
import Fixture, {IFixture} from "../models/Fixture";
import { ITeam } from "../models/Team";
import { IGameweek} from "../models/Gameweek";
import "./Fixtures.css";
import { IPlayer } from "../models/Player";
import { GameResult } from "../components/GameResult";

interface IFixturesProps {
    teams: ITeam[];
    gameweeks: IGameweek[];
    players: IPlayer[];
}


export const Fixtures = (props: IFixturesProps) => {
    
    const [ fixtures, setFixtures] = useState<IFixture[]>([]);
    const [startGameweek, setStartGameweek] = useState<number>(1);
    const [fixtureDetails, setFixtureDetails] = useState<IFixture>();


    const NUMBER_OF_GAMEWEEKS_TO_SHOW = 10;


    useEffect(() => {

        function mapFixtureData(data: any) {
            const mappedFixtures = data.map( (f:any ) => {
            let {team_h,team_h_difficulty, team_h_score, team_a,team_a_difficulty, team_a_score, event, finished, kickoff_time, referee, code } = f;
          
              const fixture = new Fixture({
                    homeTeam: {
                        team: props.teams.find(t => t.fplId === team_h),
                        difficulty: team_h_difficulty,
                        score: team_h_score
                    }, 
                    awayTeam: {
                        team: props.teams.find(t => t.fplId === team_a),
                        difficulty: team_a_difficulty,
                        score: team_a_score
                    },
                    gameweek: event, 
                    isFinished: finished,
                    kickoffTime: kickoff_time,
                    referee,
                    id: code
              });
    
              return fixture; 
    
            });
          
            setFixtures(mappedFixtures);
            
          }
        async function fetchData() {
            const fplfixtures = await axios.get("http://localhost:3001/api/football/fplfixtures");
            mapFixtureData(fplfixtures.data); 
        }

        fetchData();
    },[props.teams]);
    

  

    const handleNextClick = () => {
        let newStartGW =  startGameweek + 1;
        setStartGameweek(newStartGW);
    }

    const handlePreviousClick = () => {
        let newStartGW =  startGameweek - 1;
        setStartGameweek(newStartGW);
    }
    const renderGameweeks = (startGameweek:number) => {
       
        const gameweeks = props.gameweeks.slice(startGameweek - 1, startGameweek - 1 + NUMBER_OF_GAMEWEEKS_TO_SHOW);
        var options = { month: 'short', day: 'numeric' };
        return gameweeks.map((g,i) => {

            return <div className="gameweek" style={{gridRow: 1, gridColumn: i+2}} key={i+Math.random()}>
                 {g.isCurrent && <div className="isCurrent" title="In progress" />}
                 <div className="gameweekWrapper">
                    <p>GW{startGameweek + i}</p>
                    <p className="deadline">{new Date(g.deadline).toLocaleDateString('default', options as any)}</p>
                 </div>
                
            </div>
        });
    }

    const renderTeams = () => {
        return props.teams.map((t,i) => {

            return <div className="teamLabel" style={{gridRow: i+2}} key={t.fplId + t.name} title={t.name}>
                <img src={t.logo} alt="" width="30px" height="30px" />
                <p>{t.name}</p>
            </div>
        });
    }

    const getDifficultyColorFromNumber = (difficulty:number) => {
        const colors = ["rgb(1, 252, 122)", "rgb(231, 231, 231)", "rgb(255, 23, 81)","rgb(128, 7, 45)"];

        return colors[difficulty - 2];
    }

    const getColoredResult = (f: IFixture, isHome: boolean): string => {
        
         const homeWin = (f.homeTeam.score || - 1) > (f.awayTeam.score || -1);
         const awayWin = (f.homeTeam.score || - 1) < (f.awayTeam.score || - 1);
         const draw = !homeWin && !awayWin;

         if ((isHome && homeWin) || (!isHome && awayWin)) {
            return "rgb(255, 23, 81)";
         }

         return draw ? "rgb(231, 231, 231)" : "rgb(1, 252, 122)";
    }

    const onResultClick = (fixture?: IFixture) => {
        setFixtureDetails(fixture);
    }
    const renderFixtureOrResults = (f: IFixture, homeTeamIndex:number, awayTeamIndex:number, column: number) => {
        
        if(!f.isFinished) {
            return <>
            <div className="fixture" title={f.homeTeam.team?.name + " - "+  f.awayTeam.team?.name} style={{gridRow: homeTeamIndex + 2, gridColumn: column +2, backgroundColor: getDifficultyColorFromNumber(f.homeTeam.difficulty)}} key={f.id+"home"}>
                   <div className="fixtureDifficulty">{f.homeTeam.difficulty}</div>
                   <div className="fixtureOpponent">{f.awayTeam.team?.shortName + " (H)"}</div>
           </div>
    
           <div className="fixture" title={f.homeTeam.team?.name + " - "+  f.awayTeam.team?.name}  style={{gridRow: awayTeamIndex + 2, gridColumn: column + 2, backgroundColor: getDifficultyColorFromNumber(f.awayTeam.difficulty)}} key={f.id+"away"}>
                   <div className="fixtureDifficulty">{f.awayTeam.difficulty}</div>
                   <div className="fixtureOpponent">{f.homeTeam.team?.shortName + " (A)"}</div>
           </div>
           </>
        }
        else {
            return <>
            <div className="result" onClick={() => onResultClick(f)} title={f.homeTeam.team?.name + " - "+  f.awayTeam.team?.name + "  " + f.homeTeam.score + " - " + f.awayTeam.score } style={{gridRow: homeTeamIndex + 2, gridColumn: column +2}} key={f.id+"home"}>
                    <div className="resultOpponent">{f.awayTeam.team?.name + " (H)"}</div>
                   <div className="resultScore">{f.homeTeam.score + " - " + f.awayTeam.score}</div>
                   <div className="resultIndicator" style={{backgroundColor: getColoredResult(f,false)}}></div>
             
           </div>
    
           <div className="result" onClick={() => onResultClick(f)}  title={f.homeTeam.team?.name + " - "+  f.awayTeam.team?.name + "  " + f.homeTeam.score + " - " + f.awayTeam.score}  style={{gridRow: awayTeamIndex + 2, gridColumn: column + 2}} key={f.id+"away"}>
                    <div className="resultOpponent">{f.homeTeam.team?.name + " (A)"}</div>
                    <div className="resultScore">{f.homeTeam.score + " - " + f.awayTeam.score}</div>
                    <div className="resultIndicator" style={{backgroundColor: getColoredResult(f,true)}}></div>
            
           </div>
           </>
        }
       
    }


    const renderFixtures = (startGameweek: number) => {
        const endGameweek = startGameweek  + NUMBER_OF_GAMEWEEKS_TO_SHOW;
        if(!fixtures) {
            return [];
        }

        return fixtures.filter(f => f.gameweek >= startGameweek && f.gameweek < endGameweek).map((f:Fixture,i) => {

            const homeTeamIndex = props.teams.findIndex(t => t.name === (f as Fixture).homeTeam.team?.name);
            const awayTeamIndex = props.teams.findIndex(t => t.name === (f as Fixture).awayTeam.team?.name);
            const column = f.gameweek - startGameweek;
        
            return renderFixtureOrResults(f, homeTeamIndex, awayTeamIndex, column);
        });
    }

    const renderFixtureDetails = () => {
     
            if(fixtureDetails && fixtureDetails.isFinished) {
                return <GameResult fixture={fixtureDetails} onClose={() => onResultClick(undefined)}  />
            }
        
    }
    const render = () => {
        return <>
          {renderTeams()}
          {renderGameweeks(startGameweek)}
          {renderFixtures(startGameweek)}
          {renderFixtureDetails()}
        </>
      
    }

    return (
    <>
        <div className="options">
            <h3>FPL Fixtures</h3>
            <div className="changeGameweek">
            <button className="changeGameweekButton" onClick={handlePreviousClick} disabled={startGameweek === 1}>
                <p>Previous GW</p>
                </button> 
            <button className="changeGameweekButton" onClick={handleNextClick} disabled={startGameweek === 29}>
                <p>Next GW  </p>
            </button>
            </div>
        </div>
        <div className="fixtures">
            {render()}
        </div>
          </>
    )
}