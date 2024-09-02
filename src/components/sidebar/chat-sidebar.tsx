"use client"
import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar'
import { Logo } from '../common/logo'
import { LinkType } from '@/types/common-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';


type ChatSidebarProps = {
    links: LinkType[];
   
  };
  
  
  const ChatSidebar: React.FC<ChatSidebarProps> = ({ links }) => {
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    if (!user) return <></>;

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10" animate={false}>
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo /> 
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        
        </SidebarBody>
      </Sidebar>
  )
}

export default ChatSidebar