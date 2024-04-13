"use client";
import { RecoilRoot, atom } from "recoil"; 
// import Appbar from "../components/Appbar";
// import * from "@repo/store/src/index"; 
import { isUserLoading } from "@/store/selectors/isUserLoading";
import { userState } from "@/store/atoms/user"; 
import { userEmailState } from "@/store/selectors/userEmail";
// import courseState from "@repo/store/src/atoms/course"

// export const todoListState = atom({
//   key: "TodoList",
//   default: [],
// });

export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot> 
        {children} 
    </RecoilRoot>;
}