import { atom } from "recoil"; 

export interface Navbar { 
    open: Boolean 
}

export const navState = atom<Navbar>({  
    key: 'navState', 
    default: {
        open: false  
    }, 
}); 