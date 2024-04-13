import { atom } from "recoil"; 

export interface Nav { 
    isUser: Boolean 
}

export const navUser = atom<Nav>({  
    key: 'navUser', 
    default: {
        isUser: true 
    }, 
}); 
