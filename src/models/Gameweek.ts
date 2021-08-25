        
export interface IGameweek{
    id: string;
    chipPlays: {
        name: string;
        numPlayed: number
    },
    averageEntryScore: number; 
    deadline: Date;
    finished: boolean;
    highestScore: number;
    isCurrent: boolean;
    isNext: boolean;
    isPrevious: boolean;
    mostCaptained: number; 
    mostSelected: number;
    mostTransferredIn: number; 
    mostViceCaptained: number; 
    name: string;   
    topElement: {
        id: number;
        points: number;
    }
    transfersMade: number;

}



export default class Gameweek implements IGameweek {

    id: string;
    chipPlays: {
        name: string;
        numPlayed: number
    };
    averageEntryScore: number; 
    deadline: Date;
    finished: boolean;
    highestScore: number;
    isCurrent: boolean;
    isNext: boolean;
    isPrevious: boolean;
    mostCaptained: number; 
    mostSelected: number;
    mostTransferredIn: number; 
    mostViceCaptained: number; 
    name: string;
    topElement: {
        id: number;
        points: number;
    };
    transfersMade: number;



    constructor (gw: IGameweek) {
        const {id,chipPlays, averageEntryScore, deadline, finished, highestScore, isCurrent, isNext, isPrevious, mostCaptained,
        mostSelected, mostTransferredIn, mostViceCaptained, name, topElement, transfersMade } = gw;

       this.id = id;
       this.chipPlays = chipPlays;
       this.averageEntryScore = averageEntryScore;
       this.deadline = deadline; 
       this.finished = finished; 
       this.highestScore = highestScore; 
       this.isCurrent = isCurrent;
       this.isNext = isNext;
       this.isPrevious = isPrevious;
       this.mostCaptained = mostCaptained;
       this.mostSelected = mostSelected;
       this.mostTransferredIn = mostTransferredIn;
       this.mostViceCaptained = mostViceCaptained;
       this.name = name; 
       this.topElement = topElement;
       this.transfersMade= transfersMade;
    }
}