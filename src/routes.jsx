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
// import { FaCalendarDay } from "react-icons/fa";
// import MainCalender from "./components/Calender/MainCalender";
// import { FaUsers } from "react-icons/fa6";
// import Userdata from "./components/UserData/Userdata";
// import Profile from "./components/Profile/Profile";
// import { MdLibraryAdd } from "react-icons/md";
// import CreateRoom from "./components/CreateRoom/CreateRoom";
// import CreateAgent from "./components/CreateAgent/CreateAgent";
// import { IoMdCreate } from "react-icons/io";
// import HoldRoom from "./components/HoldRoom/HoldRoom";
// import { AiFillStop } from "react-icons/ai";
// import Requests from "./components/Requests/Requests";
// import { RiGitPullRequestLine } from "react-icons/ri";
// import { MdOutlinePendingActions } from "react-icons/md";
// import Pending from './components/Requests/Pending';
// import { MdHomeWork } from "react-icons/md";
// import Halls from './components/Halls/Halls';
import Profile from './components/Profile/Profile';
import { IoMdChatboxes } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import Admin from './components/Admin/Admin';


const routes = [
    {
        name: "chat",
        layout: "/admin",
        path: "chat",
        icon: <IoMdChatboxes  className="h-6 w-6"/>,
        component: <Chat />,
    },
    {
        name: "profile",
        layout: "/admin",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "admin",
        layout: "/admin",
        path: "admin",
        icon: <MdAdminPanelSettings  className="h-6 w-6" />,
        component: <Admin />,
    },
];
export default routes;
