
interface IStrength {
    aggregate: number; 
    home: {
        attack: number;
        defence: number; 
    };
    away: {
        attack: number;
        defence: number; 
    };
    overall: {
        home: number;
        away: number; 
    }
}

export interface ITeam {    
    code: number | undefined,
    fplId: number;
    name: string;
    shortName: string; 
    strength: IStrength;
    logo?: string;

}


export default class Team implements ITeam {

    code: number | undefined;
    fplId: number;
    name: string; 
    shortName: string;
    strength: IStrength;    
    logo?: string;

    constructor (team: ITeam) {
        const {fplId, code, name, shortName, strength, logo} = {...team};

       this.fplId = fplId;
       this.code = code;
       this.name = name;
       this.shortName = shortName;
       this.strength = strength;
       this.logo = logo;
    }
}