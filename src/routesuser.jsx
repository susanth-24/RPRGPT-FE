import React from 'react'
// Icon Imports
import {
    MdHome,
    MdOutlineShoppingCart,
    MdBarChart,
    MdPerson,
    MdLock,
} from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
// import MainScheduler from "./components/Scheduler/MainScheduler";
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import { IoMdChatboxes } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import Admin from './components/Admin/Admin';


const routesuser = [
    {
        name: "chat",
        layout: "/user",
        path: "chat",
        icon: <IoMdChatboxes  className="h-6 w-6"/>,
        component: <Chat />,
    },
    {
        name: "profile",
        layout: "/user",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    }
];
export default routesuser;
