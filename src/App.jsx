import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StartPage from './components/StartPage/StartPage'
// import Docs from './components/Docs/Docs'
// import NotFound from './components/NotFound/NotFound'
import Auth from './components/Auth/Auth'
import DashboardAdmin from './Layouts/DashboardAdmin'
// import Navbar from './components/Navbar/Navbar'
// import Dashboard from './Layouts/Dashboard/Dashboard'
// import NotAllow from './components/NotAllow/NotAllow'
// import DashboardOne from './Layouts/DashboardOne/DashboardOne'
// import DashboardTwo from './Layouts/DashBoardTwo/DashboardTwo'
// import ChangePassword from './components/ChangePassword/ChangePassword'
// import PrivateRequest from './components/PrivateRequest/PrivateRequest'
// import DashBoardExec from './Layouts/DashBoardExec/DashBoardExec'
// import BookPortal from './components/BookPortal/BookPortal'
// import PdfViewer from './components/GeneratePdf/main'
// import Attendance from './components/Attendance/Attendance'

function App() {
  // here add <BrowserRouter> if error and also add provider in main.jsx
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/auth/signin"  Component={() => !user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/admin/*" Component={()=>user?.result?.post==='Admin'?<DashboardAdmin/>:<Navigate to="/denied"/>} />
        {/* <Route path="/docs" element={<Docs />} />
        <Route path="/auth/signin"  Component={() => !user ? <Auth /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Book/:id" Component={() => user ? <BookPortal /> : <Navigate to="/" />} />
        <Route path="/changePassword" Component={() => user ? <ChangePassword /> : <Navigate to="/" />} />
        <Route path="/admin/*" Component={()=>user?.result?.post==='Admin'?<Dashboard/>:<Navigate to="/denied"/>} />
        <Route path="request/admin/:id" Component={()=>user?.result?.post==='Admin'?<PrivateRequest/>:<Navigate to="/denied"/>} />
        <Route path="/executive/*" Component={()=>user?.result?.post==='Executive'?<DashBoardExec/>:<Navigate to="/denied"/>} />
        <Route path="request/executive/:id" Component={()=>user?.result?.post==='Executive'?<PrivateRequest/>:<Navigate to="/denied"/>} />
        <Route path="attendance/executive/:id" Component={()=>user?.result?.post==='Executive'?<Attendance/>:<Navigate to="/denied"/>} />
        <Route path="/adminOne/*" Component={()=>user?.result?.post==='Admin_1'?<DashboardOne/>:<Navigate to="/denied"/>} />
        <Route path="request/adminOne/:id" Component={()=>user?.result?.post==='Admin_1'?<PrivateRequest/>:<Navigate to="/denied"/>} />
        <Route path="/adminTwo/*" Component={()=>user?.result?.post==='Admin_2'?<DashboardTwo/>:<Navigate to="/denied"/>} />
        <Route path="request/adminTwo/:id" Component={()=>user?.result?.post==='Admin_2'?<PrivateRequest/>:<Navigate to="/denied"/>} />
        <Route path="/Booked/pdf/:id" Component={() => user ? <PdfViewer /> : <Navigate to="/" />} />
        <Route path="/denied" element={<NotAllow/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
