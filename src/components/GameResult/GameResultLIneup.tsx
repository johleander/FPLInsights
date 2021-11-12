import axios from "axios";
import { useEffect, useState } from "react"


interface IGameResultLineup {
    id: string
}


export const GameResultLineup = (props: IGameResultLineup) => {
    
    const [ lineup, setLineup] = useState(null);


    useEffect(() => {

      
        async function fetchData() {
            const lineups = await axios.get(`http://localhost:3001/api/football/lineups/?fixtureId=${props.id}`);
            setLineup(lineups.data.response);
                 
        }

        fetchData();
    },[props.id]);

    console.log(lineup); 

    return null;
}