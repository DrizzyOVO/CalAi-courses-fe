import { navUser } from "../atoms/nav";
import { selector } from "recoil"; 

export const whereIsNav = selector({ 
    key: 'whereIsNav', 
    get: ({get}) => {
        const state = get(navUser); 
        return state.isUser; 
    }, 
}); 

