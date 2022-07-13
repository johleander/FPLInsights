
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getEnvironmentURL, teams_2122 } from './helper';

import './App.css';
import { Fixtures } from './modules/Fixtures';
import Team from './models/Team';
import Gameweek from './models/Gameweek';
import { IPlayer } from './models/Player';

function App() {


  const [fixturesInfo, setFixturesInfo] = useState({
    teams: [],
    gameweeks: [],
    players: [] as IPlayer[]
  });

  useEffect(() => {

    async function fetchData() {
      const fplGeneralURL = getEnvironmentURL("/api/football/fplgeneral");
      const fplGeneralData = await axios.get(fplGeneralURL);

      const teamsURL = getEnvironmentURL("/api/football/teams")
      const teams = await axios.get(teamsURL);

      mapData(fplGeneralData.data, teams.data);
    }

    fetchData();
},[]); 

function mapData(fplData: any, teamsData: any) {
  const teamsArray = fplData.teams; 
  const players: IPlayer[] = fplData.elements as IPlayer[];
  const gws = fplData.events;

  const teams = teamsArray.map( (t:any ) => { 
    let {id, name, short_name, strength, strength_attack_away, strength_attack_home, strength_defence_away, strength_defence_home, strength_overall_away, strength_overall_home} = t;
    const mappedTeam = teams_2122.find(tt => tt.fplId === id);
    const logo = teamsData.response.find((td: { team: { id: number; }; }) => td.team.id === mappedTeam?.id)?.team.logo;

    const mergedTeam = new Team({
      fplId: id,
      id: mappedTeam?.id,
      name, 
      shortName: short_name,
      strength: {
        aggregate: strength,
        home: {
          attack: strength_attack_home,
          defence: strength_defence_home
        },
        away: {
          attack: strength_attack_away,
          defence: strength_defence_away
        },
        overall: {
          home: strength_overall_home,
          away: strength_overall_away
        }
      },
      logo
    });

    return mergedTeam;
  });

  const gameweeks = gws.map( (g: any) => {
    let {average_entry_score, chip_plays,deadline_time,finished,highest_score,highest_scoring_entry,id,
        is_current,is_next,is_previous,most_captained,most_selected,most_transferred_in, most_vice_captained,
        name,top_element,top_element_info,transfers_made} = g;

        const gameweek = new Gameweek({
          averageEntryScore: average_entry_score,
          chipPlays: chip_plays,
          deadline: deadline_time,
          finished,
          highestScore: highest_score,
          id,
          isCurrent: is_current,
          isNext: is_next,
          isPrevious: is_previous,
          mostCaptained: most_captained,
          mostSelected: most_selected,
          mostTransferredIn: most_transferred_in,
          mostViceCaptained: most_vice_captained,
          name,
          topElement: top_element,
          transfersMade: transfers_made
        });

        return gameweek;
  });


  setFixturesInfo({
    teams,
    gameweeks,
    players
  });
}


  return (
    <div className="app">
      {fixturesInfo.teams.length > 0 ? <Fixtures teams={fixturesInfo.teams} gameweeks={fixturesInfo.gameweeks} players={fixturesInfo.players} /> : <div>Loading...</div>}
    </div>
  )};

export default App;



