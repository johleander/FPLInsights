import { ILineup } from "./Lineup";
import { IStats } from "./Stats";
import { ITeam } from "./Team";

export interface IFixture {
    id: number;
    homeTeam: IFixtureTeam;
    awayTeam: IFixtureTeam; 
    kickoffTime: Date;
    isFinished: boolean;
    gameweek: number;
    referee: string;
    apiFootballFixtureId: string

}

export interface IFixtureTeam {
    team?: ITeam;
    score?: number;
    stats?: IStats;
    difficulty: number;
}

export default class Fixture implements IFixture {

     id: number;
     homeTeam: IFixtureTeam;
     awayTeam: IFixtureTeam;

     kickoffTime: Date;
     isFinished: boolean;
     gameweek: number;
     referee: string;
     apiFootballFixtureId: string;


    constructor (fixture: IFixture) {

        this.id = fixture.id
        this.homeTeam = fixture.homeTeam;
        this.awayTeam = fixture.awayTeam;
        this.gameweek = fixture.gameweek;
        this.isFinished = fixture.isFinished;
        this.kickoffTime = fixture.kickoffTime;
        this.referee = fixture.referee;
        this.apiFootballFixtureId = fixture.apiFootballFixtureId;
    }
}