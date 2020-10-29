import React from 'react'


type SideBarProps={
    Sidebar:React.FC,
}
export const SideBarScreen: React.FC<SideBarProps>=({Sidebar,children})=>{
    return (
        <div className='sidebarView'>
            <div className='sidebar'>
                {<Sidebar/>}
            </div>
            <div className='sidebarView-content'>
                {children}
            </div>
        </div>
    )
}