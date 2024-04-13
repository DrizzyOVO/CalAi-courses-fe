import { navState } from "../atoms/navbar";  
import { selector } from "recoil"; 

export const navOpenState = selector({ 
    key: 'navOpenState', 
    get: ({get}) => {
        const state = get(navState); 
        return state.open; 
    }, 
}); 

