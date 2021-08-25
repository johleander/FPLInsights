
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
    id: number | undefined,
    fplId: number;
    name: string;
    shortName: string; 
    strength: IStrength;
    logo?: string;

}


export default class Team implements ITeam {

    id: number | undefined;
    fplId: number;
    name: string; 
    shortName: string;
    strength: IStrength;    
    logo?: string;

    constructor (team: ITeam) {
        const {fplId, id, name, shortName, strength, logo} = {...team};

       this.id = id;
       this.fplId = fplId;
       this.name = name;
       this.shortName = shortName;
       this.strength = strength;
       this.logo = logo;
    }
}