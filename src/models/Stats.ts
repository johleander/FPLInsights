import { IPlayer } from "./Player";


export interface IPlayerStat {
    player?: IPlayer;
    value: number; 
}

export interface IStats {
   goals_scored?: Array<IPlayerStat>;
   assists?: Array<IPlayerStat>;
    own_goals?: Array<IPlayerStat>;
    penalties_saved?: Array<IPlayerStat>;
    penalties_missed?: Array<IPlayerStat>;
    yellow_cards?: Array<IPlayerStat>;
    red_cards?: Array<IPlayerStat>;
    saves?: Array<IPlayerStat>;
    bonus?: Array<IPlayerStat>;
    bps?: Array<IPlayerStat>;
}

export default class Stats implements IStats{
    goals_scored?: Array<IPlayerStat>;
    assists?: Array<IPlayerStat>;
    own_goals?: Array<IPlayerStat>;
    penalties_saved?: Array<IPlayerStat>;
    penalties_missed?: Array<IPlayerStat>;
    yellow_cards?: Array<IPlayerStat>;
    red_cards?: Array<IPlayerStat>;
    saves?: Array<IPlayerStat>;
    bonus?: Array<IPlayerStat>;
    bps?: Array<IPlayerStat>;

    constructor () {
     //   const {goals_scored, assists, own_goals,  penalties_saved, penalties_missed, yellow_cards, red_cards, saves, bonus, bps} = stats;

      /*  this.goals_scored = goals_scored;
        this.assists = assists;
        this.own_goals = own_goals;
        this.penalties_missed = penalties_missed;
        this.penalties_saved = penalties_saved;
        this.yellow_cards = yellow_cards;
        this.red_cards = red_cards;
        this.saves = saves;
        this.bonus = bonus;
        this.bps = bps;*/
        
    }
}