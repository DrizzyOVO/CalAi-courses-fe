'use client'
import AdminAppbar from '@/components/admin/AdminAppbar';
import Appbar from '@/components/client/Appbar';
import { whereIsNav } from '@/store/selectors/whereIsNav';
import React from 'react'
import { useRecoilValue } from 'recoil';



const Bar = () => { 

    const isUser = useRecoilValue(whereIsNav); 

    return (

        <>
            {isUser ? <Appbar /> : <AdminAppbar />}
        </>

    )
}

export default Bar; 