'use client' 
import Appbar from "@/components/client/Appbar";
import Landing from "@/components/client/Landing";
import { navUser } from "@/store/atoms/nav";
import { whereIsNav } from "@/store/selectors/whereIsNav";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Home() {

  const isUser = useRecoilValue(whereIsNav);  
  const setUser = useSetRecoilState(navUser); 

  useEffect(() => {
    setUser({
      isUser: true 
    })
    console.log("url :- " + process.env.NEXT_PUBLIC_BACKEND_URL);
  }); 

    return (

      <>
        <Landing />
      </> 
    );
}
