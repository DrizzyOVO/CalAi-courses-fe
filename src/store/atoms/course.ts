import { atom } from "recoil"; 

export interface courseInterfaceUi{
  id: String, 
  title: String, 
  description: String, 
  price: Number, 
  imgLink: string, 
  published: Boolean
}

export interface courseInterface { 
    isLoading: Boolean, 
    course: {
        id: String, 
        title: String, 
        description: String, 
        price: Number, 
        imgLink: string, 
        published: Boolean
    } | null 
}

export const courseState = atom<courseInterface>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null
  },
});